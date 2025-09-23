import React, { useEffect, useState } from "react";
import { listUsers } from "../api/mockApi";
import Button from "../components/ui/Button";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading users...");
        const data = await listUsers();
        if (!mounted) return;
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
        showToast({ type: "error", message: "Failed to load users" });
      } finally {
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading, showToast]);

  return (
    <div className="screen-content">
      <div className="screen-header">
        <div className="header-content">
          <div>
            <div className="header-title">
              <span className="header-emoji">👥</span>
              <h1>Users</h1>
            </div>
            <p className="header-subtitle">Manage team members and user accounts</p>
          </div>
        </div>
      </div>

      <div className="user-filters">
        <Button variant="ghost" className="filter-btn active" data-role="all">All</Button>
        <Button variant="ghost" className="filter-btn" data-role="client">Clients</Button>
        <Button variant="ghost" className="filter-btn" data-role="mechanic">Mechanics</Button>
        <Button variant="ghost" className="filter-btn" data-role="admin">Admins</Button>
      </div>

      <div className="users-table">
        {users.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No users found</h3>
            <p>There are currently no users in the system.</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="table-row user-card">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <span className={`role-badge ${user.role?.toLowerCase() || 'client'}`}>
                  {user.role || 'CLIENT'}
                </span>
                <span className={`status-badge ${user.status?.toLowerCase() || 'active'}`}>
                  {user.status || 'ACTIVE'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}