import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {initDBConnection} from "./database/initConnection";
import {getConfig} from "./config/configuration";

async function initServer() {
  const config = getConfig();

  const dbConnection = await initDBConnection({
    database: config.DB_NAME,
    host: config.DB_HOST,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    username: config.DB_USER,
  });

  const gracefulShutdown = async () => {
    try {
      // await dbConnection.close();
      console.log('DB gracefulShutdown');
    } catch (err) {
      console.log(`Server shutdown error: ${err.message}`);
    }
  };

  process.on('SIGINT', async () => {
    if (process.env.ENV === 'local') return process.exit(1);
    console.log('SIGINT signal received.');
    await gracefulShutdown();
    process.exit(1);
  });

  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received.');
    await gracefulShutdown();
    process.exit(0);
  });

  process.on('unhandledRejection', (reason, p) => {
    console.log(`Possibly Unhandled Rejection at: Promise  ${p}, reason: ${reason}`);
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
initServer();
