import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { randomUser } from "../actions/stream";
import { SET_PLAYER_STATE, SHOW } from "../actions/types";
import { setCurrentComponent } from "../actions/session";

const Header = () => {
  const dispatch = useDispatch();

  const playerState = useSelector(state => state.streams.playerState);
  const recentUsers = useSelector(state => state.streams.recentUsers);
  const streams = useSelector(state => state.streams.streamList);
  const component = useSelector(state => state.session.component);

  // Renders the randomize on/off button
  const renderRngButton = () => {
    let text;
    let classes = "ui inverted button ";
    let icon;
    if (playerState) {
      text = "Keep watching";
      icon = "play icon";
    } else {
      text = "blessRNG!";
      icon = "random icon";
    }
    if (component === SHOW) {
      return (
        <Menu.Menu position="right">
          <Menu.Item>
            <button className={classes} onClick={handleRngClick}>
              <i className={icon} /> {text}
            </button>
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      return <></>;
    }
  };

  // Toggles the playerState and randomizes
  // the user if playerState is set to true
  const handleRngClick = async () => {
    await dispatch(setCurrentComponent(SHOW));
    await dispatch({ type: SET_PLAYER_STATE, payload: !playerState });
    console.log(playerState);
    if (!playerState) {
      dispatch(randomUser(streams, recentUsers));
    }
  };

  return (
    <div>
      <Menu borderless inverted color="purple" style={{ margin: "0" }}>
        <Menu.Item>
          <h1>
            <NavLink to="/" activeStyle={{ color: "white" }}>
              Twitch
              <i className="random icon" />
              RNG
            </NavLink>
          </h1>
        </Menu.Item>
        {renderRngButton()}
      </Menu>
    </div>
  );
};

export default Header;
