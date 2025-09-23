import React, { useEffect, useState } from "react";
import { mockApi } from "../services/mockApi";
import Button from "../components/ui/Button";
import { useLoading } from "../hooks/useLoading";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading users...");
        const data = await mockApi.getUsers();
        if (!mounted) return;
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading]);

  return (
    <div className="container">
      <h1 className="page-title">Users</h1>
      <div className="user-filters">
        <Button variant="ghost" className="filter-btn active" data-role="all">All</Button>
        <Button variant="ghost" className="filter-btn" data-role="client">Clients</Button>
        <Button variant="ghost" className="filter-btn" data-role="mechanic">Mechanics</Button>
        <Button variant="ghost" className="filter-btn" data-role="admin">Admins</Button>
      </div>
      <div className="users-table">
        {users.map((user) => (
          <div key={user.id} className="table-row">
            <h4>{user.name}</h4>
            <span className={`role-badge ${user.role}`}>{user.role}</span>
            <span className={`status-badge ${user.status}`}>{user.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
