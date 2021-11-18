import axios from 'axios';

const key = process.env.VUE_APP_WEB_API_KEY;

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key,
  },
});

export default authApi;
