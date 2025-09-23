// simple in-memory mock API to power the prototype

import { vehiclesSeed, bookingsSeed, jobsSeed, usersSeed } from "../data/seed";

let vehicles = JSON.parse(JSON.stringify(vehiclesSeed));
let bookings = JSON.parse(JSON.stringify(bookingsSeed));
let jobs = JSON.parse(JSON.stringify(jobsSeed));
let users = JSON.parse(JSON.stringify(usersSeed));

const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export async function listVehicles() {
  await delay();
  return vehicles;
}

export async function getVehicle(id) {
  await delay();
  return vehicles.find(v => v.id === Number(id));
}

export async function listBookings() {
  await delay();
  return bookings;
}

export async function createBooking(payload) {
  await delay();
  const id = bookings.length ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
  const b = { id, ...payload, status: "PENDING" };
  bookings.push(b);
  return b;
}

export async function listJobs() {
  await delay();
  return jobs;
}

export async function updateJob(id, patch) {
  await delay();
  const idx = jobs.findIndex(j => j.id === Number(id));
  if (idx >= 0) {
    jobs[idx] = { ...jobs[idx], ...patch };
    return jobs[idx];
  }
  throw new Error("Job not found");
}

export async function listUsers() {
  await delay();
  return users;
}

export async function addUser(payload) {
  await delay();
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const u = { id, ...payload };
  users.push(u);
  return u;
}
