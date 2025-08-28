import { z } from 'zod';

export const DeleteTestInputSchema = z.object({
	id: z.string(),
});


export type DeleteTestInput = z.infer<typeof DeleteTestInputSchema>;
