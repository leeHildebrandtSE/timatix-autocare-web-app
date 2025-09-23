// src/services/mockApi.js

// Simulated delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getJobs() {
    await delay(500);
    return [
      { id: 1, title: "Oil Change", vehicle: "Toyota Corolla", status: "pending", progress: 0 },
      { id: 2, title: "Brake Replacement", vehicle: "Ford Ranger", status: "in-progress", progress: 50 },
      { id: 3, title: "Battery Check", vehicle: "Honda Civic", status: "completed", progress: 100 },
    ];
  },

  async getUsers() {
    await delay(500);
    return [
      { id: 1, name: "Alice Smith", role: "client", status: "active" },
      { id: 2, name: "John Doe", role: "mechanic", status: "active" },
      { id: 3, name: "Maria Lopez", role: "admin", status: "inactive" },
    ];
  },

  async getServiceHistory() {
    await delay(500);
    return [
      { id: 1, vehicle: "Toyota Corolla", service: "Oil Change", date: "2025-09-01", status: "completed" },
      { id: 2, vehicle: "Ford Ranger", service: "Brake Replacement", date: "2025-09-15", status: "pending" },
    ];
  }
};
