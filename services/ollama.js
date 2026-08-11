import { Ollama } from "ollama";
import { readFileSync } from "fs";

const ollamaClient = new Ollama({ host: "http://localhost:11434" });

app.get("/forecast/:product", async (req, res) => {
  const { product } = req.params;
  const inventoryData = readFileSync("./inventory.json", "utf-8");
  const inventory = JSON.parse(inventoryData);
  const item = inventory.find((i) => i.product === product);
  if (!item) {
    return res.status(404).json({ error: "Product not found" });
  }

  const userPrompt = `You are a demand forecasting assistant.Given this product's sales data,predict next week's demand
  Product:${item.product}
  Current stock: ${item.current_stock}
  Sales over the last 4 weeks:${item.sales_last_4_weeks.join(",")}
  Respond ONLY with valid json in this exact format:
  {"product":"${item.product}", "current_stock": ${item.current_stock}, "forecast_next_week":0 }

    Do not include any text before or after the JSON`;

  try {
    const response = await ollamaClient.chat({
      model: "llama3.2",
      messages: [{ role: "user", content: userPrompt }],
      format: "json",
    });
    const aiAnswer = response.message.content;
    console.log(`\nForecast for ${product}:`, aiAnswer);
    res.json(JSON.parse(aiAnswer));
  } catch (error) {
    console.error("Error communicating with Ollama:", error);
    res.status(500).json({ error: "Error generating forecast" });
  }
});
