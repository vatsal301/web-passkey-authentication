const registerRoute = [
  {
    method: "GET",
    path: "/register",
    handler: (request, h) => {
      return h.view("register");
    },
  },
];

module.exports = registerRoute;
