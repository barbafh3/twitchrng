import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "semantic-ui-react";

import { fetchStreams, setDelay, randomUser } from "../../actions/stream";
import { twitchAuth, setCurrentComponent } from "../../actions/session";
import { SHOW } from "../../actions/types";

const StreamShow = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.streams.user);
  const recentUsers = useSelector(state => state.streams.recentUsers);
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

  // Runs once when component mounts.
  // Gets the auth token from twitch and
  // gets the list of streams
  useEffect(() => {
    (async () => {
      await dispatch(twitchAuth());
      await dispatch(fetchStreams(accessToken));
      await dispatch(setCurrentComponent(SHOW));
    })();
  }, []);

  // Sets an interval to randomize the user
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerState && streams) {
        dispatch(randomUser(streams, recentUsers));
        dispatch(setDelay(300000));
      }
    }, delay);
    return () => clearInterval(interval);
  });

  // Re-renders the player everytime
  // the user changes
  useEffect(() => {
    if (type === "live") {
      renderTwitch();
    } else if (streams) {
      dispatch(randomUser(streams, recentUsers));
    }
  }, [user]);

  const playerDivCss = {
    width: "100%",
    height: "77.5%"
    //    paddingTop: "3%"
  };

  const playerCss = {
    width: "85%",
    height: "90%",
    paddingTop: "6%"
  };

  if (streams) {
    return (
      <Container style={playerDivCss} id="player">
        <Container style={playerCss} textAlign="center" id="twitch_embed" />
      </Container>
    );
  } else {
    return <></>;
  }
};

export default StreamShow;
