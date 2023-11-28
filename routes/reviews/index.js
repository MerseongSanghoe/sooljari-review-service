import * as fastify from 'fastify';
import Review from '#custom/db/reviewSchema.js';

/**
 *
 * @param {fastify.FastifyInstance} fastify
 * @param {*} opts
 */
export default async function (fastify, opts) {
  const paginateQuerySchema = {
    type: 'object',
    properties: {
      page: { type: 'number' },
      size: { type: 'number' },
    },
  };

  /**
   * GET all review
   * TODO: pagination
   * @type {fastify.RouteShorthandOptions}
   */
  const getOption = {
    schema: {
      querystring: paginateQuerySchema,
    },
  };
  fastify.get('/', getOption, async function (request, reply) {
    // @ts-ignore
    const { page = 0, size = 10 } = request.query;
    const count = await Review.countDocuments({});

    return {
      data: await Review.find({})
        .sort({ createdAt: -1 })
        .skip(page * size)
        .limit(size),
      page,
      size,
      count,
    };
  });

  /**
   * POST new review
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

  const idParamsSchema = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  };

  /**
   * GET reviews by alc id
   * @type {fastify.RouteShorthandOptions}
   */
  const getByAlcIdOption = {
    schema: {
      querystring: paginateQuerySchema,
      params: idParamsSchema,
    },
  };
  fastify.get('/byalc/:id', getByAlcIdOption, async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;
    // @ts-ignore
    const { page = 0, size = 10 } = req.query;
    const count = await Review.countDocuments({ alcohol_linked_id: id });

    return {
      data: await Review.find({ alcohol_linked_id: id })
        .sort({ createdAt: -1 })
        .skip(page * size)
        .limit(size),
      page,
      size,
      count,
    };
  });

  /**
   * GET review by writer id
   * @type {fastify.RouteShorthandOptions}
   */
  const getByWriterIdOption = {
    schema: {
      querystring: paginateQuerySchema,
      params: idParamsSchema,
    },
  };
  fastify.get('/bywrt/:id', getByWriterIdOption, async (req, reply) => {
    // @ts-ignore
    const { id } = req.params;
    // @ts-ignore
    const { page = 0, size = 10 } = req.query;
    const count = await Review.countDocuments({ writer_id: id });

    return {
      data: await Review.find({ writer_id: id })
        .sort({ createdAt: -1 })
        .skip(page * size)
        .limit(size),
      page,
      size,
      count,
    };
  });
}
