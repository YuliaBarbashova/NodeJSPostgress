import * as dotenv from "dotenv";
import { Migrator } from "@mikro-orm/migrations";

import { PostgreSqlDriver } from "@mikro-orm/postgresql";

dotenv.config();

const config = {
  entities: ["./dist/entities/**"],
  entitiesTs: ["./app/entities/**"],
  extensions: [Migrator],
  migrations: {
    path: "./dist/migrations",
    pathTs: "./app/migrations",
    disableForeignKeys: false,
  },
  driver: PostgreSqlDriver,
  dbName: "evwhppcu",
  clientUrl:
    "postgres://evwhppcu:RMRW7fNPg0rLkUrTKlEJSJBbezW_ksRq@fanny.db.elephantsql.com/evwhppcu",
};

export default config;
