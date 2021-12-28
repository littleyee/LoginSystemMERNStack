import http from "../http-common";
import authHeader from './auth-header';

class AppointmentRequestDataService {
  findAllMyAppointments() {
    return http.get("/appointments/findAllMyAppointments", { headers: authHeader() });
  }
  cancel(appointment_id) {
    return http.delete(`/appointments/${appointment_id}/cancel`, { headers: authHeader() });
  }

  //dropdowns
  getDoctors() {
    return http.get('/appointment-requests/getDoctors');
  }
  getAppointmentRequestTimes() {
    return http.get('/appointment-requests/getAppointmentRequestTimes');
  }
}

export default new AppointmentRequestDataService();