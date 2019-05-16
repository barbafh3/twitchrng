import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    setPlayerState,
    fetchStreamsByTag,
    fetchUsers,
    fetchAllTags,
    getTagByName
} from '../../actions/streamActions';
import { twitchAuth } from '../../actions/sessionActions';
import TagForm from './TagForm';

class StreamShow extends Component {

    reloadTimeout = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    renderTwitch = async () => {
        let currentUser = '';
        let rng = null;
        let user = '';
        let embed;
        while (this.props.playerState) {
            document.getElementById('twitch_embed').innerHTML = '';
            rng = Math.trunc(Math.random() * 20);
            user = this.props.streams[rng].user_name;
            let timeout = 60000;
            // let timeout = 1.8e+6;
            if (user !== currentUser) {
                const script = document.createElement('script');
                script.setAttribute(
                    'src',
                    'https://embed.twitch.tv/embed/v1.js'
                );
                script.addEventListener('load', () => {
                    embed = new window.Twitch.Embed("twitch_embed", {
                        align: 'center',
                        width: '854',
                        height: '480',
                        channel: user,
                        layout: 'video'
                    });
                });
                await document.body.appendChild(script);
                currentUser = user;
                await this.reloadTimeout(timeout);
            }
        }
    }

    changePlayerState = () => {
        this.props.setPlayerState(!this.props.playerState);
    }

    renderRngButton = () => {
        let text;
        let classes = 'ui button ';
        let icon;
        if (this.props.playerState){
            text = 'Keep watching';
            classes += 'primary';
            icon = 'play icon';
        } else {
            text = 'RNG me!';
            classes += 'red';
            icon = 'random icon';
        }
        return (
            <p>
                <button 
                    className={classes}
                    onClick={() => this.changePlayerState()}
                >
                    <i className={icon}></i> {text}
                </button>
            </p>
        );
    }

    onSubmit = formValues => {
        this.props.getTagByName(this.props.tags, formValues);
    }

    async componentWillMount(){
        await this.props.twitchAuth();
        await this.props.fetchAllTags(this.props.accessToken);
        await this.props.getTagByName(this.props.tags, 'Speedrun');
        await this.props.fetchStreamsByTag(this.props.accessToken, this.props.tag[0].tagId);
        console.log(this.props.streams);
        this.renderTwitch();
    }
    
    async componentDidUpdate(prevProps) {
        if (this.props.playerState !== prevProps.playerState) {
            await this.renderTwitch();
            try {
                await this.props.fetchStreamsByTag(this.props.accessToken, this.props.tag[0].tagId);
            } catch (e) {
                console.log(e);
                await this.props.twitchAuth();
                await this.props.fetchStreams(this.props.accessToken);
            }
        }
    }

    render(){
        if (this.props.streams) {
            return (
                <div>
                    {this.renderRngButton()}
                    <TagForm onSubmit={this.onSubmit} />
                    <div className='ui container centered' id='twitch_embed'>
                    </div>
                </div>
            )
        } else {
            return <div>Loading...</div>
        }
    };
}

const mapStateToProps = state => {
    return {
        users: state.streams.users,
        streams: state.streams.streams,
        tags: state.streams.tags,
        tag: state.streams.tag,
        playerState: state.streams.playerState,
        accessToken: state.session.twitchToken
    }
}

export default connect(mapStateToProps,{
    fetchStreamsByTag,
    fetchUsers,
    twitchAuth,
    setPlayerState,
    fetchAllTags,
    getTagByName
})(StreamShow);