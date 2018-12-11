import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import Lunches from './components/Launches';
import { ApolloProvider } from "react-apollo";
import logo from "./logo.jpg";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <img
            src={logo}
            alt="spaceX"
            style={{
              width: 300,
              display: "block",
              height: "80px",
              margin: "auto"
            }}
          />
          <Lunches />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
