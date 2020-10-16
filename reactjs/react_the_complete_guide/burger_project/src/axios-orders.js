import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://react-burger-29990.firebaseio.com/',
});

export default axiosInstance;
