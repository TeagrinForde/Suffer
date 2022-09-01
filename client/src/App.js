import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from "./pages/Home.js";
import LoginPage from './pages/LoginPage.js';
import Profile from "./pages/Profile.js";
import Header from "./components/Header.js";
import Directions from './components/Directions';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <div className="flex-column justify-flex-start h-100"> */}
          
          <div className="entire">
            <Routes>
              <Route 
                path="/" 
                element={<Home />}
              />
              <Route 
                path="/login"
                element={<LoginPage />}
                />
              <Route
              path="/profile"
              element={[<Header />, <Profile/>]}
              />
              <Route
              path="/me"
              element={<Profile/>}
              />
            </Routes>
          </div>
        {/*</div> */}

      </Router>
    </ApolloProvider>
  );
}

export default App;
