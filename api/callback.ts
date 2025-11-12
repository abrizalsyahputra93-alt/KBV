import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export let tokenCache = "";

const CLIENT_ID = "01K9RZ3A2G1PTZ8FSA65ZH3VXZ";
const CLIENT_SECRET = "4f1c2575f4d923121cfc0a713d45ee4150b086690f8da472b7f025a47c9cd8f5";
const REDIRECT_URI = "https://yourproject.vercel.app/api/callback";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code as string;
  if (!code) return res.status(400).send("Missing code");

  try {
    const response = await axios.post("https://kick.com/api/v1/oauth/token", {
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    });

    tokenCache = response.data.access_token;
    console.log("✅ Access Token received:", tokenCache);

    res.send("✅ Authorization successful! You can now start your bot at /api/bot");
  } catch (err: any) {
    console.error("Error exchanging code:", err.response?.data || err.message);
    res.status(500).send("❌ Error getting access token");
  }
}

