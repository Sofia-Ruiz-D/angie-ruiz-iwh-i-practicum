require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const BASE_URL = 'https://api.hubapi.com';
const customObjectType = 'p51096549_solicitudes_bot_admisiones';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/crm/v3/objects/${customObjectType}`,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`
        },
        params: {
          properties: 'name,programa_interes,canal_origen'
        }
      }
    );

    res.render('homepage', { records: response.data.results });

  } catch (error) {
    res.status(500).send("Error retrieving records from HubSpot.");
  }
});

app.get('/update-cobj', (req, res) => {
  res.render('updates');
});

app.post('/update-cobj', async (req, res) => {
  try {
    await axios.post(
      `${BASE_URL}/crm/v3/objects/${customObjectType}`,
      {
        properties: {
          name: req.body.name,
          programa_interes: req.body.programa_interes,
          canal_origen: req.body.canal_origen
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.redirect('/');
  } catch (error) {
    res.status(500).send("Error creating record in HubSpot.");
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
