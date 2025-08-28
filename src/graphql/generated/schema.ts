export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type PaginatedDocs = {
  total: Scalars['Int']['output'];
};

export type PaginatedTests = PaginatedDocs & {
  __typename?: 'PaginatedTests';
  items?: Maybe<Array<Test>>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  tests: PaginatedTests;
};


export type QueryTestsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Where>;
};

export type Test = {
  __typename?: 'Test';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Where = {
  and?: InputMaybe<Array<InputMaybe<Where>>>;
  field: Scalars['String']['input'];
  or?: InputMaybe<Array<InputMaybe<Where>>>;
  value?: InputMaybe<WhereField>;
};

export type WhereField = {
  contains?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['JSON']['input']>;
  greater_than?: InputMaybe<Scalars['JSON']['input']>;
  greater_than_equal?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Scalars['JSON']['input']>;
  less_than?: InputMaybe<Scalars['JSON']['input']>;
  not_equals?: InputMaybe<Scalars['JSON']['input']>;
  not_in?: InputMaybe<Scalars['JSON']['input']>;
};
