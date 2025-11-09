
require('dotenv').config();
const { marked } = require('marked');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // serves frontend files

const url = process.env.FLOW_URL;
const apiKey = process.env.API_KEY;


// ✅ Unified route (matches frontend)
app.post('/api/trigger', async (req, res) => {
  try {
    // Build the correct payload
    const payload = {
      name: req.body.name,
      age: req.body.age,
      interest: req.body.interest || req.body.interests, // 👈 handles both singular/plural
      skills: req.body.skills,
      goals: req.body.goals,
    };

    console.log('➡️ Sending payload to WorqHat:', payload);

    // Call WorqHat Flow
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ WorqHat replied:', response.data);

    // Send only useful info back to frontend
    res.json({
      message:
        response.data?.data?.data?.result ||
        response.data?.data?.result ||
        response.data?.result ||
        response.data?.message ||
        'No readable response received.',
    });
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Error calling WorqHat API' });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
