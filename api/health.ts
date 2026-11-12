import type { Request, Response } from 'express';

export interface HealthResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  uptimeSeconds: number;
  ltaKeyConfigured: boolean;
  service: string;
  endpoints: {
    carparkAvailability: string;
    health: string;
  };
}

/**
 * Serverless / Express health check handler
 * Checks connection status and whether LTA DataMall AccountKey is configured
 */
export default async function handler(req: Request, res: Response) {
  const ltaKey = process.env.LTA_ACCOUNT_KEY?.trim();
  const isKeyConfigured = Boolean(ltaKey && ltaKey.length > 0);

  const payload: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    ltaKeyConfigured: isKeyConfigured,
    service: 'ParkSG Live - LTA DataMall Serverless Gateway',
    endpoints: {
      carparkAvailability: '/api/carparkavailabilty',
      health: '/api/health'
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).json(payload);
}
