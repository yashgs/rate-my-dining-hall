import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5001',//make sure this matches app.js
});
