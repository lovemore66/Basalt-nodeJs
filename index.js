const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

app.get('/aggregated-data', async (req, res) => {
  try {
    const standingResponse = await axios.get('https://api-basketball.p.rapidapi.com/standings', {
      headers: {
        'X-RapidAPI-Key': '20225cef97msh028d837662163fap18b498jsn4c7932514f34',
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
      },
      params: {
        league: '12',
        season: '2019-2020'
      },
    });

    // Process carApiResponse.data as needed

    const languagesApiResponse = await axios.get('https://text-translator2.p.rapidapi.com/getLanguages', {
      headers: {
        'X-RapidAPI-Key': '20225cef97msh028d837662163fap18b498jsn4c7932514f34',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
    });

    // Process stockApiResponse.data as needed

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

    const translationResponse = await axios.post('https://text-translator2.p.rapidapi.com/translate', 
      `source_language=${sourceLanguage}&target_language=${targetLanguage}&text=${textToTranslate}`, 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '20225cef97msh028d837662163fap18b498jsn4c7932514f34',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
      }
    );

    res.json(translationResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
