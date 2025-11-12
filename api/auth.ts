import { VercelRequest, VercelResponse } from "@vercel/node";

const CLIENT_ID = "01K9SEDGKEAB4KH7WAJ8Q2XGVD";
const REDIRECT_URI = "https://kbv-2tq3.vercel.app/api/callback"; // ganti sesuai project Vercel kamu

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authUrl = `https://kick.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=chat:write`;
  res.redirect(authUrl);
}
