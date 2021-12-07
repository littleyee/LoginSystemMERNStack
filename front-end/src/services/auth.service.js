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

  forgot(username) {
    return axios.post(API_URL + "forgot", {
      username
    });
  }
  forgotUserAccessCode(username, userAccessCode) {
    return axios.post(API_URL + "forgotUserAccessCode", {
      username,
      userAccessCode
    });
  }
  resetPassword(username, password, password2) {
    return axios.post(API_URL + "resetPassword", {
      username,
      password,
      password2
    });
  }

  register(data) {
    return axios.post(API_URL + "signup", data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();