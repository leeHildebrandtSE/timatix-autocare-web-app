import React, { useEffect, useState } from "react";
import { listUsers, addUser } from "../../api/mockApi";
import Button from "../../components/ui/Button";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'CLIENT' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();

  // Helper function to get user profile photo/avatar
  const getUserPhoto = (user) => {
    // For now, using emojis based on role and index, but you can replace with actual photos
    const rolePhotos = {
      'OPS_MANAGER': ['👨‍💼', '👩‍💼', '🧑‍💼'],
      'MECHANIC': ['👨‍🔧', '👩‍🔧', '🧑‍🔧'],
      'CLIENT': ['👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🎓', '👩‍🎓', '🧑‍⚕️'],
      'CLEANER': ['👨‍🧹', '👩‍🧹', '🧑‍🧹'],
      'ADMIN': ['👨‍⚖️', '👩‍⚖️', '🧑‍⚖️']
    };

    const photos = rolePhotos[user.role] || rolePhotos['CLIENT'];
    const index = user.name ? user.name.length % photos.length : 0;
    return photos[index];
  };

  // Helper function to get role-based gradient colors
  const getRoleColors = (role) => {
    const colorMap = {
      'OPS_MANAGER': { primary: '#dc2626', secondary: '#991b1b' }, // Red
      'MECHANIC': { primary: '#2563eb', secondary: '#1d4ed8' }, // Blue  
      'CLIENT': { primary: '#059669', secondary: '#047857' }, // Green
      'CLEANER': { primary: '#7c3aed', secondary: '#6d28d9' }, // Purple
      'ADMIN': { primary: '#ea580c', secondary: '#c2410c' } // Orange
    };
    return colorMap[role] || colorMap['CLIENT'];
  };

  // Helper function to generate realistic profile data
  const generateUserProfile = (user, index) => {
    const profilePictures = [
      '👨‍💼', '👩‍💼', '👨‍🔧', '👩‍🔧', '👨‍💻', '👩‍💻',
      '🧑‍💼', '🧑‍🔧', '🧑‍💻', '👨‍🎓', '👩‍🎓', '🧑‍🎓',
      '👨‍⚕️', '👩‍⚕️', '🧑‍⚕️', '👨‍🎨', '👩‍🎨', '🧑‍🎨'
    ];

    return {
      ...user,
      avatar: user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U',
      profilePhoto: getUserPhoto(user),
      joinDate: getJoinDate(index),
      lastActive: getLastActive(index),
      department: getDepartment(user.role),
      phone: getPhone(index),
      location: getLocation(index),
      jobsCompleted: getJobsCompleted(user.role, index),
      rating: getRating(user.role, index),
      isOnline: Math.random() > 0.3, // 70% chance of being online
      initials: user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
    };
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading users...");
        const data = await listUsers();
        if (!mounted) return;
        
        // Enhance user data with additional properties for better UX
        const enhancedUsers = data.map((user, index) => generateUserProfile(user, index));
        
        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
        showToast({ type: "success", message: `Loaded ${enhancedUsers.length} user${enhancedUsers.length > 1 ? 's' : ''}` });
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

  // Helper functions to generate realistic user data
  const getJoinDate = (index) => {
    const today = new Date();
    const monthsAgo = (index * 3) + 1;
    const date = new Date(today.getTime() - (monthsAgo * 30 * 24 * 60 * 60 * 1000));
    return date.toISOString().split('T')[0];
  };

  const getLastActive = (index) => {
    const statuses = ['Just now', '5 min ago', '1 hour ago', '2 hours ago', 'Yesterday', '3 days ago'];
    return statuses[index % statuses.length];
  };

  const getDepartment = (role) => {
    const departments = {
      'OPS_MANAGER': 'Management',
      'MECHANIC': 'Service Bay',
      'CLIENT': 'Customer',
      'CLEANER': 'Facilities',
      'ADMIN': 'Administration'
    };
    return departments[role] || 'General';
  };

  const getPhone = (index) => {
    const phones = ['+27 81 234 5678', '+27 82 345 6789', '+27 83 456 7890', '+27 84 567 8901'];
    return phones[index % phones.length];
  };

  const getLocation = (index) => {
    const locations = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth'];
    return locations[index % locations.length];
  };

  const getJobsCompleted = (role, index) => {
    if (role === 'CLIENT') return Math.floor(Math.random() * 10) + 1;
    if (role === 'MECHANIC') return Math.floor(Math.random() * 50) + 20;
    return Math.floor(Math.random() * 30) + 5;
  };

  const getRating = (role, index) => {
    if (role === 'CLIENT' || role === 'MECHANIC') {
      return (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0 rating
    }
    return null;
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = users;

    // Filter by role
    if (activeFilter !== 'all') {
      const roleMap = {
        'clients': 'CLIENT',
        'mechanics': 'MECHANIC',
        'admins': ['OPS_MANAGER', 'ADMIN'],
        'staff': ['CLEANER', 'MECHANIC', 'OPS_MANAGER', 'ADMIN']
      };
      
      const targetRoles = Array.isArray(roleMap[activeFilter]) 
        ? roleMap[activeFilter] 
        : [roleMap[activeFilter]];
        
      filtered = filtered.filter(user => 
        targetRoles.includes(user.role)
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'role':
          return a.role.localeCompare(b.role);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'joined':
          return new Date(b.joinDate) - new Date(a.joinDate);
        case 'active':
          return a.isOnline === b.isOnline ? 0 : a.isOnline ? -1 : 1;
        default: // name
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredUsers(filtered);
  }, [users, activeFilter, searchTerm, sortBy]);

  const handleRoleFilter = (role) => {
    setActiveFilter(role);
    showToast({ 
      type: "info", 
      message: `Filtered to ${role === 'all' ? 'all users' : role}` 
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) {
      showToast({ type: "error", message: "Name and email are required" });
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        ...newUser,
        status: 'ACTIVE'
      };
      
      const createdUser = await addUser(userData);
      
      // Enhance the new user data
      const enhancedUser = generateUserProfile({
        ...createdUser,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: 'Just now',
        jobsCompleted: 0,
        rating: null,
        isOnline: true
      }, users.length);
      
      setUsers(prev => [...prev, enhancedUser]);
      setNewUser({ name: '', email: '', role: 'CLIENT' });
      setShowAddUser(false);
      showToast({ type: "success", message: `User ${createdUser.name} added successfully!` });
    } catch (err) {
      showToast({ type: "error", message: "Failed to add user" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserStats = () => {
    const stats = {
      total: users.length,
      active: users.filter(u => u.status === 'ACTIVE').length,
      clients: users.filter(u => u.role === 'CLIENT').length,
      staff: users.filter(u => ['MECHANIC', 'OPS_MANAGER', 'ADMIN', 'CLEANER'].includes(u.role)).length,
      online: users.filter(u => u.isOnline).length
    };
    return stats;
  };

  const stats = getUserStats();

  return (
    <div className="screen-content">
      {/* Enhanced Header with Stats */}
      <div className="screen-header users-header">
        <div className="header-content">
          <div>
            <div className="header-title">
              <span className="header-emoji">👥</span>
              <h1>User Management</h1>
            </div>
            <p className="header-subtitle">Manage team members and customer accounts</p>
            <div className="status-badge">
              <div className="status-dot" />
              <span>{stats.online} online • {stats.total} total users</span>
            </div>
          </div>
          
          <div className="header-actions" style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
            <Button variant="primary" onClick={() => setShowAddUser(true)}>
              + Add User
            </Button>
            <Button variant="secondary">
              📊 User Reports
            </Button>
          </div>
        </div>
      </div>

      {/* User Stats Cards */}
      <div className="user-stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--spacing-6)',
        marginBottom: 'var(--spacing-8)'
      }}>
        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌐</div>
          <div className="stat-value">{stats.online}</div>
          <div className="stat-label">Online</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-value">{stats.staff}</div>
          <div className="stat-label">Staff</div>
        </div>
      </div>

      {/* Enhanced Filters and Controls */}
      <div className="users-controls" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-6)',
        marginBottom: 'var(--spacing-8)',
        background: 'var(--bg-surface)',
        padding: 'var(--spacing-6)',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-card)'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search users by name, email, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--spacing-4) var(--spacing-12) var(--spacing-4) var(--spacing-4)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              fontSize: 'var(--text-base)',
              transition: 'all var(--transition-base)'
            }}
          />
          <div style={{
            position: 'absolute',
            right: 'var(--spacing-4)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-lg)'
          }}>
            🔍
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--spacing-4)'
        }}>
          {/* Role Filters */}
          <div className="user-filters">
            {['all', 'clients', 'mechanics', 'admins', 'staff'].map(role => (
              <Button 
                key={role}
                variant="ghost"
                className={`filter-btn ${activeFilter === role ? 'active' : ''}`}
                onClick={() => handleRoleFilter(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>

          {/* Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <label htmlFor="sort-select" style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--text-secondary)'
            }}>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-3)',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                fontSize: 'var(--text-sm)'
              }}
            >
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
              <option value="joined">Join Date</option>
              <option value="active">Online Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            padding: 'var(--spacing-8)',
            borderRadius: 'var(--border-radius-2xl)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-2xl)',
            width: '90%',
            maxWidth: '500px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--spacing-6)'
            }}>
              <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                Add New User
              </h2>
              <button
                onClick={() => setShowAddUser(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: 'var(--text-xl)',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: 'var(--spacing-2)'
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddUser}>
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--spacing-2)',
                  color: 'var(--text-primary)'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--border-radius-lg)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    fontSize: 'var(--text-base)'
                  }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--spacing-2)',
                  color: 'var(--text-primary)'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--border-radius-lg)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    fontSize: 'var(--text-base)'
                  }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: 'var(--spacing-8)' }}>
                <label style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: 'var(--spacing-2)',
                  color: 'var(--text-primary)'
                }}>
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--border-radius-lg)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    fontSize: 'var(--text-base)'
                  }}
                >
                  <option value="CLIENT">Client</option>
                  <option value="MECHANIC">Mechanic</option>
                  <option value="CLEANER">Cleaner</option>
                  <option value="OPS_MANAGER">Operations Manager</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-3)',
                justifyContent: 'flex-end'
              }}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddUser(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enhanced User Grid with Profile Photos */}
      <div className="users-table">
        {filteredUsers.length === 0 ? (
          <div className="empty-state" style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: 'var(--spacing-12)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--border-radius-xl)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              fontSize: 'var(--text-5xl)',
              marginBottom: 'var(--spacing-6)',
              opacity: 0.5
            }}>
              {searchTerm || activeFilter !== 'all' ? '🔍' : '👥'}
            </div>
            <h3 style={{ marginBottom: 'var(--spacing-4)', color: 'var(--text-primary)' }}>
              {searchTerm || activeFilter !== 'all' ? 'No matching users found' : 'No users found'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)' }}>
              {searchTerm || activeFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'There are currently no users in the system.'}
            </p>
            {(searchTerm || activeFilter !== 'all') && (
              <Button variant="secondary" onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}>
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          filteredUsers.map((user) => {
            const roleColors = getRoleColors(user.role);
            return (
              <div key={user.id} className="user-card enhanced">
                {/* User Header with Enhanced Profile Photo */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--spacing-4)',
                  marginBottom: 'var(--spacing-4)'
                }}>
                  <div className="user-profile-photo" style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--border-radius-full)',
                    background: `linear-gradient(135deg, ${roleColors.primary}, ${roleColors.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    boxShadow: 'var(--shadow-lg)',
                    border: '3px solid var(--bg-surface)',
                    flexShrink: 0,
                    transition: 'all var(--transition-base)',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  >
                    {/* Profile photo or emoji */}
                    <span style={{ 
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      zIndex: 2,
                      position: 'relative'
                    }}>
                      {user.profilePhoto}
                    </span>
                    
                    {/* Online status indicator */}
                    {user.isOnline && (
                      <div style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '4px',
                        width: '18px',
                        height: '18px',
                        background: 'var(--success-color)',
                        borderRadius: 'var(--border-radius-full)',
                        border: '3px solid var(--bg-surface)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        animation: 'userOnlinePulse 2s ease-in-out infinite',
                        zIndex: 3
                      }} />
                    )}

                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                      borderRadius: 'var(--border-radius-full)',
                      zIndex: 1
                    }} />

                    {/* Initials fallback (hidden behind photo) */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'rgba(255, 255, 255, 0.3)',
                      zIndex: 0
                    }}>
                      {user.initials}
                    </div>
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-2)',
                      marginBottom: 'var(--spacing-1)'
                    }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {user.name}
                      </h4>
                      {user.isOnline && (
                        <span style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--success-color)',
                          fontWeight: 'var(--font-weight-medium)',
                          background: 'rgba(16, 185, 129, 0.1)',
                          padding: '2px 8px',
                          borderRadius: 'var(--border-radius-full)',
                          border: '1px solid rgba(16, 185, 129, 0.2)'
                        }}>
                          ● Online
                        </span>
                      )}
                    </div>
                    
                    <p style={{
                      margin: 0,
                      color: 'var(--text-secondary)',
                      fontSize: 'var(--text-sm)',
                      marginBottom: 'var(--spacing-2)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {user.email}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      gap: 'var(--spacing-2)',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <span className={`role-badge ${user.role?.toLowerCase().replace('_', '-') || 'client'}`}>
                        {user.role?.replace('_', ' ') || 'CLIENT'}
                      </span>
                      <span className={`status-badge ${user.status?.toLowerCase() || 'active'}`}>
                        {user.status || 'ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: 'var(--spacing-3)',
                  marginBottom: 'var(--spacing-4)',
                  padding: 'var(--spacing-4)',
                  background: 'var(--bg-hover)',
                  borderRadius: 'var(--border-radius-lg)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--font-weight-semibold)',
                      marginBottom: 'var(--spacing-1)'
                    }}>
                      Department
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {user.department}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--font-weight-semibold)',
                      marginBottom: 'var(--spacing-1)'
                    }}>
                      Location
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {user.location}
                    </div>
                  </div>
                  
                  {user.rating && (
                    <div>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        fontWeight: 'var(--font-weight-semibold)',
                        marginBottom: 'var(--spacing-1)'
                      }}>
                        Rating
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-1)'
                      }}>
                        <span style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--primary-color)',
                          fontWeight: 'var(--font-weight-semibold)'
                        }}>
                          ⭐ {user.rating}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--font-weight-semibold)',
                      marginBottom: 'var(--spacing-1)'
                    }}>
                      Jobs
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}>
                      {user.jobsCompleted}
                    </div>
                  </div>
                </div>

                {/* User Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 'var(--spacing-4)',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)'
                  }}>
                    <div>Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
                    <div>Last seen: {user.lastActive}</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-2)'
                  }}>
                    <Button variant="ghost" style={{ fontSize: 'var(--text-sm)', padding: 'var(--spacing-2) var(--spacing-3)' }}>
                      👁️ View Profile
                    </Button>
                    <Button variant="secondary" style={{ fontSize: 'var(--text-sm)', padding: 'var(--spacing-2) var(--spacing-3)' }}>
                      ✏️ Edit User
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Results Summary */}
      {filteredUsers.length > 0 && (
        <div style={{
          marginTop: 'var(--spacing-8)',
          padding: 'var(--spacing-4)',
          background: 'var(--bg-accent)',
          borderRadius: 'var(--border-radius-lg)',
          textAlign: 'center',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)'
        }}>
          Showing {filteredUsers.length} of {users.length} user{users.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' && ` • Filtered by: ${activeFilter}`}
          {searchTerm && ` • Search: "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}