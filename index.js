const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 3000;

// Use the cors middleware
app.use(cors());

app.get('/aggregated-data', async (req, res) => {
  try {
    const standingResponse = await axios.get(`${process.env.BASKETBALL_API_URL}/standings`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.BASKETBALL_RAPIDAPI_HOST,
      },
      params: {
        league: '12',
        season: '2019-2020',
      },
    });

    const languagesApiResponse = await axios.get(`${process.env.TRANSLATE_API_URL}/getLanguages`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host':  process.env.TRANSLATE_RAPIDAPI_HOST,
      },
    });

    const aggregatedData = {
      teamStandings: standingResponse.data,
      languages: languagesApiResponse.data,
    };

    res.json(aggregatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for translation
app.post('/translate', async (req, res) => {
  try {
    const sourceLanguage = req.query.source_language || 'en';
    const targetLanguage = req.query.target_language || 'id';
    const textToTranslate = req.query.text || 'Hello, World!';

    const translationResponse = await axios.post(
      `${process.env.TRANSLATE_API_URL}/translate`,
      `source_language=${sourceLanguage}&target_language=${targetLanguage}&text=${textToTranslate}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.TRANSLATE_RAPIDAPI_HOST,
        },
      }
    );

    res.json(translationResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// MongoDb
const uri = process.env.MONGO_DB_URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the '/transactions' endpoint
app.get('/transactions', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Access a specific database
    const database = client.db('sample_analytics');

    // Access the 'transactions' collection
    const collection = database.collection('transactions');

    // Set default limit and page values
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;

    // Calculate skip based on limit and page
    const skip = (page - 1) * limit;

    // Retrieve documents from the 'transactions' collection with pagination
    const documents = await collection.find({}).skip(skip).limit(limit).toArray();

    // Send the documents as a JSON response
    res.json(documents);
  } catch (error) {
    console.error('Error during MongoDB operation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


