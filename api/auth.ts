import { VercelRequest, VercelResponse } from "@vercel/node";

const CLIENT_ID = "01K9RZ3A2G1PTZ8FSA65ZH3VXZ";
const REDIRECT_URI = "https://yourproject.vercel.app/api/callback"; // ganti sesuai domain vercel kamu

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authUrl = `https://kick.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=chat:write`;
  res.redirect(authUrl);
}

