import { listen } from './app';
import { server } from './config/environment';

const PORT = server.port;

listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`��� Ambiente: ${server.nodeEnv}`);
  console.log(`��� Health check: http://localhost:${PORT}/health`);
});
