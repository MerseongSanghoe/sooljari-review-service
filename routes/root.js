'use strict';
//@ts-check

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} opts
 */
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { hello: 'world' };
  });
}
