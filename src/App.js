import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/employees/';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', designation: '', department: '', salary: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API_URL);
    setEmployees(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}${editingId}/`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: '', email: '', designation: '', department: '', salary: '' });
    fetchEmployees();
  };

  const handleEdit = (employee) => {
    setForm(employee);
    setEditingId(employee.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    fetchEmployees();
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Employee Manager</h1>

      <div className="card p-4 shadow-sm mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <input
                  name="designation"
                  placeholder="Designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="salary"
                  placeholder="Salary"
                  value={form.salary}
                  onChange={handleChange}
                  className="form-control"
                  required
                  type="number"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            {editingId ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
      </div>

      <div className="card p-4 shadow-sm">
        <h4 className="mb-4">Employee List</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
