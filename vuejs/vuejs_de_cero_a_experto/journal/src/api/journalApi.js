import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demos-83769-default-rtdb.firebaseio.com',
});

export default journalApi;
