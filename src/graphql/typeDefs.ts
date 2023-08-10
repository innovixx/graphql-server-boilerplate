import gql from 'graphql-tag';
import { testTypeDefs } from './typeDefParts';

export const typeDefs = gql`
  scalar Date
  scalar JSON

  ${testTypeDefs}
`;
