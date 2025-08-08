import type { Request } from 'express';
import { UserStatus, type User } from '../../../databases/maindb/client/index.js';
import { maindb } from '../../prisma/index.js';

export const authorize = async (req: Request): Promise<User | null> => {
	const token = req.get('X-CSRF-TOKEN');

	if (!token) {
		return null;
	}

	const viewer = await maindb.user.findFirst({
		where: {
			...(token && {
				session: {
					some: {
						expiresAt: {
							gte: new Date(),
						},
						token,
					},
				},
			}),
			status: UserStatus.ACTIVE,
		},
	});


	return viewer;
};

export const isAdmin = (viewer?: User | null): boolean => {
	if (!viewer || !viewer?.id) {
		return false;
	}

	return true;
};
