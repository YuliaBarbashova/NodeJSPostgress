import { Migrator } from "@mikro-orm/migrations";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
declare const config: {
    entities: string[];
    entitiesTs: string[];
    extensions: (typeof Migrator)[];
    migrations: {
        path: string;
        pathTs: string;
        disableForeignKeys: boolean;
    };
    driver: typeof PostgreSqlDriver;
    dbName: string;
    clientUrl: string;
};
export default config;
