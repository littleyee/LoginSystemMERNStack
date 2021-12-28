import http from "../http-common";
import authHeader from './auth-header';


class LabManagementDataService {
  getAll(lab_id) {
    return http.get(`/lab-management/${lab_id}`, { headers: authHeader() });
  } 

  create(data) {
    return http.post("/lab-management/create", data, { headers: authHeader() });
  }

  update(lab_id, data) {
    return http.put(`/lab-management/update/${lab_id}`, data, { headers: authHeader() });
  }

  delete(lab_id) {
    return http.delete(`/lab-management/${lab_id}`, { headers: authHeader() });
  }

  findByLabID(lab_id) {
    return http.get(`/lab-management/getLab/${lab_id}`, { headers: authHeader() });
  }

  // dropdowns
  getPatients() {
    return http.get('/lab-management/getPatients');
  }


  getOrderedBys(){
    return http.get('/lab-management/getOrderedBys');
  }
  
  getReviewedBys(){
    return http.get('/lab-management/getReviewedBys')
  }

  
}

export default new LabManagementDataService();