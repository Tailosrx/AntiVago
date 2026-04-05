import app from "./app.js";
import config from "./config/environment.js";

const PORT = process.env.PORT || config.server.port || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
