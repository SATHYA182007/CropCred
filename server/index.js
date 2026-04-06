import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mock Data
const farmerData = {
  id: "FRM-8294",
  name: "Ramesh Kumar",
  location: "Maharashtra, India",
  creditScore: 840,
  loanEligibility: "₹ 4,50,000",
  cropHealth: 92,
  recentPayments: [
    { id: 1, date: "2024-03-01", amount: "₹ 15,000", status: "Paid" },
    { id: 2, date: "2024-02-01", amount: "₹ 15,000", status: "Paid" },
    { id: 3, date: "2024-01-01", amount: "₹ 15,000", status: "Paid" }
  ],
  climateResilience: 88,
  soilHealth: 85,
  yieldHistory: [
    { year: "2019", yield: 4.2 },
    { year: "2020", yield: 4.5 },
    { year: "2021", yield: 4.0 },
    { year: "2022", yield: 4.8 },
    { year: "2023", yield: 5.1 },
  ]
};

const bankerApplications = [
  { id: "A-101", name: "Ramesh Kumar", request: "₹ 4,50,000", score: 840, status: "Pending" },
  { id: "A-102", name: "Suresh Patil", request: "₹ 2,00,000", score: 620, status: "Under Review" },
  { id: "A-103", name: "Amit Singh", request: "₹ 7,50,000", score: 910, status: "Approved" },
  { id: "A-104", name: "Vikram Reddy", request: "₹ 1,20,000", score: 450, status: "Rejected" },
];

// REST API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CropCred API is running successfully.' });
});

app.get('/api/farmer/:id', (req, res) => {
  // In a real app we'd fetch by ID from DB, here we return our mock data
  res.json(farmerData);
});

app.get('/api/banker/applications', (req, res) => {
  res.json(bankerApplications);
});

import http from 'http';

// App listen
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`📡 CropCred Server is running on port ${PORT}`);
});
