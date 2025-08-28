import { z } from 'zod';

export const CreateTestInputSchema = z.object({
	text: z.string(),
});

export type CreateTestInput = z.infer<typeof CreateTestInputSchema>;
