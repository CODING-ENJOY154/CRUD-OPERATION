import { useEffect, useState } from "react";
import "./List.css";
import Employeeservice from "./Employeeservice";
import { Link } from "react-router-dom";

function Listemployee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all employees on component mount
  useEffect(() => {
    getAllEmployees();
  }, []);

  // Fetch all employees
  const getAllEmployees = () => {
    setLoading(true); // Start loading
    Employeeservice.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        setError(null); // Clear error if fetching is successful
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch employees. Please try again."); // Set error message
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  // Delete an employee and update state
  const deleteEmployee = (employeeId) => {
    Employeeservice.deleteEmployee(employeeId)
      .then(() => {
        // Filter out the deleted employee from state
        setEmployees(employees.filter((employee) => employee.id !== employeeId));
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to delete employee. Please try again."); // Set error message
      });
  };

  return (
    <div className="ts">
      <div className="container">
        <h2 className="m">List Employees</h2>

        {/* Button Container aligned to the left */}
        <div className="button-container">
          <Link to="/add-employee" className="btn btn-primary add-employee-btn">
            Add Employee
          </Link>
        </div>

        <div className="table-container">
          {loading ? (
            <p>Loading employees...</p> // Loading message
          ) : error ? (
            <p className="error">{error}</p> // Error message
          ) : employees.length === 0 ? (
            <p>No employees found.</p> // Empty state message
          ) : (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Id</th>
                  <th>Employee First Name</th>
                  <th>Employee Last Name</th>
                  <th>Employee Email Id</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.emailId}</td>
                    <td className="actions">
                      <Link className="btn btn-info" to={`/update-employee/${employee.id}`}>
                        Update
                      </Link>
                      <button
                        className="btn btn-danger delete-button"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listemployee;
