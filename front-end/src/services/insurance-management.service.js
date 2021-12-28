import http from "../http-common";
import authHeader from './auth-header';

class InsuranceManagementDataService {
  getAll() {
    return http.get('/insurance-management');
  }

  get(insurance_id) {
    return http.get(`/insurance-management/${insurance_id}` );
  }

  create(data) {
    return http.post("/insurance-management", data );
  }

  update(insurance_id, data) {
    return http.put(`/insurance-management/${insurance_id}`, data );
  }

  delete(insurance_id) {
    return http.delete(`/insurance-management/${insurance_id}` );
  }

  findByInsuranceID(insurance_id) {
    return http.get(`/insurance-management?insurance_id=${insurance_id}` );
  }

  findInsurance(data) {
    return http.post('/insurance-management/search', data);
  }
}

export default new InsuranceManagementDataService();