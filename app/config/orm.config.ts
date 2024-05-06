import * as dotenv from "dotenv";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";

import { PostgreSqlDriver } from "@mikro-orm/postgresql";

dotenv.config();

const config = {
  entities: ["./dist/entities/**"],
  entitiesTs: ["./app/entities/**"],
  extensions: [Migrator, SeedManager],
  migrations: {
    path: "./dist/migrations",
    pathTs: "./app/migrations",
    disableForeignKeys: false,
  },
  seeder: {
    path: "./dist/seeders",
    pathTs: "./app/seeders",
    defaultSeeder: "DatabaseSeeder",
    glob: "!(*.d).{js,ts}",
    emit: "ts",
    fileName: (className: string) => className,
  },
  driver: PostgreSqlDriver,
  dbName: "evwhppcu",
  clientUrl:
    "postgres://evwhppcu:RMRW7fNPg0rLkUrTKlEJSJBbezW_ksRq@fanny.db.elephantsql.com/evwhppcu",
};

export default config;
