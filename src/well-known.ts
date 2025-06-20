import type { OAuthMetadata, OAuthProtectedResourceMetadata } from '@modelcontextprotocol/sdk/shared/auth.js';
import type { FastifyInstance } from 'fastify';

export function registerOAuthAuthorizationServerRoute (app: FastifyInstance, metadata: OAuthMetadata) {
  app.route({
    method: 'GET',
    url: '/.well-known/oauth-authorization-server',
    handler: async (_request, reply) => {
      return reply.send(metadata);
    }
  });
}

export function registerOAuthProtectedResourceRoute (app: FastifyInstance, metadata: OAuthProtectedResourceMetadata) {
  app.route({
    method: 'GET',
    url: '/.well-known/oauth-protected-resource',
    handler: async (_request, reply) => {
      return reply.send(metadata);
    }
  });
}
