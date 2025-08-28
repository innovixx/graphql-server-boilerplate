
export const graphqlPostHandler = <T, R>(
	postFn: (data: T) => Promise<R>,
) => async (_: unknown, args: T): Promise<R> => postFn(args);
