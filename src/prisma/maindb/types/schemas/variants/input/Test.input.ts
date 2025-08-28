import { z } from 'zod';

// prettier-ignore
export const TestInputSchema = z.object({
    id: z.string(),
    text: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type TestInputType = z.infer<typeof TestInputSchema>;
