import Review from '#custom/db/reviewSchema.js';

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {*} opts
 */
export default async function (fastify, opts) {
  fastify.get('/count', async (req, reply) => {
    const count = await Review.countDocuments();
    return `Review count: ${count}`;
  });

  fastify.delete('/reset', async (req, reply) => {
    const deleteResult = await Review.deleteMany({});
    return `Deleted count: ${deleteResult.deletedCount}`;
  });
}
