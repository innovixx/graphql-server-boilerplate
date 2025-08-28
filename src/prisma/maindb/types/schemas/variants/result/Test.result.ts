import { z } from 'zod';

// prettier-ignore
export const TestResultSchema = z.object({
    id: z.string(),
    text: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type TestResultType = z.infer<typeof TestResultSchema>;
