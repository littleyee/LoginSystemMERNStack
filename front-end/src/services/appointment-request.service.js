import http from "../http-common";
import authHeader from './auth-header';

class AppointmentRequestDataService {
  create(data) {
    return http.post("/appointment-requests/create", data, { headers: authHeader() });
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