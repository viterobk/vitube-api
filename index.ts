import { DBProvider } from './db';
import { HttpServer } from './server';

new DBProvider().migrate();
new HttpServer();