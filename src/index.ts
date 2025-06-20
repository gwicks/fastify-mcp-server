import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import type { BearerPreHandlerHookOptions } from './bearer.ts';
import { FastifyMcpServer } from './server.ts';

export type FastifyMcpServerOptions = {
  server: Server;
  endpoint?: string;
  bearerMiddlewareOptions?: BearerPreHandlerHookOptions;
};

const kFastifyMcp = Symbol('fastifyMcp');

/**
 * Fastify plugin for handling Model Context Protocol (MCP) streamable HTTP requests.
 */
const FastifyMcp: FastifyPluginAsync<FastifyMcpServerOptions> = async (app, options) => {
  const mcp = new FastifyMcpServer(app, options);

  // Decorate the Fastify instance with the MCP server for external access
  app.decorate(kFastifyMcp, mcp);
};

/**
 * Get the `FastifyMcpStreamableHttp` decorator from the Fastify instance.
 */
export function getMcpDecorator (app: FastifyInstance) {
  return app.getDecorator<FastifyMcpServer>(kFastifyMcp);
}

export default fp(FastifyMcp, {
  name: 'fastify-mcp-server',
  fastify: '5.x'
});
