import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      businessName: "Timatix AutoCare",
      email: "admin@timatixautocare.com",
      phone: "+27 21 123 4567",
      address: "123 Workshop Street, Cape Town, 8001",
      timezone: "Africa/Johannesburg",
      currency: "ZAR",
      language: "en",
    },
    business: {
      workingHours: {
        start: "08:00",
        end: "17:00",
      },
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      bookingSlots: 30,
      maxAdvanceBooking: 30,
      autoConfirmBookings: true,
      sendReminders: true,
      reminderTime: 24,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      jobUpdates: true,
      customerMessages: true,
      systemAlerts: true,
      reports: true,
    },
    users: {
      allowSelfRegistration: false,
      requireEmailVerification: true,
      passwordMinLength: 8,
      sessionTimeout: 60,
      multipleLoginAttempts: 3,
      accountLockoutTime: 15,
    },
    pricing: {
      defaultLaborRate: 150,
      taxRate: 15,
      discountLimit: 20,
      paymentMethods: ["cash", "card", "eft"],
      autoGenerateQuotes: true,
      requireApprovalOver: 1000,
    },
    integrations: {
      emailService: "sendgrid",
      smsService: "twilio",
      paymentGateway: "stripe",
      backupService: "google_drive",
      analyticsService: "google_analytics",
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      retentionDays: 30,
      lastBackup: "2 hours ago",
    },
    advanced: {
      debugMode: false,
      apiLogging: true,
      performanceMonitoring: true,
      apiRateLimit: 1000,
      sessionCacheSize: 128,
      dbPoolSize: 20,
      fileUploadLimit: 50,
    },
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const updateSetting = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setUnsavedChanges(true);
  };

  const updateNestedSetting = (section, parent, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value,
        },
      },
    }));
    setUnsavedChanges(true);
  };

  const saveSettings = async () => {
    console.log("Saving settings:", settings);
    setTimeout(() => {
      setUnsavedChanges(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const resetSettings = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all settings to default values?"
      )
    ) {
      window.location.reload();
    }
  };

  const performBackup = async () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      updateSetting("backup", "lastBackup", "Just now");
      alert("Backup completed successfully!");
    }, 3000);
  };

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "business", name: "Business", icon: "🏢" },
    { id: "notifications", name: "Notifications", icon: "📧" },
    { id: "users", name: "Users & Security", icon: "🔐" },
    { id: "pricing", name: "Pricing", icon: "💰" },
    { id: "integrations", name: "Integrations", icon: "🔗" },
    { id: "backup", name: "Backup & Maintenance", icon: "💾" },
    { id: "advanced", name: "Advanced", icon: "🔧" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="admin-settings-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                ⚙️
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  System Settings
                </h1>
                <p className="text-purple-100 text-lg">
                  Configure your AutoCare system
                </p>
              </div>
            </div>
            {unsavedChanges && (
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                  <span className="text-sm">⚠️ Unsaved changes</span>
                </div>
                <button
                  onClick={saveSettings}
                  className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Settings</h2>
              </div>
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-purple-100 text-purple-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-sm">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* General Settings */}
              {activeTab === "general" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    General Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Name
                        </label>
                        <input
                          type="text"
                          value={settings.general.businessName}
                          onChange={(e) =>
                            updateSetting(
                              "general",
                              "businessName",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settings.general.email}
                          onChange={(e) =>
                            updateSetting("general", "email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={settings.general.phone}
                          onChange={(e) =>
                            updateSetting("general", "phone", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) =>
                            updateSetting("general", "timezone", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Africa/Johannesburg">
                            Africa/Johannesburg
                          </option>
                          <option value="Africa/Cape_Town">
                            Africa/Cape_Town
                          </option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={settings.general.currency}
                          onChange={(e) =>
                            updateSetting("general", "currency", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="ZAR">South African Rand (ZAR)</option>
                          <option value="USD">US Dollar (USD)</option>
                          <option value="EUR">Euro (EUR)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={settings.general.language}
                          onChange={(e) =>
                            updateSetting("general", "language", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="af">Afrikaans</option>
                          <option value="zu">Zulu</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Address
                      </label>
                      <textarea
                        value={settings.general.address}
                        onChange={(e) =>
                          updateSetting("general", "address", e.target.value)
                        }
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Business Settings */}
              {activeTab === "business" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Business Operations
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Opening Time
                        </label>
                        <input
                          type="time"
                          value={settings.business.workingHours.start}
                          onChange={(e) =>
                            updateNestedSetting(
                              "business",
                              "workingHours",
                              "start",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Closing Time
                        </label>
                        <input
                          type="time"
                          value={settings.business.workingHours.end}
                          onChange={(e) =>
                            updateNestedSetting(
                              "business",
                              "workingHours",
                              "end",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Booking Slot Duration (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.business.bookingSlots}
                          onChange={(e) =>
                            updateSetting(
                              "business",
                              "bookingSlots",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Advance Booking (days)
                        </label>
                        <input
                          type="number"
                          value={settings.business.maxAdvanceBooking}
                          onChange={(e) =>
                            updateSetting(
                              "business",
                              "maxAdvanceBooking",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reminder Time (hours before)
                        </label>
                        <input
                          type="number"
                          value={settings.business.reminderTime}
                          onChange={(e) =>
                            updateSetting(
                              "business",
                              "reminderTime",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Working Days
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          "monday",
                          "tuesday",
                          "wednesday",
                          "thursday",
                          "friday",
                          "saturday",
                          "sunday",
                        ].map((day) => (
                          <label
                            key={day}
                            className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={settings.business.workingDays.includes(
                                day
                              )}
                              onChange={(e) => {
                                const newDays = e.target.checked
                                  ? [...settings.business.workingDays, day]
                                  : settings.business.workingDays.filter(
                                      (d) => d !== day
                                    );
                                updateSetting(
                                  "business",
                                  "workingDays",
                                  newDays
                                );
                              }}
                              className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {day}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <ToggleCard
                        title="Auto-confirm bookings"
                        description="Automatically approve new bookings"
                        checked={settings.business.autoConfirmBookings}
                        onChange={(checked) =>
                          updateSetting(
                            "business",
                            "autoConfirmBookings",
                            checked
                          )
                        }
                      />

                      <ToggleCard
                        title="Send reminders"
                        description="Automatically send appointment reminders"
                        checked={settings.business.sendReminders}
                        onChange={(checked) =>
                          updateSetting("business", "sendReminders", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <ToggleCard
                      title="Email Notifications"
                      description="Receive notifications via email"
                      checked={settings.notifications.emailNotifications}
                      onChange={(checked) =>
                        updateSetting(
                          "notifications",
                          "emailNotifications",
                          checked
                        )
                      }
                    />

                    <ToggleCard
                      title="SMS Notifications"
                      description="Receive notifications via SMS"
                      checked={settings.notifications.smsNotifications}
                      onChange={(checked) =>
                        updateSetting(
                          "notifications",
                          "smsNotifications",
                          checked
                        )
                      }
                    />

                    <ToggleCard
                      title="Push Notifications"
                      description="Receive push notifications in browser"
                      checked={settings.notifications.pushNotifications}
                      onChange={(checked) =>
                        updateSetting(
                          "notifications",
                          "pushNotifications",
                          checked
                        )
                      }
                    />

                    <ToggleCard
                      title="Job Updates"
                      description="Get notified about job status changes"
                      checked={settings.notifications.jobUpdates}
                      onChange={(checked) =>
                        updateSetting("notifications", "jobUpdates", checked)
                      }
                    />

                    <ToggleCard
                      title="Customer Messages"
                      description="Get notified about customer messages"
                      checked={settings.notifications.customerMessages}
                      onChange={(checked) =>
                        updateSetting(
                          "notifications",
                          "customerMessages",
                          checked
                        )
                      }
                    />

                    <ToggleCard
                      title="System Alerts"
                      description="Get notified about system issues"
                      checked={settings.notifications.systemAlerts}
                      onChange={(checked) =>
                        updateSetting("notifications", "systemAlerts", checked)
                      }
                    />

                    <ToggleCard
                      title="Reports"
                      description="Receive scheduled business reports"
                      checked={settings.notifications.reports}
                      onChange={(checked) =>
                        updateSetting("notifications", "reports", checked)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Users & Security Settings */}
              {activeTab === "users" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Users & Security</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Password Length
                        </label>
                        <input
                          type="number"
                          value={settings.users.passwordMinLength}
                          onChange={(e) => updateSetting('users', 'passwordMinLength', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.users.sessionTimeout}
                          onChange={(e) => updateSetting('users', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Login Attempts
                        </label>
                        <input
                          type="number"
                          value={settings.users.multipleLoginAttempts}
                          onChange={(e) => updateSetting('users', 'multipleLoginAttempts', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Lockout Time (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.users.accountLockoutTime}
                          onChange={(e) => updateSetting('users', 'accountLockoutTime', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <ToggleCard
                        title="Allow Self Registration"
                        description="Let users create their own accounts"
                        checked={settings.users.allowSelfRegistration}
                        onChange={(checked) => updateSetting('users', 'allowSelfRegistration', checked)}
                      />

                      <ToggleCard
                        title="Require Email Verification"
                        description="Users must verify their email address"
                        checked={settings.users.requireEmailVerification}
                        onChange={(checked) => updateSetting('users', 'requireEmailVerification', checked)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Settings */}
              {activeTab === "pricing" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Pricing Configuration</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Labor Rate (per hour)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">R</span>
                          </div>
                          <input
                            type="number"
                            value={settings.pricing.defaultLaborRate}
                            onChange={(e) => updateSetting('pricing', 'defaultLaborRate', parseFloat(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tax Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={settings.pricing.taxRate}
                          onChange={(e) => updateSetting('pricing', 'taxRate', parseFloat(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Discount (%)
                        </label>
                        <input
                          type="number"
                          value={settings.pricing.discountLimit}
                          onChange={(e) => updateSetting('pricing', 'discountLimit', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Require Approval Over (R)
                        </label>
                        <input
                          type="number"
                          value={settings.pricing.requireApprovalOver}
                          onChange={(e) => updateSetting('pricing', 'requireApprovalOver', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Accepted Payment Methods
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['cash', 'card', 'eft', 'mobile', 'crypto'].map(method => (
                          <label key={method} className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.pricing.paymentMethods.includes(method)}
                              onChange={(e) => {
                                const newMethods = e.target.checked 
                                  ? [...settings.pricing.paymentMethods, method]
                                  : settings.pricing.paymentMethods.filter(m => m !== method);
                                updateSetting('pricing', 'paymentMethods', newMethods);
                              }}
                              className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700 capitalize">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <ToggleCard
                      title="Auto-generate quotes"
                      description="Automatically create quotes from job estimates"
                      checked={settings.pricing.autoGenerateQuotes}
                      onChange={(checked) => updateSetting('pricing', 'autoGenerateQuotes', checked)}
                    />
                  </div>
                </div>
              )}

              {/* Integrations Settings */}
              {activeTab === "integrations" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Third-party Integrations</h3>
                  <div className="space-y-6">
                    {Object.entries(settings.integrations).map(([key, value]) => (
                      <div key={key} className="p-4 border border-gray-300 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="font-medium text-gray-800 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </div>
                            <div className="text-sm text-gray-600">
                              {key === 'emailService' && 'Email delivery service'}
                              {key === 'smsService' && 'SMS notification service'}
                              {key === 'paymentGateway' && 'Payment processing service'}
                              {key === 'backupService' && 'Data backup service'}
                              {key === 'analyticsService' && 'Analytics and tracking'}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {value ? 'Connected' : 'Not configured'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <select
                            value={value}
                            onChange={(e) => updateSetting('integrations', key, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="">Select service...</option>
                            {key === 'emailService' && (
                              <>
                                <option value="sendgrid">SendGrid</option>
                                <option value="mailgun">Mailgun</option>
                                <option value="ses">AWS SES</option>
                              </>
                            )}
                            {key === 'smsService' && (
                              <>
                                <option value="twilio">Twilio</option>
                                <option value="clickatell">Clickatell</option>
                                <option value="smsglobal">SMS Global</option>
                              </>
                            )}
                            {key === 'paymentGateway' && (
                              <>
                                <option value="stripe">Stripe</option>
                                <option value="payfast">PayFast</option>
                                <option value="paypal">PayPal</option>
                              </>
                            )}
                            {key === 'backupService' && (
                              <>
                                <option value="google_drive">Google Drive</option>
                                <option value="dropbox">Dropbox</option>
                                <option value="aws_s3">AWS S3</option>
                              </>
                            )}
                            {key === 'analyticsService' && (
                              <>
                                <option value="google_analytics">Google Analytics</option>
                                <option value="mixpanel">Mixpanel</option>
                                <option value="hotjar">Hotjar</option>
                              </>
                            )}
                          </select>
                          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors duration-200">
                            Configure
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backup & Maintenance Settings */}
              {activeTab === "backup" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Backup & Maintenance</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={settings.backup.backupFrequency}
                          onChange={(e) => updateSetting('backup', 'backupFrequency', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Retention Period (days)
                        </label>
                        <input
                          type="number"
                          value={settings.backup.retentionDays}
                          onChange={(e) => updateSetting('backup', 'retentionDays', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <ToggleCard
                      title="Automatic Backups"
                      description="Enable scheduled automatic backups"
                      checked={settings.backup.autoBackup}
                      onChange={(checked) => updateSetting('backup', 'autoBackup', checked)}
                    />

                    <div className="space-y-4">
                      <ActionCard
                        title="System Backup"
                        description={`Last backup: ${settings.backup.lastBackup}`}
                        action={
                          <button 
                            onClick={performBackup}
                            disabled={isBackingUp}
                            className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
                          >
                            {isBackingUp ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Backing up...</span>
                              </div>
                            ) : (
                              'Backup Now'
                            )}
                          </button>
                        }
                      />

                      <ActionCard
                        title="Database Maintenance"
                        description="Optimize database performance and clean up old data"
                        action={
                          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200">
                            Optimize
                          </button>
                        }
                      />

                      <ActionCard
                        title="System Updates"
                        description="Check for and install system updates"
                        action={
                          <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors duration-200">
                            Check Updates
                          </button>
                        }
                      />

                      <ActionCard
                        title="Cache Management"
                        description="Clear system cache to improve performance"
                        action={
                          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200">
                            Clear Cache
                          </button>
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Settings */}
              {activeTab === "advanced" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Advanced Settings
                  </h3>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600 text-xl">⚠️</span>
                      <div>
                        <div className="font-medium text-yellow-800">
                          Advanced Settings
                        </div>
                        <div className="text-sm text-yellow-700">
                          These settings can affect system performance. Change
                          with caution.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <ToggleCard
                        title="Debug Mode"
                        description="Enable detailed logging for troubleshooting"
                        checked={settings.advanced.debugMode}
                        onChange={(checked) =>
                          updateSetting("advanced", "debugMode", checked)
                        }
                      />

                      <ToggleCard
                        title="API Request Logging"
                        description="Log all API requests and responses"
                        checked={settings.advanced.apiLogging}
                        onChange={(checked) =>
                          updateSetting("advanced", "apiLogging", checked)
                        }
                      />

                      <ToggleCard
                        title="Performance Monitoring"
                        description="Monitor system performance metrics"
                        checked={settings.advanced.performanceMonitoring}
                        onChange={(checked) =>
                          updateSetting(
                            "advanced",
                            "performanceMonitoring",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            API Rate Limit (requests/minute)
                          </label>
                          <input
                            type="number"
                            value={settings.advanced.apiRateLimit}
                            onChange={(e) =>
                              updateSetting(
                                "advanced",
                                "apiRateLimit",
                                parseInt(e.target.value)
                              )
                            }
                            min={100}
                            max={10000}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Cache Size (MB)
                          </label>
                          <input
                            type="number"
                            value={settings.advanced.sessionCacheSize}
                            onChange={(e) =>
                              updateSetting(
                                "advanced",
                                "sessionCacheSize",
                                parseInt(e.target.value)
                              )
                            }
                            min={32}
                            max={512}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Database Connection Pool Size
                          </label>
                          <input
                            type="number"
                            value={settings.advanced.dbPoolSize}
                            onChange={(e) =>
                              updateSetting(
                                "advanced",
                                "dbPoolSize",
                                parseInt(e.target.value)
                              )
                            }
                            min={5}
                            max={100}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            File Upload Limit (MB)
                          </label>
                          <input
                            type="number"
                            value={settings.advanced.fileUploadLimit}
                            onChange={(e) =>
                              updateSetting(
                                "advanced",
                                "fileUploadLimit",
                                parseInt(e.target.value)
                              )
                            }
                            min={1}
                            max={500}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save/Reset Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={resetSettings}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-colors duration-200"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={saveSettings}
                  disabled={!unsavedChanges}
                  className="px-8 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors duration-200"
                >
                  {unsavedChanges ? "Save Changes" : "Saved"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ToggleCard = ({ title, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
    <div>
      <div className="font-medium text-gray-800">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
    </label>
  </div>
);

const ActionCard = ({ title, description, action }) => (
  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="font-medium text-gray-800">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{description}</div>
      </div>
      <div className="ml-4">{action}</div>
    </div>
  </div>
);

export default Settings;
