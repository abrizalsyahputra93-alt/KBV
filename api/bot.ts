import { VercelRequest, VercelResponse } from "@vercel/node";
import WebSocket from "ws";
import axios from "axios";
import { tokenCache } from "./callback.js";

// langsung isi manual
const CHANNEL_ID = "feuskasv"; // nama channel kamu
const API_CHAT = `https://kick.com/api/v2/messages/send/${CHANNEL_ID}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const accessToken = tokenCache;
  if (!accessToken) return res.status(400).send("❌ Please authorize first via /api/auth");

  const ws = new WebSocket(`wss://chat.kick.com/v2/chat/${CHANNEL_ID}`);

  async function sendMessage(content: string) {
    try {
      await axios.post(
        API_CHAT,
        { content },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } catch (err: any) {
      console.error("❌ Failed to send message:", err.response?.data || err.message);
    }
  }

  ws.on("open", () => {
    console.log("✅ Connected to Kick chat");
    sendMessage("🤖 Bot is online!");
  });

  ws.on("message", async (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      if (data.type !== "message") return;

      const text = data.content.trim().toLowerCase();

      if (text.startsWith("!ping")) {
        sendMessage("🏓 Pong!");
      } else if (text.startsWith("!hello")) {
        sendMessage("👋 Halo juga!");
      } else if (text.startsWith("!help")) {
        sendMessage("📜 Commands: !ping, !hello, !help");
      }
    } catch (e) {
      console.error("❌ Error parsing message:", e);
    }
  });

  ws.on("close", () => console.log("⚠️ Disconnected from chat"));

  res.send("🤖 Bot started and listening to chat...");
}

