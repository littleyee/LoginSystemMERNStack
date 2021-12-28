import http from "../http-common";
import authHeader from './auth-header';



class LabManagementDataService {
  getAll(patient_id) {
    return http.get(`/lab-management/${patient_id}`, { headers: authHeader() });
  } 

  create(data) {
    return http.post("/lab-management/create", data, { headers: authHeader() });
  }

  update(lab_id, data) {
    return http.put(`/lab-management/${lab_id}/update`, data, { headers: authHeader() });
  }

  delete(lab_id) {
    return http.delete(`/lab-management/${lab_id}/delete`, { headers: authHeader() });
  }

  findByLabID(lab_id) {
    return http.get(`/lab-management/${lab_id}/getLab`, { headers: authHeader() });
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