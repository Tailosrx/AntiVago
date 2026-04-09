import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const TROPHY_TEMPLATES = {
  "Elden Ring": [
    {
      name: "Portador de Esquirlas",
      description: "Derrota todos los portadores",
      points: 50,
      emoji: "⚔️",
    },
    {
      name: "Espada de Miquella",
      description: "Derrota a Malenia",
      points: 75,
      emoji: "🗡️",
    },
  ],
  "Persona 5 Royale": [
    {
      name: "Líder Metamorfo",
      description: "Completa el juego",
      points: 50,
      emoji: "🔮",
    },
    {
      name: "Maestro de Confidentes",
      description: "Maxea todos los confidentes",
      points: 100,
      emoji: "👥",
    },
  ],
  "Attack on Titan": [
    {
      name: "Titán Cazador",
      description: "Completa la serie",
      points: 40,
      emoji: "⚡",
    },
    {
      name: "Legión de Exploración",
      description: "Ve todos los arcos",
      points: 60,
      emoji: "🏹",
    },
  ],
};

export const generateAchievementsForEntry = async (entry) => {
  try {
    // 1. Buscar en templates primero (rápido y gratis)
    if (TROPHY_TEMPLATES[entry.title]) {
      console.log(`✅ Trofeos encontrados en template: ${entry.title}`);
      return TROPHY_TEMPLATES[entry.title];
    }

    // 2. Si no está, generar con Gemini
    console.log(`🤖 Generando trofeos con Gemini para: ${entry.title}`);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a game designer expert in creating achievements/trophies.

The user just added: ${
      entry.type === "libro"
        ? "a book"
        : entry.type === "juego"
        ? "a game"
        : "an anime"
    }

Title: ${entry.title}
${entry.author ? `Author: ${entry.author}` : ""}
${entry.category ? `Category/Genre: ${entry.category}` : ""}

Generate EXACTLY 2 unique and specific trophies/achievements for this ${entry.type}.

REQUIREMENTS:
- Catchy name (max 30 chars)
- Short description (max 50 chars)
- Points: 25-100
- Rarity: 15-50%
- Related emoji

RESPOND ONLY WITH VALID JSON, NO MARKDOWN, NO EXPLANATIONS:
[
  {"name": "Trophy Name", "description": "Short desc", "points": 50, "rarityPercentage": 25, "emoji": "🏆"},
  {"name": "Another Trophy", "description": "Another desc", "points": 75, "rarityPercentage": 30, "emoji": "⭐"}
]`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    console.log(`📝 Respuesta bruta de Gemini: ${responseText.substring(0, 200)}...`);

    // Limpieza agresiva
    responseText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/\\"/g, '"')
      .trim();

    // Intento de parseo robusto
    let achievements;
    try {
      achievements = JSON.parse(responseText);
    } catch (parseError1) {
      console.log("❌ Primer intento de parseo falló, intento 2...");
      try {
        const start = responseText.indexOf("[");
        const end = responseText.lastIndexOf("]") + 1;
        if (start === -1 || end === 0) {
          throw new Error("No JSON array found");
        }
        const sliced = responseText.slice(start, end);
        console.log(`📝 JSON extraído: ${sliced.substring(0, 200)}...`);
        achievements = JSON.parse(sliced);
      } catch (parseError2) {
        console.log("❌ Segundo intento falló también, usando fallback");
        throw new Error(`JSON parse failed: ${parseError2.message}`);
      }
    }

    // Validar que sea un array
    if (!Array.isArray(achievements)) {
      throw new Error("Response is not an array");
    }

    // Validar estructura
    achievements = achievements.map((ach) => ({
      name: String(ach.name || "").substring(0, 30),
      description: String(ach.description || "").substring(0, 50),
      points: Math.max(25, Math.min(100, parseInt(ach.points) || 50)),
      rarityPercentage: Math.max(15, Math.min(50, parseInt(ach.rarityPercentage) || 25)),
      emoji: String(ach.emoji || "🏆"),
    }));

    console.log(`✅ ${achievements.length} trofeos generados correctamente`);
    return achievements;

  } catch (error) {
    console.error("❌ Error generando trofeos:", error.message);
    console.error("Stack:", error.stack);

    // Fallback: trofeos genéricos
    const fallback = [
      {
        name: `${entry.title} Starter`,
        description: `Begin with ${entry.title}`,
        points: 25,
        rarityPercentage: 40,
        emoji: "🎯",
      },
      {
        name: `${entry.title} Fan`,
        description: `Enjoy every moment`,
        points: 50,
        rarityPercentage: 30,
        emoji: "❤️",
      },
    ];
    console.log("📦 Usando trofeos fallback");
    return fallback;
  }
};