import axios from 'axios';

export default axios.create({
        responseType: 'json',
        baseURL: 'http://localhost:3001/'
});