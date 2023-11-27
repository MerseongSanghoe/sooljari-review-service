import * as fastify from 'fastify';
import Review from '#custom/db/reviewSchema.js';

/**
 *
 * @param {fastify.FastifyInstance} fastify
 * @param {*} opts
 */
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return await Review.find({});
  });

  /**
   * @type {fastify.RouteShorthandOptions}
   */
  const postOption = {
    schema: {
      body: {
        type: 'object',
        required: ['writerId', 'alcoholId', 'reviews'],
        properties: {
          writerId: { type: 'number' },
          alcoholId: { type: 'number' },
          reviews: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                tags: { type: 'array', items: { type: 'string' } },
                block_type: { type: 'number' },
              },
            },
          },
        },
      },
    },
  };
  fastify.post('/', postOption, async (req, reply) => {
    // @ts-ignore
    const { writerId, alcoholId, reviews } = req.body;

    const newDoc = await Review.create({
      writer_id: writerId,
      alcohol_linked: true,
      alcohol_linked_id: alcoholId,
      reviews: reviews.map((/** @type {any} */ e) => {
        return { ...e, block_type: 0 };
      }),
    });

    return newDoc;
  });

  /**
   * @type {fastify.RouteShorthandOptions}
   */
  const getByAlcIdOption = {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        },
      },
    },
  };
  fastify.get('/byalc/:id', getByAlcIdOption, async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;

    return await Review.find({ alcohol_linked_id: id });
  });

  /**
   * @type {fastify.RouteShorthandOptions}
   */
  const getByWriterIdOption = {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        },
      },
    },
  };
  fastify.get('/bywrt/:id', getByWriterIdOption, async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;

    return await Review.find({ writer_id: id });
  });
}
