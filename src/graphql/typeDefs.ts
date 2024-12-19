import { gql } from 'graphql-tag';
import { testTypeDefs } from './typeDefParts/index.js';

export const typeDefs = gql`
  scalar Date
  scalar JSON

  ${testTypeDefs}
`;
