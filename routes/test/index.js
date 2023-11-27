'use strict';
//@ts-check

import Review from '#custom/db/reviewSchema.js';

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return await Review.find({});
  });

  fastify.get('/count', async (req, reply) => {
    const count = await Review.countDocuments();
    return 'Review count: ' + count;
  });

  fastify.post('/', async (req, reply) => {
    const count = await Review.countDocuments();
    const newDoc = await Review.create({
      alcohol_linked: false,
      reviews: [{ block_type: count }],
    });
    return newDoc;
  });
}
