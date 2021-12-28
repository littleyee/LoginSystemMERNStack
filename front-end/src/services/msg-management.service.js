import http from "../http-common";
import authHeader from './auth-header';

class MsgManagementDataService {
  getAll() {
    return http.get('/msg-management');
  }

  get(msg_id) {
    return http.get(`/msg-management/${msg_id}` );
  }

  create(data) {
    return http.post("/msg-management", data );
  }

  update(msg_id, data) {
    return http.put(`/msg-management/${msg_id}`, data );
  }

  delete(msg_id) {
    return http.delete(`/msg-management/${msg_id}` );
  }

  findByMsgID(msg_id) {
    return http.get(`/msg-management?msg_id=${msg_id}` );
  }

  findMsg(data) {
    return http.post('/msg-management/search', data);
  }
}

export default new MsgManagementDataService();