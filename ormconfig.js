const rootDir = process.env.NODE_ENV === "development" ? "src" : "dist";

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  ssl: true,
  entities: [rootDir + "/entities/**/*.{ts,js}"],
  migrations: [rootDir + "/migrations/**/*.{ts,js}"],
  subscribers: [rootDir + "/subscribers/**/*.{ts,js}"],
  seeds: [rootDir + "/seeds/**/*.{ts,js}"],
  cli: {
    entitiesDir: rootDir + "/entities",
    migrationsDir: rootDir + "/migrations",
    subscribersDir: rootDir + "/subscribers",
  },
};
