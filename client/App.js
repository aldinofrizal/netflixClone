import React from 'react';

import client from './config/apollo'
import { ApolloProvider } from '@apollo/react-hooks'
import StackNav from './src/Navigation'
export default function App() {
  return (
    <ApolloProvider client={client}>
      <StackNav />
    </ApolloProvider>
  );
}
