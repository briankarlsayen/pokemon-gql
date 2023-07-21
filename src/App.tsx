import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Pokedex from './pages/Pokedex';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Pokedex />,
  },
]);

function App() {
  const baseUrl = 'https://graphqlpokemon.favware.tech/v7';
  const client = new ApolloClient({
    uri: baseUrl,
    cache: new InMemoryCache(),
  });
  return (
    <div data-theme='light' className='min-h-screen h-full'>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>
  );
}

export default App;
