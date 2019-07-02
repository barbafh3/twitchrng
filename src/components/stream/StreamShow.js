import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { setPlayerState, fetchStreams } from "../../actions/stream";
import { twitchAuth } from "../../actions/session";

const StreamShow = () => {
  const dispatch = useDispatch();

  const streams = useSelector(state => state.streams.streamList);
  const playerState = useSelector(state => state.streams.playerState);
  const accessToken = useSelector(state => state.session.twitchToken);

  const reloadTimeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const renderTwitch = async () => {
    let currentUser = "";
    let rng = null;
    let user = "";
    let embed;

    const parentEl = document.createElement("div");
    parentEl.setAttribute("id", "twitch_embed");
    await document.body.appendChild(parentEl);

    while (playerState) {
      parentEl.innerHTML = "";
      document.getElementById("twitch_embed").innerHTML = "";
      rng = Math.trunc(Math.random() * 20);
      user = streams[rng].user_name;
      let timeout = 60000;
      // let timeout = 1.8e+6;
      if (user !== currentUser) {
        const script = document.createElement("script");
        script.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
        script.addEventListener("load", () => {
          embed = new window.Twitch.Embed("twitch_embed", {
            align: "center",
            width: "854",
            height: "480",
            channel: user,
            layout: "video"
          });
        });
        parentEl.appendChild(script);
        currentUser = user;
        await reloadTimeout(timeout);
      }
    }
  };

  const changePlayerState = async () => {
    await dispatch(setPlayerState(!playerState));
  };

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
        <button className={classes} onClick={() => changePlayerState()}>
          <i className={icon} /> {text}
        </button>
      </p>
    );
  };

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const startup = async () => {
    await dispatch(twitchAuth());
    await dispatch(fetchStreams(accessToken));
    await changePlayerState();
  };

  // Runs once when component mounts
  useEffect(() => {
    startup();
  }, []);

  useEffect(() => {
    renderTwitch();
  }, [playerState]);

  if (streams) {
    return (
      <div>
        {renderRngButton()}
        {/*<TagForm onSubmit={onSubmit} />*/}
        <div className="ui container centered" id="twitch_embed" />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default StreamShow;
