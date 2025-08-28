import { z } from 'zod';

// prettier-ignore
export const TestModelSchema = z.object({
    id: z.string(),
    text: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type TestModelType = z.infer<typeof TestModelSchema>;
