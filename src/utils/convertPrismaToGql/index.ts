import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type PrismaField = {
	name: string;
	type: string;
	isList: boolean;
	isRequired: boolean;
};

type PrismaModel = {
	modelName: string;
	fields: PrismaField[];
};

type PrismaEnum = {
	enumName: string;
	values: string[];
};

const PRISMA_TYPE_MAP = {
	String: 'String',
	Int: 'Int',
	Boolean: 'Boolean',
	Float: 'Float',
	DateTime: 'Date',
	Json: 'JSON',
};

function parsePrismaSchema(schema: string): { models: PrismaModel[]; enums: PrismaEnum[] } {
	const models: PrismaModel[] = [];
	const enums: PrismaEnum[] = [];
	const modelRegex = /model\s+(\w+)\s*{([^}]*)}/g;
	const enumRegex = /enum\s+(\w+)\s*{([^}]*)}/g;

	let match = modelRegex.exec(schema);
	while (match !== null) {
		const [, modelName, body] = match;
		const fields: PrismaField[] = [];
		body.split('\n').forEach((line) => {
			const fieldMatch = line.trim().match(/^(\w+)\s+([\w[\]]+)(.*)/);
			if (fieldMatch) {
				const [, name, typeRaw, rest] = fieldMatch;
				let type = typeRaw;
				let isList = false;
				let isRequired = false;
				if (type.endsWith('[]')) {
					isList = true;
					type = type.replace('[]', '');
				}
				if (rest.includes('@id') || rest.includes('@unique')) {
					isRequired = true;
				}
				if (rest.includes('?')) {
					isRequired = false;
				} else if (!type.endsWith('?') && !rest.includes('?')) {
					isRequired = true;
				}
				type = type.replace('?', '');
				fields.push({ name, type, isList, isRequired });
			}
		});
		models.push({ modelName, fields });
		match = modelRegex.exec(schema);
	}

	match = enumRegex.exec(schema);
	while (match !== null) {
		const [, enumName, body] = match;
		const values = body
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line && !line.startsWith('//'));
		enums.push({ enumName, values });
		match = enumRegex.exec(schema);
	}

	return { models, enums };
}

function prismaToGraphQL(models: PrismaModel[], enums: PrismaEnum[]): string {
	const enumDefs = enums.map((e) => {
		const values = e.values.map((v: string) => `  ${v}`).join('\n');
		return `enum ${e.enumName} {\n${values}\n}`;
	}).join('\n\n');

	const modelDefs = models.map((model) => {
		const fields = model.fields.map((field: { name: string; type: string; isList: boolean; isRequired: boolean }) => {
			const gqlType = PRISMA_TYPE_MAP[field.type as keyof typeof PRISMA_TYPE_MAP] || field.type;
			const typeStr = field.isList
				? `[${gqlType}${field.isRequired ? '!' : ''}]`
				: `${gqlType}${field.isRequired ? '!' : ''}`;
			return `  ${field.name}: ${typeStr}`;
		}).join('\n');
		return `type ${model.modelName} {\n${fields}\n}`;
	}).join('\n\n');

	return [enumDefs, modelDefs].filter(Boolean).join('\n\n');
}

const prismaPath = path.join(__dirname, '../../../databases/maindb/schema.prisma');
const graphqlPath = path.join(__dirname, '../../../src/graphql/typeDefs/database/index.graphql');

const prismaSchema = fs.readFileSync(prismaPath, 'utf8');
const { models, enums } = parsePrismaSchema(prismaSchema);
const graphqlSchema = prismaToGraphQL(models, enums);

fs.writeFileSync(graphqlPath, graphqlSchema);

// eslint-disable-next-line no-console
console.log(`Generated ${graphqlPath}`);
