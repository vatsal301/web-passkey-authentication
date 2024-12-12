const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Ejs = require("ejs");
const registerRoute = require("./Routes/register");
const loginRoute = require("./Routes/login");
const verifyRoute = require("./Routes/verify");
require("dotenv").config();
const crypto = require("node:crypto");
const databaseConnection = require("./config/database");
const logger = require("./logger");

if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
  });
  server.ext("onRequest", (request, h) => {
    logger.info(`${request.method.toUpperCase()} ${request.path}`);
    return h.continue;
  });
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response.isBoom) {
      logger.error(
        `${request.method.toUpperCase()} ${request.path} Error is: ${
          response.output.statusCode
        } - ${response.message}`
      );
    }
    return h.continue;
  });
  await server.register(Vision);
  server.views({
    engines: { ejs: Ejs },
    relativeTo: __dirname,
    path: "Views",
  });

  server.route(registerRoute);
  server.route(loginRoute);
  server.route(verifyRoute);

  databaseConnection();
  await server.start();
  console.log("Server running on", server.info.uri);
};
init();

process.on("uncaughtException", (error) => {
  logger.info("uncaughtException" + error);
  process.exit(1);
});
