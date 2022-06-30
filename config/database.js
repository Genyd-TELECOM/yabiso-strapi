const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: "localhost",
        port: 5432,
        database: "strapi",
        username: "postgres",
        password: "postgres",
        ssl: false,
      },
      options: {},
    },
  },
});
