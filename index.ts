import logger from './core/logger';
import { migrationManager } from './db';
import { initializeRepositories } from './repositories';
import { httpServer } from './server';
import { initializeServices } from './services';

process.on('uncaughtException', (err) => {
    logger.err(err);
})
process.on('unhandledRejection', (err) => {
    logger.err(err);
})

initializeServices();
initializeRepositories();
httpServer.init();

Promise.resolve().then(() => migrationManager.migrate(60000));