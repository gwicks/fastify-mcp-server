import type { FastifyInstance } from 'fastify';

export async function mockInitialize (app: FastifyInstance) {
  const response = await app.inject({
    method: 'POST',
    url: '/mcp',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream'
    },
    body: {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: {
          name: 'ExampleClient',
          version: '1.0.0'
        }
      }
    }
  });

  return response;
}
