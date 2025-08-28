import { z } from 'zod';

export const GetTestInputSchema = z.object({
	id: z.string(),
});


export type GetTestInput = z.infer<typeof GetTestInputSchema>;
