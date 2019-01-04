import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import Launches from './components/Launches';
import Launch from './components/Launch';
import { ApolloProvider } from "react-apollo";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from "./logo.jpg";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
       <Router>
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
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
       </Router>
      </ApolloProvider>
    );
  }
}

export default App;
