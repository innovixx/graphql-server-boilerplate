# GraphQL Server Boilerplate

This GraphQL server boilerplate provides a basic structure for building servers. It contains the essential dependencies and scripts to run and develop a GraphQL server using TypeScript, Apollo Server, Prisma, and other popular libraries. 

## Getting Started

1. Clone the repository: 

   ```bash
   git clone git@github.com:Innovixx-Development/graphql-server-boilerplate.git
   ```

2. Install the dependencies: 

   ```bash
   yarn install
   ```

3. Start the development server: 

   ```bash
   yarn dev
   ```

   This will start a development server at `http://localhost:3000/api` that you can use to test your GraphQL queries and mutations.

4. To build the production-ready server, run: 

   ```bash
   yarn build
   ```

   This will compile the TypeScript code to JavaScript and output it to the `./dist` folder.

5. To start the production server, run: 

   ```bash
   yarn serve
   ```

## Scripts

- `yarn dev`: Starts the development server using `nodemon` and `ts-node`.
- `yarn build`: Compiles the TypeScript code to JavaScript using `tsc`.
- `yarn serve`: Starts the production server using the compiled JavaScript code.
- `yarn cleanDev`: Resets the database and seeds it with test data before starting the development server.
- `yarn db:migrate:main`: Runs database migrations for the `maindb` schema using `npx prisma`.
- `yarn db:migrate:main:prod`: Runs database migrations for the `maindb` schema in production using `npx prisma`.
- `yarn db:reset`: Resets the database for the `maindb` schema using `npx prisma`.
