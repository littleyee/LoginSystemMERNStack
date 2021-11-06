import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username,
    email,
    password,
    firstname,
    lastname,
    address,
    birthday,
    //sex,
    //gender,
    state,
    city,
    zip) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firstname,
      lastname,
      address,
      birthday,
      //sex,
      //gender,
      state,
      city,
      zip
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();