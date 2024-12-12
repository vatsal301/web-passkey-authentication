const loginRoute = [
  {
    method: "GET",
    path: "/login",
    handler: (request, h) => {
      return h.view("login");
    },
  },
];

module.exports = loginRoute;
