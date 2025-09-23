export const vehiclesSeed = [
  {
    id: 1,
    makeModel: "Honda Civic 2019",
    license: "ABC-1234",
    vin: "1HGBH41JXMN109186",
    miles: 45230,
    mpg: 32.5,
    services: 12,
    totalSpent: "R 2,847",
    lastServiceDays: 15
  },
  {
    id: 2,
    makeModel: "Toyota RAV4 2021",
    license: "XYZ-5678",
    vin: "2HGBH41JXMN109187",
    miles: 22890,
    mpg: 28.7,
    services: 6,
    totalSpent: "R 1,200",
    lastServiceDays: 80
  }
];

export const bookingsSeed = [
  { id: 1, vehicleId: 1, date: "2025-09-29", time: "08:00", serviceType: "Oil Change", notes: "", status: "CONFIRMED" }
];

export const jobsSeed = [
  { id: 1, bookingId: 1, mechanic: "Thabo", status: "IN_PROGRESS", startedAt: "2025-09-20T07:30:00Z" }
];

export const usersSeed = [
  { id: 1, name: "Lee Hildebrandt", email: "lee@example.com", role: "OPS_MANAGER", status: "ACTIVE" },
  { id: 2, name: "Fransina Martins", email: "fransina@example.com", role: "CLEANER", status: "ACTIVE" }
];
