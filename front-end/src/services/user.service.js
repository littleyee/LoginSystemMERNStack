import http from "../http-common";
import authHeader from './auth-header';
class UserService {
  getPublicContent() {
    return http.get('user/all');
  }

  getUserBoard() {
    return http.get('user/user', { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get('user/admin', { headers: authHeader() });
  }


  profileEdit(data) {
    return http.put('/profile/edit/', data, { headers: authHeader() })
      .then(response => {
        // combine old and new user data
        var user = JSON.parse(localStorage.getItem("user"));
        user = {...user, ...response.data};
        localStorage.setItem("user", JSON.stringify(user));

        return response.data;
      });
  }
}

export default new UserService();