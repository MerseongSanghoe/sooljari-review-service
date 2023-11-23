'use strict'

import fp from 'fastify-plugin';
import * as sensible from '@fastify/sensible';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify, opts) {
  fastify.register(sensible, {
    errorHandler: false
  })
})
