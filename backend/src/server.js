const app = require('./app');
const config = require('./config/environment');

const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`‚úÖ Servidor corriendo en puerto ${PORT}`);
  console.log(`Ìºç Ambiente: ${config.server.nodeEnv}`);
  console.log(`Ì≥ä Health check: http://localhost:${PORT}/health`);
});
