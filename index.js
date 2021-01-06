const axios = require('axios');
const express = require('express');
const FormData = require('form-data');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/token', async (req, res) => {
  const client_id = process.env.INSTAGRAM_CLIENT_ID;
  const client_secret = process.env.INSTAGRAM_CLIENT_SECRET;

  try {
    const shortTokenForm = new FormData();
    shortTokenForm.append('client_id', client_id);
    shortTokenForm.append('client_secret', client_secret);
    shortTokenForm.append('code', req.query.code);
    shortTokenForm.append('grant_type', 'authorization_code');
    shortTokenForm.append('redirect_uri', req.query.redirect_uri);

    const shortTokenResult = await axios({
      method: 'post',
      url: 'https://api.instagram.com/oauth/access_token',
      data: shortTokenForm.getBuffer(),
      headers: shortTokenForm.getHeaders(),
    });

    const longTokenResult = await axios({
      method: 'get',
      url: 'https://graph.instagram.com/access_token',
      params: {
        client_secret,
        access_token: shortTokenResult.data.access_token,
        grant_type: 'ig_exchange_token',
      },
    });

    return res.status(200).type('application/json').send(longTokenResult.data);
  } catch (error) {
    return res.type('application/json').send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
