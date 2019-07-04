import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setPlayerState,
  fetchStreams,
  setUser,
  setDelay
} from "../../actions/stream";
import { twitchAuth } from "../../actions/session";

const StreamShow = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.streams.user);
  const streams = useSelector(state => state.streams.streamList);
  const playerState = useSelector(state => state.streams.playerState);
  const accessToken = useSelector(state => state.session.twitchToken);
  const delay = useSelector(state => state.streams.delay);

  // Creates the twitch player
  const setEmbed = (ebd, usr) => {
    ebd = new window.Twitch.Embed("twitch_embed", {
      align: "center",
      width: "854",
      height: "480",
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
    await dispatch(setUser(newUser));
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
    renderTwitch();
  }, [user]);

  // Renders the randomize on/off button
  const renderRngButton = () => {
    let text;
    let classes = "ui button ";
    let icon;
    if (playerState) {
      text = "Keep watching";
      classes += "primary";
      icon = "play icon";
    } else {
      text = "blessRNG!";
      classes += "red";
      icon = "random icon";
    }
    return (
      <p>
        <button className={classes} onClick={handleClick}>
          <i className={icon} /> {text}
        </button>
      </p>
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

  if (streams) {
    return (
      <div>
        {renderRngButton()}
        {/*<TagForm onSubmit={onSubmit} />*/}
        <div className="ui container centered" id="twitch_embed" />
      </div>
    );
  } else {
    return <></>;
  }
};

export default StreamShow;
