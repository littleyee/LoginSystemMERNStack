import http from "../http-common";
import authHeader from './auth-header';

class AppointmentManagementDataService {
  getAll() {
    return http.get("/appointment-management", { headers: authHeader() });
  }

  get(appointment_id) {
    return http.get(`/appointment-management/${appointment_id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/appointment-management/create", data, { headers: authHeader() });
  }

  update(appointment_id, data) {
    return http.put(`/appointment-management/${appointment_id}`, data, { headers: authHeader() });
  }

  cancel(appointment_id) {
    return http.delete(`/appointment-management/${appointment_id}`, { headers: authHeader() });
  }

  findByPersonID(appointment_id) {
    return http.get(`/appointment-management?appointment_id=${appointment_id}`, { headers: authHeader() });
  }

  findPerson(data) {
    return http.post('/appointment-management/search', data, { headers: authHeader() });
  }

  //dropdowns
  getPatients() {
    return http.get('/appointment-management/getPatients');
  }
  getDoctors() {
    return http.get('/appointment-management/getDoctors');
  }
  getAppointmentStatuses() {
    return http.get('/appointment-management/getAppointmentStatuses');
  }
}

export default new AppointmentManagementDataService();