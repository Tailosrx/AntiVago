import app from "./app.js";
import config from "./config/environment.js";

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Ambiente: ${config.server.nodeEnv}`);
  console.log(`💓 Health check: http://localhost:${PORT}/health`);
});
