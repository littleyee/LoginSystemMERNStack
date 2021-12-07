import http from "../http-common";
import authHeader from './auth-header';

class PersonManagementDataService {
  getAll() {
    return http.get("/person-management", { headers: authHeader() });
  }

  get(person_id) {
    return http.get(`/person-management/${person_id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/person-management", data, { headers: authHeader() });
  }

  update(person_id, data) {
    return http.put(`/person-management/${person_id}`, data, { headers: authHeader() });
  }

  delete(person_id) {
    return http.delete(`/person-management/${person_id}`, { headers: authHeader() });
  }

  findByPersonID(person_id) {
    return http.get(`/person-management?person_id=${person_id}`, { headers: authHeader() });
  }

  findPerson(data) {
    return http.post('/person-management/search', data, { headers: authHeader() });
  }
}

export default new PersonManagementDataService();