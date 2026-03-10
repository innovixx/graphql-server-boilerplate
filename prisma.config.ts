import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';


export default defineConfig({
	datasource: {
		url: env('MAIN_DATABASE_URL'),
	},
});
