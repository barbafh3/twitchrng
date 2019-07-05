import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Menu, Checkbox, Icon } from "semantic-ui-react";

import {
  setPlayerState,
  fetchStreams,
  setUser,
  setDelay,
  setType
} from "../../actions/stream";
import { twitchAuth } from "../../actions/session";

const StreamShow = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.streams.user);
  const type = useSelector(state => state.streams.type);
  const streams = useSelector(state => state.streams.streamList);
  const playerState = useSelector(state => state.streams.playerState);
  const accessToken = useSelector(state => state.session.twitchToken);
  const delay = useSelector(state => state.streams.delay);

  // Creates the twitch player
  const setEmbed = (ebd, usr) => {
    ebd = new window.Twitch.Embed("twitch_embed", {
      align: "center",
      position: "absolute",
      width: "100%",
      height: "100%",
      channel: usr,
      layout: "video"
    });
  };

  // Clears and renders/re-renders the player
  // created by the setEmbed function
  const renderTwitch = () => {
    if (user) {
      let twitchTag = document.getElementById("twitch_embed");
      twitchTag.innerHTML = "";
      let embed;
      let parentEl = document.createElement("div");
      parentEl.setAttribute("id", "twitch_embed");
      document.body.appendChild(parentEl);
      let script = document.createElement("script");
      script.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
      script.addEventListener("load", setEmbed(embed, user));
      parentEl.appendChild(script);
    }
  };

  // Gets a random user from the streams list
  // and sets it on the store
  const randomUser = async () => {
    let rng = Math.trunc(Math.random() * 20);
    let newUser = streams[rng].user_name;
    let type = streams[rng].type;
    console.log(type);
    await dispatch(setUser(newUser));
    await dispatch(setType(type));
  };

  // Runs once when component mounts.
  // Gets the auth token from twitch and
  // gets the list of streams
  useEffect(() => {
    (async () => {
      await dispatch(twitchAuth());
      await dispatch(fetchStreams(accessToken));
    })();
  }, []);

  // Sets an interval to randomize the user
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerState) {
        randomUser();
        dispatch(setDelay(60000));
      }
    }, delay);
    return () => clearInterval(interval);
  });

  // Re-renders the player everytime
  // the user changes
  useEffect(() => {
    if (type === "live") {
      renderTwitch();
    } else {
      randomUser();
    }
  }, [user]);

  // Renders the randomize on/off button
  const renderRngButton = () => {
    let text;
    let classes = "ui floating button ";
    let icon;
    if (playerState) {
      text = "Keep watching";
      classes += "purple";
      icon = "play icon";
    } else {
      text = "blessRNG!";
      classes += "red";
      icon = "random icon";
    }
    return (
      <Checkbox checked={playerState} onClick={handleClick} toggle />

      // <button className={classes} onClick={handleClick}>
      //   <i className={icon} /> {text}
      // </button>
    );
  };

  // Toggles the playerState and randomizes
  // the user if playerState is set to true
  const handleClick = async () => {
    await dispatch(setPlayerState(!playerState));
    if (!playerState) {
      randomUser();
    }
  };

  const menuCss = {
    paddingLeft: "6%",
    paddingRight: "6%",
    width: "100%",
    height: "100%"
  };

  const playerDivCss = {
    width: "100%",
    height: "77.5%",
    paddingTop: "3%"
  };

  const playerCss = {
    width: "85%",
    height: "100%",
    paddingBottom: "5%"
  };

  if (streams) {
    return (
      <Container style={menuCss}>
        <Menu borderless inverted color="purple">
          <Menu.Item>
            <h1>TwitchRNG</h1>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <label color="purple" style={{ fontSize: "20px" }}>
                Randomize
              </label>
            </Menu.Item>
            <Menu.Item>{renderRngButton()}</Menu.Item>
          </Menu.Menu>
        </Menu>
        <br />
        <Container style={playerDivCss} id="player" color="grey">
          <Container style={playerCss} textAlign="center" id="twitch_embed" />
        </Container>
        {/*<TagForm onSubmit={onSubmit} />*/}
        <Menu borderless inverted footer size="large" color="purple">
          <Menu.Item>
            <Icon name="github" />
            <a href="https://github.com/barbafh3/twitchrng">Github</a>
          </Menu.Item>
          <Menu.Item>
            <Icon name="twitter" />
            <a href="https://www.twitter.com/onizildo">Twitter</a>
          </Menu.Item>
        </Menu>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default StreamShow;
