import React, { Component } from 'react';
import { connect } from 'react-redux';


import { fetchStreams, fetchUsers } from '../../actions/streamActions';
import { twitchAuth } from '../../actions/sessionActions';

class StreamShow extends Component {

    reloadTimeout = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    renderTwitch = async () => {
        let currentUser = '';
        let rng = null;
        let user = '';
        let embed;
        while (true) {
            rng = Math.trunc(Math.random() * 20);
            console.log(rng);
            user = this.props.streams[rng].user_name;
            let timeout = 15000;
//            let timeout = 1.8e+6;
            if (user != currentUser) {
                const script = document.createElement('script');
                script.setAttribute(
                    'src',
                    'https://embed.twitch.tv/embed/v1.js'
                );
                script.addEventListener('load', () => {
                    embed = new window.Twitch.Embed("twitch_embed", { 
                        width: '854', 
                        height: '480',
                        channel: user,
                        layout: 'video'
                    });
                });
                document.body.appendChild(script);
                currentUser = user;
            }
            await this.reloadTimeout(timeout);
            document.getElementById('twitch_embed').innerHTML = '';
        }
    }

    async componentWillMount(){
        await this.props.twitchAuth();
        await this.props.fetchStreams(this.props.accessToken);
        console.log(this.props.streams);
        await this.renderTwitch();
    }
    
    async componentDidMount(){
        if (this.props.streams) {
        }
    }

    render(){
        if (this.props.streams) {
            return (
                <div id='twitch_embed'>
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
        accessToken: state.session.twitchToken
    }
}

export default connect(mapStateToProps,{ 
    fetchStreams,
    fetchUsers,
    twitchAuth
})(StreamShow);