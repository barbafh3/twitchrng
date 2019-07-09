import React from "react";
import { useDispatch } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";

import { pushHistory, setCurrentComponent } from "../actions/session";
import { ABOUT } from "../actions/types";

const Footer = () => {
  const dispatch = useDispatch();

  const handleAboutClick = async () => {
    await dispatch(setCurrentComponent(ABOUT));
    dispatch(pushHistory("/about"));
  };

  return (
    <div>
      <Menu inverted footer size="large" color="purple" style={{ margin: "0" }}>
        <Menu.Item>
          <label color="purple" style={{ fontSize: "16px" }}>
            All content provided and owned by Twitch.tv
          </label>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="github" />
            <a href="https://github.com/barbafh3/twitchrng">Github</a>
          </Menu.Item>
          <Menu.Item>
            <button className="ui inverted button" onClick={handleAboutClick}>
              About
            </button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Footer;
