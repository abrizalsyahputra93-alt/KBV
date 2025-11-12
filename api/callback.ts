import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export let tokenCache = "";

const CLIENT_ID = "01K9SEDGKEAB4KH7WAJ8Q2XGVD";
const CLIENT_SECRET = "8fe491a2b6fe3949673e9228d824efb477a90de7425c8b8f8a564ecb039a2225";
const REDIRECT_URI = "https://kbv-2tq3.vercel.app/api/callback";

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
    console.log("✅ Access token:", tokenCache);

    res.send("✅ Authorization successful! You can now start your bot at /api/bot");
  } catch (err: any) {
    console.error("❌ Error exchanging code:", err.response?.data || err.message);
    res.status(500).send("Error getting token");
  }
}
