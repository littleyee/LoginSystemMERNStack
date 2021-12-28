import http from "../http-common";
import authHeader from './auth-header';


class MedicationManagementDataService {
  getAll(patient_id) {
    return http.get(`/medication-management/${patient_id}`, { headers: authHeader() });
  } 

  //get(medication_id) {
  //  return http.get(`/medication-management/${medication_id}`, { headers: authHeader() });
  //}

  create(data) {
    return http.post("/medication-management/create", data, { headers: authHeader() });
  }

  update(medication_id, data) {
    return http.put(`/medication-management/update/${medication_id}`, data, { headers: authHeader() });
  }

  delete(medication_id) {
    return http.delete(`/medication-management/${medication_id}`, { headers: authHeader() });
  }

  findByMedicationID(medication_id) {
    return http.get(`/medication-management/getMedication/${medication_id}`, { headers: authHeader() });
  }

  findMedication(data) {
    return http.post('/medication-management/search', data, { headers: authHeader() });
  }

  // dropdowns
  getDoctors() {
    return http.get('/medication-management/getDoctors');
  }


  getMedications(){
    return http.get('/medication-management/getMedications');
  }
  
  getMedicationFrequencies(){
    return http.get('/medication-management/getMedicationFrequencies')
  }

  getMedicationMeasurements(){

    return http.get('/medication-management/getMedicationMeasurements')

  }
  getPharmacies(){
    return http.get('/medication-management/getPharmacies')

  }
}

export default new MedicationManagementDataService();