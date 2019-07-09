import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../actions/session";
import { Container } from "semantic-ui-react";
import { ABOUT } from "../actions/types";

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCurrentComponent(ABOUT));
    };
  }, []);

  const textDivCss = {
    width: "100%",
    height: "77.5%",
    paddingTop: "10%",
    paddingLeft: "3%",
    paddingRight: "3%"
  };

  return (
    <Container style={textDivCss}>
      <Container align="center">
        <h1>
          Twitch
          <i className="random icon" />
          RNG
        </h1>
      </Container>
      <Container align="center justified">
        <br />
        <p style={{ fontSize: "20px" }}>
          Twitch-RNG aims to emulate the TV experience with Twitch.tv channels
          through a timed randomizer. It's still a work in progress and open
          source with code available on my github page down below. The code is
          free to use and modify, just be nice and reference me :).
        </p>
        <br />
        <p style={{ fontSize: "20px" }}>
          Created by Gilberto "barbafh3" Timotheo.
        </p>
      </Container>
    </Container>
  );
};

export default About;
