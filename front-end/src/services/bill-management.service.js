import http from "../http-common";
import authHeader from './auth-header';

class BillManagementDataService {
  getAll() {
    return http.get('/bill-management');
  }

  get(bill_id) {
    return http.get(`/bill-management/${bill_id}` );
  }

  create(data) {
    return http.post("/bill-management", data );
  }

  update(bill_id, data) {
    return http.put(`/bill-management/${bill_id}`, data );
  }

  delete(bill_id) {
    return http.delete(`/bill-management/${bill_id}` );
  }

  findByBillID(bill_id) {
    return http.get(`/bill-management?bill_id=${bill_id}` );
  }

  findBill(data) {
    return http.post('/bill-management/search', data);
  }
}

export default new BillManagementDataService();