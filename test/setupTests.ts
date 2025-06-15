import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import Fastify from 'fastify';

import FastifyMcpStreamableHttp, { type FastifyMcpStreamableHttpOptions } from '../src/index.ts';

export async function buildApp (options?: Partial<FastifyMcpStreamableHttpOptions>) {
  const app = Fastify();

  const mcp = new McpServer({
    name: 'test',
    version: '0.1.0'
  });

  await app.register(FastifyMcpStreamableHttp, {
    server: mcp.server,
    ...options
  });

  return app;
}
