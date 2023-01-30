import {ConnectionOptions, createConnection} from 'typeorm';

export interface DBConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export const getConnectionOptions = async (dbConfig: DBConfig, host?: string): Promise<ConnectionOptions> => {
    const config = dbConfig;

    return {
        type: 'postgres',
        host: host || config.host,
        port: config.port,
        database: config.database,
        username: config.username,
        password: config.password,
        logging: false,
        synchronize: false,
        migrationsRun: false,
    };
};

export const initDBConnection = async (dbConfig: DBConfig) => {
    const connectionOptions = await getConnectionOptions(dbConfig);

    return await createConnection(connectionOptions);
};
