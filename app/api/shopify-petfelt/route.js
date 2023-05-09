import crypto from "crypto";
import { buffer } from "micro";
import axios from "axios";

const botToken = "YOUR_TELEGRAM_BOT_TOKEN";
const chatId = "YOUR_CHAT_ID";

export default async function handler(req, res) {
  // Get the HMAC header from the request
  const hmacHeader = req.headers["x-shopify-hmac-sha256"];

  // Get the data from the request
  const data = await buffer(req);

  // Create a hash using the secret and the data
  const generatedHash = crypto
    .createHmac("sha256", SHOPIFY_SECRET)
    .update(data)
    .digest("base64");

  // Compare the hash with the HMAC header
  if (hmacHeader === generatedHash) {
    // The request is verified -- do something with the data
    const orderData = JSON.parse(data.toString());

    const message = `New order received: Order ID - ${orderData.id}, Total - ${orderData.total_price}`;

    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
  } else {
    // The request could not be verified
    res.status(403).send("Forbidden");
  }
}
