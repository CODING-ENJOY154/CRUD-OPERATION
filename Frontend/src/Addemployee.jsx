import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from './Employeeservice';
import './Addemployee.css';

function Addemployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };

    if (id) {
      EmployeeService.updateEmployee(id, employee)
        .then((response) => {
          console.log('Update response:', response);
          navigate('/employees');
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
        });
    } else {
      EmployeeService.createEmployee(employee)
        .then((response) => {
          console.log('Create response:', response.data);
          navigate('/employees');
        })
        .catch((error) => {
          console.error('Error creating employee:', error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmailId(response.data.emailId);
        })
        .catch((error) => {
          console.error('Error fetching employee:', error);
        });
    }
  }, [id]);

  const title = () => {
    return <h2 className="text-center">{id ? 'Update Employee' : 'Add Employee'}</h2>;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          {title()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name :</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name :</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email Id :</label>
                <input
                  type="email"
                  placeholder="Enter email Id"
                  name="emailId"
                  className="form-control"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>
              <Link to="/employees" className="btn btn-danger">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addemployee;
