import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import axios from 'axios';
import { URLSearchParams } from 'url';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// TODO: Replace with your client ID and client secret
const CLIENT_ID = 'OC-AZo--du8wYay';
const CLIENT_SECRET = 'cnvca2MCHU2a2edFfDAtzcFDNYgu7nYoiCia44wxscuNLVt484298da2';
const REDIRECT_URI = 'https://www.youtube.com/watch?v=16zrEPOsIcI';
const SCOPES = 'design:meta:read asset:write design:content:read asset:read brandtemplate:meta:read design:content:write brandtemplate:content:read profile:read';

let codeVerifier;
let state;

// Endpoint to start the authentication process
app.get('/auth', (req, res) => {
  codeVerifier = crypto.randomBytes(96).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
  state = crypto.randomBytes(96).toString('base64url');

  const authUrl = new URL('https://www.canva.com/api/oauth/authorize');
  authUrl.searchParams.append('code_challenge', codeChallenge);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('scope', SCOPES);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', CLIENT_ID);
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);

  res.json({ authUrl: authUrl.toString() });
});

// Endpoint to handle the callback from Canva
app.get('/oauth/redirect', async (req, res) => {
  const { code, state: receivedState } = req.query;

  if (receivedState !== state) {
    return res.status(400).send('Invalid state');
  }

  try {
    const response = await axios.post('https://api.canva.com/rest/v1/oauth/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;

    // For this example, we'll just send the tokens back to the client
    // In a real application, you should securely store these tokens
    res.redirect(`http://localhost:3000?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error.response ? error.response.data : error.message);
    res.status(500).send('Failed to get access token');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
