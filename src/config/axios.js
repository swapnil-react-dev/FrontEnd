import axios from 'axios';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// const axiosClient = axios.create({
//   baseURL: isLocalhost
//     ? 'http://45.59.167.124:2449/api/'
//     : 'http://45.59.167.124:2449/api/',
// }); 

const axiosClient = axios.create({
  baseURL: isLocalhost
  ? 'http://192.168.43.125:2449/api/'
  : 'http://192.168.43.125:2449/api/'
});

// const axiosClient = axios.create({
//   baseURL: isLocalhost
//   ? 'http://localhost:2449/api/'
//   : 'http://localhost:2449/api/'
// });
export default axiosClient;

//PORT 2449 VMS