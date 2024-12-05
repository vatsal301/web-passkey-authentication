const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Ejs = require("ejs");
const registerRoute = require("./Router/register");
const loginRoute = require("./Router/login");
const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
  });

  await server.register(Vision);
  server.views({
    engines: { ejs: Ejs },
    relativeTo: __dirname,
    path: "View",
  });

  server.route(registerRoute);
  server.route(loginRoute);
  await server.start();
  console.log("Server running on", server.info.uri);
};
init();
