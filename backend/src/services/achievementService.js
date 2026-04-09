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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Eres un diseñador de videojuegos experto en crear trofeos/logros.

El usuario acaba de agregar: ${
      entry.type === "libro"
        ? "un libro"
        : entry.type === "juego"
        ? "un juego"
        : "un anime"
    }

Título: ${entry.title}
${entry.author ? `Autor: ${entry.author}` : ""}
${entry.category ? `Categoría/Género: ${entry.category}` : ""}

Genera EXACTAMENTE 2 trofeos/logros ÚNICOS y específicos para este ${
      entry.type
    }.

REQUISITOS:
- Nombre catchy (máx 30 caracteres)
- Descripción corta (máx 50 caracteres)
- Puntos: 25-100
- Rareza: 15-50%
- Emoji relacionado

Responde SOLO en JSON válido, SIN markdown, SIN explicaciones:
[
  {
    "name": "Nombre del Trofeo",
    "description": "Descripción corta",
    "points": 50,
    "rarityPercentage": 25,
    "emoji": "🏆"
  },
  {
    "name": "Otro Trofeo",
    "description": "Otra descripción",
    "points": 75,
    "rarityPercentage": 30,
    "emoji": "⭐"
  }
]`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    // Limpieza agresiva
    responseText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Intento de parseo robusto
let achievements;
try {
  responseText = responseText
    .replace(/^[^\[\{]+/, "")   // elimina texto antes del JSON
    .replace(/[^\]\}]+$/, "");  // elimina texto después del JSON

  achievements = JSON.parse(responseText);
} catch {
  const start = responseText.indexOf("[");
  const end = responseText.lastIndexOf("]") + 1;
  const sliced = responseText.slice(start, end);

  achievements = JSON.parse(sliced);
}


    return achievements;
  } catch (error) {
    console.error("❌ Error generando trofeos:", error.message);

    // Fallback: trofeos genéricos
    return [
      {
        name: `${entry.title} Starter`,
        description: `Comienza con ${entry.title}`,
        points: 25,
        rarityPercentage: 40,
        emoji: "🎯",
      },
      {
        name: `Fan de ${entry.title}`,
        description: `Disfruta cada momento`,
        points: 50,
        rarityPercentage: 30,
        emoji: "❤️",
      },
    ];
  }
};
