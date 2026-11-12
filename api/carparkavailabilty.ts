import type { Request, Response } from 'express';

export interface LTACarparkItem {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string; // e.g. "1.29375 103.85718" (lat lng)
  AvailableLots: number;
  LotType: 'C' | 'H' | 'Y' | string; // C = Car, H = Heavy, Y = Motorcycle
  Agency: 'HDB' | 'LTA' | 'URA' | string;
}

export interface LTACarparkApiResponse {
  'odata.metadata'?: string;
  value: LTACarparkItem[];
}

export interface ApiResponseData {
  success: boolean;
  source: 'lta_datamall' | 'fallback_cache';
  timestamp: string;
  count: number;
  data: LTACarparkItem[];
  keyConfigured: boolean;
  error?: string;
  message?: string;
}

// In-memory 60s cache to respect LTA rate-limits and match LTA 1-minute data refresh cycle
let cache: {
  timestamp: number;
  data: LTACarparkItem[];
} | null = null;

const CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Serverless handler connecting to LTA DataMall CarParkAvailabilityv2
 * Endpoint: https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2
 * Header: AccountKey: <LTA_ACCOUNT_KEY>
 */
export default async function handler(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Read AccountKey strictly from server-side environment (no hardcoded keys)
  const ltaKey = process.env.LTA_ACCOUNT_KEY?.trim();

  if (!ltaKey) {
    return res.status(503).json({
      success: false,
      source: 'lta_datamall',
      timestamp: new Date().toISOString(),
      count: 0,
      data: [],
      keyConfigured: false,
      error: 'LTA_ACCOUNT_KEY environment variable is not configured.',
      message: 'Please provide your LTA DataMall AccountKey in your environment configuration (.env or Secrets panel).'
    });
  }

  // Check memory cache
  const now = Date.now();
  const skip = typeof req.query?.['$skip'] === 'string' ? req.query['$skip'] : null;

  if (!skip && cache && (now - cache.timestamp < CACHE_TTL_MS)) {
    return res.status(200).json({
      success: true,
      source: 'fallback_cache',
      timestamp: new Date(cache.timestamp).toISOString(),
      count: cache.data.length,
      data: cache.data,
      keyConfigured: true
    });
  }

  try {
    // Construct LTA DataMall CarParkAvailabilityv2 endpoint
    const url = new URL('https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2');
    if (skip) {
      url.searchParams.set('$skip', skip);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const ltaResponse = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'AccountKey': ltaKey,
        'accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!ltaResponse.ok) {
      const errText = await ltaResponse.text();
      console.error(`LTA DataMall API responded with status ${ltaResponse.status}:`, errText);
      
      return res.status(ltaResponse.status).json({
        success: false,
        source: 'lta_datamall',
        timestamp: new Date().toISOString(),
        count: 0,
        data: [],
        keyConfigured: true,
        error: `LTA DataMall API error: HTTP ${ltaResponse.status}`,
        message: errText || 'Failed to authenticate or fetch from LTA DataMall.'
      });
    }

    const json: LTACarparkApiResponse = await ltaResponse.json();
    const items = json.value || [];

    // Store in cache if full query
    if (!skip) {
      cache = {
        timestamp: now,
        data: items
      };
    }

    return res.status(200).json({
      success: true,
      source: 'lta_datamall',
      timestamp: new Date().toISOString(),
      count: items.length,
      data: items,
      keyConfigured: true
    });

  } catch (err: any) {
    console.error('Error contacting LTA DataMall endpoint:', err);
    
    // Return stale cache if available
    if (cache) {
      return res.status(200).json({
        success: true,
        source: 'fallback_cache',
        timestamp: new Date(cache.timestamp).toISOString(),
        count: cache.data.length,
        data: cache.data,
        keyConfigured: true,
        message: 'Serving cached LTA data due to upstream connectivity timeout.'
      });
    }

    return res.status(502).json({
      success: false,
      source: 'lta_datamall',
      timestamp: new Date().toISOString(),
      count: 0,
      data: [],
      keyConfigured: true,
      error: 'Upstream gateway error connecting to datamall2.mytransport.sg',
      message: err?.message || 'Network error'
    });
  }
}
