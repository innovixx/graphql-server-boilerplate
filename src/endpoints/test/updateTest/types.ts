import { z } from 'zod';

export const UpdateTestInputSchema = z.object({
	id: z.string(),
	input: z.object({
		text: z.string(),
	}),
});


export type UpdateTestInput = z.infer<typeof UpdateTestInputSchema>;
