import React from "react";
import { Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "fomantic-ui-css/semantic.min.css";

import StreamShow from "./stream/Show";
import About from "./About";
import Header from "./Header";
import Footer from "./Footer";

import history from "../history";

const App = () => {
  const pageCss = {
    width: "70%",
    height: "100%"
  };

  const menuCss = {
    paddingLeft: "6%",
    paddingRight: "6%",
    width: "100%",
    height: "100%"
  };

  return (
    <Container style={pageCss}>
      <Container style={menuCss}>
        <Router history={history}>
          <Header />
          <Route path="/" exact component={StreamShow} />
          <Route path="/about" component={About} />
          <Footer />
        </Router>
      </Container>
    </Container>
  );
};

export default App;
