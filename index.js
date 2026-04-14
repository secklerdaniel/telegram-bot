import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TOKEN = process.env.TELEGRAM_TOKEN;

app.post("/webhook/demo", async (req, res) => {
  const text = req.body.message?.text || "";
  const chatId = req.body.message?.chat?.id;

  console.log("🔥 RECEBI:", text);

  let resposta = "Oi! Sou a Florence 😊 Me conta o que você procura.";

  if (text.toLowerCase().includes("preço")) {
    resposta = "Top! Me diz: qual seu tipo de negócio?";
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: resposta
      })
    });

    const data = await response.json();
    console.log("📤 RESPOSTA TELEGRAM:", data);

  } catch (err) {
    console.error("❌ ERRO AO ENVIAR:", err);
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Florence rodando 🚀");
});

app.listen(process.env.PORT || 3000);
