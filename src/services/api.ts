import axios from 'axios';

const api = axios.create({
    baseURL: 'https://coronavac-typescript.herokuapp.com/'
});

export default api;