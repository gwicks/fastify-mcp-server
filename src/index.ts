import type { BearerAuthMiddlewareOptions } from '@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js';
import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { OAuthProtectedResourceMetadata, OAuthMetadata } from '@modelcontextprotocol/sdk/shared/auth.js';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { FastifyMcpServer } from './server.ts';

export type FastifyMcpServerOptions = {
  /**
   * The MCP server instance to use.
   */
  server: Server;
  /**
   * The endpoint path for the MCP routes. Defaults to '/mcp'.
   */
  endpoint?: string;
  /**
   * Options for the Bearer token middleware.
   * @see {@link https://github.com/modelcontextprotocol/typescript-sdk/blob/main/src/server/auth/middleware/bearerAuth.ts | BearerAuthMiddlewareOptions}
   */
  bearerMiddlewareOptions?: BearerAuthMiddlewareOptions;
  /**
   * Metadata for OAuth authorization server and protected resources.
   * These will be used to generate the .well-known `/oauth-authorization-server` endpoint.
   */
  authorizationServerOAuthMetadata?: OAuthMetadata;
  /**
   * Metadata for OAuth protected resources.
   * This will be used to generate the .well-known `/oauth-protected-resource` endpoint.
   */
  protectedResourceOAuthMetadata?: OAuthProtectedResourceMetadata;
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
