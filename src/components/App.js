import React from "react";
import { Container } from "semantic-ui-react";
import "fomantic-ui-css/semantic.min.css";

import StreamShow from "./stream/StreamShow";

const App = () => {
  const playerCss = {
    width: "75%",
    height: "100%"
  };

  return (
    <Container style={playerCss}>
      <StreamShow />
    </Container>
  );
};

export default App;
