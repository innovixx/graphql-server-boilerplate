import { baseTypeDefs } from '@innovixx/api-kit';
import { fileURLToPath } from 'url';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesArray = loadFilesSync(path.join(__dirname, '../**/index.graphql'));

export const typeDefs = mergeTypeDefs([baseTypeDefs, ...typesArray]);
