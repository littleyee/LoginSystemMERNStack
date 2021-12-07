import http from "../http-common";
import authHeader from './auth-header';

class PersonService {
  getGenders() {
    return http.get('/person/getGenders');
  }
  getPronouns() {
    return http.get('/person/getPronouns');
  }
  getSexAtBirths() {
    return http.get('/person/getSexAtBirths');
  }
  getStates() {
    return http.get('/person/getStates');
  }
}

export default new PersonService();