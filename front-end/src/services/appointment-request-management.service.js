import http from "../http-common";
import authHeader from './auth-header';

class AppointmentRequestManagementDataService {
  getAll() {
    return http.get("/appointment-request-management/findAll", { headers: authHeader() });
  }
  findByAppointmentRequestID(appointment_request_id) {
    return http.get(`/appointment-request-management/${appointment_request_id}`, { headers: authHeader() });
  }
  approve(appointment_request_id, data) {
    return http.post(`/appointment-request-management/${appointment_request_id}/approve`, data, { headers: authHeader() });
  }
  deny(appointment_request_id) {
    return http.get(`/appointment-request-management/${appointment_request_id}/deny`, { headers: authHeader() });
  }
  create(data) {
    return http.post("/appointment-request-management/create", data, { headers: authHeader() });
  }

  //dropdowns
  getDoctors() {
    return http.get('/appointment-request-management/getDoctors');
  }
  getAppointmentRequestTimes() {
    return http.get('/appointment-request-management/getAppointmentRequestTimes');
  }
}

export default new AppointmentRequestManagementDataService();