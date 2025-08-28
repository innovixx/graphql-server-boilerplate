import { z } from 'zod';

export const TestScalarFieldEnumSchema = z.enum(['id', 'text', 'createdAt', 'updatedAt'])