import React, { useEffect, useState } from "react";
import { listJobs } from "../api/mockApi";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import Button from "../components/ui/Button";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('status');
  const [searchTerm, setSearchTerm] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading jobs...");
        const data = await listJobs();
        if (!mounted) return;
        
        // Enhance job data with additional properties for better UX
        const enhancedJobs = data.map((job, index) => ({
          ...job,
          title: job.title || `Job #${job.id}`,
          description: getJobDescription(job.status),
          priority: getJobPriority(index),
          estimatedTime: getEstimatedTime(job.status),
          progress: getJobProgress(job.status),
          customer: getCustomer(index),
          vehicle: getVehicle(index),
          tags: getJobTags(job.status),
          createdAt: getCreatedDate(index),
          dueDate: getDueDate(job.status, index)
        }));
        
        setJobs(enhancedJobs);
        setFilteredJobs(enhancedJobs);
        showToast({ type: "success", message: `Loaded ${enhancedJobs.length} job${enhancedJobs.length > 1 ? 's' : ''}` });
      } catch (err) {
        console.error("Failed to load jobs", err);
        showToast({ type: "error", message: "Failed to load jobs" });
      } finally {
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading, showToast]);

  // Helper functions to generate realistic job data
  const getJobDescription = (status) => {
    const descriptions = {
      'PENDING': 'Awaiting mechanic assignment and initial inspection.',
      'IN_PROGRESS': 'Currently being worked on by assigned mechanic.',
      'COMPLETED': 'Service completed successfully and ready for pickup.',
      'ON_HOLD': 'Waiting for parts or customer approval.'
    };
    return descriptions[status] || 'Standard automotive service job.';
  };

  const getJobPriority = (index) => {
    const priorities = ['high', 'medium', 'low'];
    return priorities[index % priorities.length];
  };

  const getEstimatedTime = (status) => {
    const times = {
      'PENDING': '2-4 hours',
      'IN_PROGRESS': '1-2 hours remaining',
      'COMPLETED': 'Completed',
      'ON_HOLD': 'TBD'
    };
    return times[status] || '2-3 hours';
  };

  const getJobProgress = (status) => {
    const progress = {
      'PENDING': 0,
      'IN_PROGRESS': 65,
      'COMPLETED': 100,
      'ON_HOLD': 25
    };
    return progress[status] || 0;
  };

  const getCustomer = (index) => {
    const customers = ['Sarah Johnson', 'Mike Wilson', 'Lisa Chen', 'David Brown', 'Emma Davis'];
    return customers[index % customers.length];
  };

  const getVehicle = (index) => {
    const vehicles = ['Honda Civic 2019', 'Toyota RAV4 2021', 'Ford F-150 2020', 'BMW X3 2022', 'Mazda CX-5 2021'];
    return vehicles[index % vehicles.length];
  };

  const getJobTags = (status) => {
    const tagSets = {
      'PENDING': ['New', 'Intake'],
      'IN_PROGRESS': ['Active', 'Urgent'],
      'COMPLETED': ['Finished', 'Ready'],
      'ON_HOLD': ['Waiting', 'Parts']
    };
    return tagSets[status] || ['Service'];
  };

  const getCreatedDate = (index) => {
    const today = new Date();
    const daysAgo = index * 2;
    const date = new Date(today.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    return date.toISOString().split('T')[0];
  };

  const getDueDate = (status, index) => {
    if (status === 'COMPLETED') return 'Completed';
    const today = new Date();
    const daysFromNow = (index % 3) + 1;
    const date = new Date(today.getTime() + (daysFromNow * 24 * 60 * 60 * 1000));
    return date.toISOString().split('T')[0];
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = jobs;

    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered.filter(job => 
        job.status.toLowerCase().replace('_', '-') === activeFilter
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.mechanic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.vehicle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'progress':
          return b.progress - a.progress;
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default: // status
          return a.status.localeCompare(b.status);
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, activeFilter, searchTerm, sortBy]);

  const handleStatusFilter = (status) => {
    setActiveFilter(status);
    showToast({ 
      type: "info", 
      message: `Filtered to ${status === 'all' ? 'all jobs' : status.replace('-', ' ') + ' jobs'}` 
    });
  };

  const getJobStats = () => {
    const stats = {
      total: jobs.length,
      pending: jobs.filter(j => j.status === 'PENDING').length,
      inProgress: jobs.filter(j => j.status === 'IN_PROGRESS').length,
      completed: jobs.filter(j => j.status === 'COMPLETED').length,
      onHold: jobs.filter(j => j.status === 'ON_HOLD').length
    };
    return stats;
  };

  const stats = getJobStats();

  return (
    <div className="screen-content">
      {/* Enhanced Header with Stats */}
      <div className="screen-header jobs-header">
        <div className="header-content">
          <div>
            <div className="header-title">
              <span className="header-emoji">⚙️</span>
              <h1>Service Jobs</h1>
            </div>
            <p className="header-subtitle">Manage active service jobs and track progress</p>
            <div className="status-badge">
              <div className="status-dot" />
              <span>{stats.inProgress} active • {stats.total} total jobs</span>
            </div>
          </div>
          
          <div className="header-actions" style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
            <Button variant="primary">
              + New Job
            </Button>
            <Button variant="secondary">
              📊 Reports
            </Button>
          </div>
        </div>
      </div>

      {/* Job Stats Cards */}
      <div className="job-stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--spacing-6)',
        marginBottom: 'var(--spacing-8)'
      }}>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏸️</div>
          <div className="stat-value">{stats.onHold}</div>
          <div className="stat-label">On Hold</div>
        </div>
      </div>

      {/* Enhanced Filters and Controls */}
      <div className="jobs-controls" style={{
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
            placeholder="Search jobs, mechanics, customers..."
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
          {/* Status Filters */}
          <div className="user-filters">
            {['all', 'pending', 'in-progress', 'completed', 'on-hold'].map(status => (
              <Button 
                key={status}
                variant="ghost"
                className={`filter-btn ${activeFilter === status ? 'active' : ''}`}
                onClick={() => handleStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
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
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="progress">Progress</option>
              <option value="created">Created Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Job List */}
      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <div className="empty-state" style={{
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
              {searchTerm || activeFilter !== 'all' ? '🔍' : '⚙️'}
            </div>
            <h3 style={{ marginBottom: 'var(--spacing-4)', color: 'var(--text-primary)' }}>
              {searchTerm || activeFilter !== 'all' ? 'No matching jobs found' : 'No jobs available'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)' }}>
              {searchTerm || activeFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'There are currently no active jobs in the system.'}
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
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card enhanced">
              {/* Priority Indicator */}
              <div className={`priority-indicator priority-${job.priority}`} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                borderRadius: 'var(--border-radius-xl) var(--border-radius-xl) 0 0'
              }} />

              <div className="job-header">
                <div className="job-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-2)' }}>
                    <h3 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                      {job.title}
                    </h3>
                    <div className={`priority-badge priority-${job.priority}`} style={{
                      padding: 'var(--spacing-1) var(--spacing-2)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      textTransform: 'uppercase',
                      background: job.priority === 'high' ? '#fef2f2' : job.priority === 'medium' ? '#fffbeb' : '#f0fdf4',
                      color: job.priority === 'high' ? '#dc2626' : job.priority === 'medium' ? '#d97706' : '#16a34a',
                      border: `1px solid ${job.priority === 'high' ? '#fecaca' : job.priority === 'medium' ? '#fed7aa' : '#bbf7d0'}`
                    }}>
                      {job.priority}
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                      <strong>Customer:</strong> {job.customer}
                    </p>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                      <strong>Vehicle:</strong> {job.vehicle}
                    </p>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                      <strong>Mechanic:</strong> {job.mechanic}
                    </p>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                      <strong>Est. Time:</strong> {job.estimatedTime}
                    </p>
                  </div>
                  
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                    {job.description}
                  </p>
                  
                  <div className="job-tags" style={{
                    display: 'flex',
                    gap: 'var(--spacing-2)',
                    marginTop: 'var(--spacing-3)',
                    flexWrap: 'wrap'
                  }}>
                    {job.tags.map((tag, index) => (
                      <span key={index} className="tag" style={{
                        background: 'var(--bg-accent)',
                        color: 'var(--primary-color)',
                        padding: 'var(--spacing-1) var(--spacing-3)',
                        borderRadius: 'var(--border-radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        border: '1px solid var(--primary-color)'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="job-badges">
                  <span className={`job-badge status-${job.status?.toLowerCase().replace('_', '-') || 'pending'}`}>
                    {job.status?.replace('_', ' ') || 'PENDING'}
                  </span>
                  <div style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    textAlign: 'right',
                    marginTop: 'var(--spacing-2)'
                  }}>
                    Due: {job.dueDate}
                  </div>
                </div>
              </div>
              
              <div className="job-progress">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--spacing-2)'
                }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                    Progress
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-color)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {job.progress}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Job Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'var(--spacing-5)',
                paddingTop: 'var(--spacing-4)',
                borderTop: '1px solid var(--border-color)'
              }}>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)'
                }}>
                  Created: {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div style={{
                  display: 'flex',
                  gap: 'var(--spacing-2)'
                }}>
                  <Button variant="ghost" style={{ fontSize: 'var(--text-sm)', padding: 'var(--spacing-2) var(--spacing-3)' }}>
                    View Details
                  </Button>
                  <Button variant="secondary" style={{ fontSize: 'var(--text-sm)', padding: 'var(--spacing-2) var(--spacing-3)' }}>
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Results Summary */}
      {filteredJobs.length > 0 && (
        <div style={{
          marginTop: 'var(--spacing-8)',
          padding: 'var(--spacing-4)',
          background: 'var(--bg-accent)',
          borderRadius: 'var(--border-radius-lg)',
          textAlign: 'center',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)'
        }}>
          Showing {filteredJobs.length} of {jobs.length} job{jobs.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' && ` • Filtered by: ${activeFilter.replace('-', ' ')}`}
          {searchTerm && ` • Search: "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}