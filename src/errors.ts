import type { FastifyReply } from 'fastify';

type McpError = {
  code: number;
  message: string;
};

const MCP_ERRORS = {
  INVALID_SESSION: {
    code: -32000,
    message: 'No valid session ID provided'
  },
  SESSION_NOT_FOUND: {
    code: -32001,
    message: 'Session not found'
  },
  INVALID_REQUEST: {
    code: -32002,
    message: 'Invalid request format'
  }
} as const;

/**
 * Sends a standardized error response for MCP operations
 */
export function sendMcpError (reply: FastifyReply, error: McpError, id: string | null = null) {
  reply.status(400).send({
    jsonrpc: '2.0',
    error,
    id
  });
}

export function sendInvalidSession (reply: FastifyReply) {
  sendMcpError(reply, MCP_ERRORS.INVALID_SESSION);
}

export function sendSessionNotFound (reply: FastifyReply) {
  sendMcpError(reply, MCP_ERRORS.SESSION_NOT_FOUND);
}

export function sendInvalidRequest (reply: FastifyReply) {
  sendMcpError(reply, MCP_ERRORS.INVALID_REQUEST);
}
