import { join } from 'node:path';
import { fileURLToPath } from 'url';
import AutoLoad from '@fastify/autoload';
import dotenv from 'dotenv';
import { connectToMongoDB } from '#custom/mongodb.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
dotenv.config();

// Pass --options via CLI arguments in command to enable these options.
const options = {};

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {*} opts
 */
export default async function (fastify, opts) {
  // connect to mongoDB
  await connectToMongoDB();

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
}

const _options = options;
export { _options as options };
