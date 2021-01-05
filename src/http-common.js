import axios from "axios";
const token = JSON.parse(localStorage.getItem('user'))['accessToken']

/* Peticion al backend con la autorizacion */
console.log(token)
export default axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json",
    "Authorization": 'Bearer ' + token
  }
});