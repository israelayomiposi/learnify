import { useEffect, useState } from "react";
import API from "../../services/api.js";
import "./userManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/users"); // admin endpoint: list all users
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handlePromote = async (userId) => {
    try {
      await API.post("/admin/promote", { userId });
      alert("User promoted to admin!");
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: "admin" } : u));
    } catch (err) {
      console.error(err);
      alert("Error promoting user");
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== "admin" && <button onClick={() => handlePromote(u._id)}>Promote</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;