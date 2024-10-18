import axios from 'axios';

const EMP_URL = '/api/v1/employees';

class Employeeservice {
  getAllEmployees() {
    return axios.get(EMP_URL);
  }

  createEmployee(employee) {
    return axios.post(EMP_URL, employee);
  }

  updateEmployee(id, employee) {
    return axios.put(`${EMP_URL}/${id}`, employee);
  }

  getEmployeeById(id) {
    return axios.get(`${EMP_URL}/${id}`);
  }

  deleteEmployee(id) {
    return axios.delete(`${EMP_URL}/${id}`);
  }
}

export default new Employeeservice();
