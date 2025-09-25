import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    // Mock save functionality
    console.log('Saving profile:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    // Mock password change
    console.log('Changing password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  const getRoleColor = (role) => {
    switch (role?.toUpperCase()) {
      case 'CLIENT': return 'from-green-500 to-green-600';
      case 'MECHANIC': return 'from-orange-500 to-orange-600';
      case 'ADMIN':
      case 'OPS_MANAGER': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toUpperCase()) {
      case 'CLIENT': return 'bg-green-100 text-green-800 border-green-200';
      case 'MECHANIC': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ADMIN':
      case 'OPS_MANAGER': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 bg-gradient-to-r ${getRoleColor(user?.role)} rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{user?.name || 'User Profile'}</h1>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(user?.role)}`}>
                  {user?.role || 'User'}
                </span>
                <span className="text-blue-100">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-800 py-3">{formData.name || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-800 py-3">{formData.email || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-800 py-3">{formData.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <p className="text-gray-800 py-3">{user?.role || 'Not assigned'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  {isEditing ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 py-3">{formData.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors duration-200"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>

          {/* Account Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-200 text-left">
                  Download My Data
                </button>
                <button className="w-full px-4 py-3 bg-yellow-50 text-yellow-700 rounded-xl font-medium hover:bg-yellow-100 transition-colors duration-200 text-left">
                  Export Activity Log
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-3 bg-red-50 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors duration-200 text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Account Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-800">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-semibold text-gray-800">Today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;