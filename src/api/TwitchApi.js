import axios from 'axios';

export const apiAuthorize = () => {
    return axios.create({
        headers: {
        },
        baseURL: 'https://id.twitch.tv/oauth2/authorize'
    });
}

export const getAuthToken = code => {
    const clientId = 'aslj9ag0ds13j1qot1ui4hzdqss0bx';
    const clientSecret = 'dwtgwxpd5y0u7tbmxzripfu5ps7y0o';
    return axios.create({
        responseType: 'json',
        baseURL: `https://id.twitch.tv/oauth2/token?client_id=${clientId}&` +
                `client_secret=${clientSecret}&grant_type=client_credentials`
    });
}

export const twitchRequest = token => {
    return axios.create({
        responseType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        baseURL: 'https://api.twitch.tv/helix/'
    });
}

