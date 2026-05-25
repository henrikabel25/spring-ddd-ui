import { describe, expect, it, vi } from 'vitest';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
    get: vi.fn().mockResolvedValue({}),
  },
  baseRequestClient: {
    post: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock('@vben/utils', () => ({
  downloadFileFromBlobPart: vi.fn(),
}));

describe('gen api index', () => {
  it('can be imported', async () => {
    const mod = await import('#/api/gen/index.ts');
    expect(mod).toBeDefined();
  }, 10000);
});
