import React from "react";
import { Container } from "semantic-ui-react";
import "fomantic-ui-css/semantic.min.css";

import StreamShow from "./stream/StreamShow";

const App = () => {
  const divStyle = {
    paddingLeft: "11%"
  };

  return (
    <Container>
      <StreamShow />
    </Container>
  );
};

export default App;
