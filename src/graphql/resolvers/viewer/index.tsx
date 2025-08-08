import type { CookieOptions, Request, Response } from 'express';
import type { IResolvers } from '@graphql-tools/utils';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { maindb } from '../../../prisma/index.js';
import { authorize } from '../../../lib/authorize/index.js';
import type { User } from '../../../../databases/maindb/client/index.js';
import type { UserRole, Viewer } from '../../generated/schema.js';

const cookieOptions: CookieOptions = {
	domain: new URL(process.env.CLIENT_URL as string).hostname,
	httpOnly: true,
	maxAge: 1000 * 60 * 60 * 24 * 365,
	secure: true,
	signed: true,
};

const loginViaCookie = async (req: Request, res: Response): Promise<User & { token: string } | null> => {
	let user;

	if (req.signedCookies.viewer) {
		user = await maindb.user.findUnique({
			where: {
				id: req.signedCookies.viewer,
			},
		});
	}

	if (!user) {
		res.clearCookie('viewer');
		return null;
	}

	const token = crypto.randomBytes(32).toString('hex');

	const updatedUser = await maindb.user.update({
		data: {
			lastLoginAttempt: new Date(),
			session: {
				create: {
					expiresAt: dayjs().add(30, 'day').toDate(),
					ipAddress: req.ip,
					token,
					userAgent: req.get('User-Agent') ?? '',
				},
			},
		},
		where: {
			id: req.signedCookies.viewer,
		},
	});

	return {
		...updatedUser,
		token,
	};
};

const loginViaEmail = async ({ req, res, email, password }: { req: Request, res: Response, email: string, password: string }): Promise<User & { token: string } | null> => {
	const user = await maindb.user.findFirst({
		where: {
			email,
		},
	});

	if (!user) {
		throw new Error('Invalid credentials');
	}

	if (user.failedLoginAttempts >= 5 && dayjs(user.lastLoginAttempt).isAfter(dayjs().subtract(15, 'minute'))) {
		throw new Error('Too many login attempts. Please try again later');
	}

	if (user.password && !await bcrypt.compare(password, user.password)) {
		res.clearCookie('viewer');
		await maindb.user.update({
			data: {
				failedLoginAttempts: {
					increment: 1,
				},
				lastLoginAttempt: new Date(),
			},
			where: {
				id: user.id,
			},
		});
		throw new Error('Invalid credentials');
	}

	const token = crypto.randomBytes(32).toString('hex');

	const updatedUser = await maindb.user.update({
		data: {
			failedLoginAttempts: 0,
			lastLoginAttempt: new Date(),
			session: {
				create: {
					expiresAt: dayjs().add(30, 'day').toDate(),
					ipAddress: req.ip,
					token,
					userAgent: req.get('User-Agent') ?? '',
				},
			},
		},
		where: {
			id: user.id,
		},
	});

	res.cookie('viewer', updatedUser.id, cookieOptions);

	return {
		...updatedUser,
		token,
	};
};

export const viewerResolver: IResolvers = {
	Mutation: {
		login: async (_, { email, password, redirectTo }: { email: string, password: string, redirectTo?: string }, { req, res }: { req: Request, res: Response }): Promise<Viewer
		> => {
			try {
				let user: User & { token: string } | null;

				if (!email || !password) {
					user = await loginViaCookie(req, res);
				} else {
					user = await loginViaEmail({ req, res, email, password });
				}

				if (!user) {
					res.clearCookie('viewer');
					return {
						didRequest: true,
					};
				}

				return {
					id: user.id,
					email: user.email,
					didRequest: true,
					firstName: user.firstName,
					lastName: user.lastName,
					redirectTo,
					role: user.role as UserRole,
					token: user.token,
				};
			} catch (error) {
				throw new Error(`Error logging in: ${error}`);
			}
		},
		logout: async (_, _args, { req, res }: { req: Request, res: Response }): Promise<boolean> => {
			try {
				const viewer = await authorize(req);

				if (!viewer) {
					throw new Error('Viewer not found');
				}

				const token = req.get('X-CSRF-TOKEN');

				await maindb.session.delete({
					where: {
						token,
					},
				});

				res.clearCookie('viewer');

				return true;
			} catch (error) {
				throw new Error(`Failed to log out: ${error}`);
			}
		},
	},
	Query: {
		viewer: async (_, _args, { req, res }: { req: Request, res: Response }): Promise<Viewer> => {
			try {
				const viewer = await authorize(req);

				if (!viewer) {
					res.clearCookie('viewer');
					throw new Error('Viewer not found');
				}

				return {
					id: viewer.id,
					firstName: viewer.firstName,
					lastName: viewer.lastName,
					email: viewer.email,
					didRequest: true,
					token: req.get('X-CSRF-TOKEN'),
					role: viewer.role as UserRole,
				};
			} catch (error) {
				throw new Error(`Failed to query viewer: ${error}`);
			}
		},
	},
};
