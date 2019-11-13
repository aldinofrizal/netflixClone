import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

export default client


// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws'
// import { split } from 'apollo-link';
// import { getMainDefinition } from 'apollo-utilities'

// const client = new ApolloClient({
//   link: split(
//     // split based on operation type
//     ({ query }) => {
//       const definition = getMainDefinition(query);
//       return (
//         definition.kind === 'OperationDefinition' &&
//         definition.operation === 'subscription'
//       );
//     },
//     new WebSocketLink({
//       uri: `ws://localhost:4000/graphql`,
//       options: {
//         reconnect: true
//       }
//     }),
//     new HttpLink({
//       uri: 'http://localhost:4000',
//       credentials: 'same-origin'
//     }),
//   ),
//   cache: new InMemoryCache()
// });

// export default client