import { registerRootComponent } from 'expo';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: "http://localhost:4000",
  uri: "http://192.168.16.107:4000/",
  cache: new InMemoryCache(),
});

const RootApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// Register the app with ApolloProvider
registerRootComponent(RootApp);
