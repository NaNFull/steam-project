const express = require('express');
const fetch = require('node-fetch');
const { saveFile } = require('./saveFileToJson');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Замените * на ваш домен, если это необходимо
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', async (req, res) => {
  saveFile(req, './temp/data.json');
  // const url = 'https://tradeit.gg/api/v2/' + req.url;
  // const apiResponse = await fetch(url);
  // const data = await apiResponse.json();
  //
  // res.json(data);

  fetch('https://tradeit.gg/api/v2/inventory/data?gameId=252490&offset=0&sortType=Popularity&minPrice=0&maxPrice=100000&fresh=true&limit=500&isForStore=0')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
        // console.log(data);
        res.json(data);
      } catch (error) {
        console.error('Invalid JSON:', error);
      }
    })
    .catch(error => console.error('Fetch error:', error));

});

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
