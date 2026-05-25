import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getTemplatePage, getTemplateRecyclePage, createTemplate, updateTemplate, deleteTemplate, restoreTemplate, wipeTemplate } from '#/api/gen/template';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('template', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getTemplatePage calls correct endpoint', async () => {
    await getTemplatePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getTemplateRecyclePage calls correct endpoint', async () => {
    await getTemplateRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createTemplate calls correct endpoint', async () => {
    await createTemplate(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateTemplate calls correct endpoint with PUT', async () => {
    await updateTemplate(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('deleteTemplate calls correct endpoint', async () => {
    await deleteTemplate(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('restoreTemplate calls correct endpoint', async () => {
    await restoreTemplate(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeTemplate calls correct endpoint with DELETE', async () => {
    await wipeTemplate(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
});
