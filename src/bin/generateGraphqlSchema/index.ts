#!/usr/bin/env tsx
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { generateGraphqlSchema } from '@innovixx/api-kit/codegen';
import { typeDefs } from '../../graphql/typeDefs.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../');
const outputPath = resolve(ROOT, 'src/graphql/schema.graphql');

generateGraphqlSchema({ typeDefs, outputPath });

process.stdout.write(`Wrote ${outputPath}\n`);
