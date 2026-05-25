import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getDictPage, getDictRecyclePage, getItemLabelByDictCode, getAllDict, createDict, updateDict, delDictById, restoreDictById, wipeDictById, getItemPage, getItemRecyclePage, createItem, updateItem, delItemById, restoreItemById, wipeItemById } from '#/api/sys/dict';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('dict', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getDictPage calls correct endpoint', async () => {
    await getDictPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getDictRecyclePage calls correct endpoint', async () => {
    await getDictRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getItemLabelByDictCode calls correct endpoint', async () => {
    await getItemLabelByDictCode(mockCode);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getAllDict calls correct endpoint', async () => {
    await getAllDict();
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createDict calls correct endpoint', async () => {
    await createDict(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateDict calls correct endpoint with PUT', async () => {
    await updateDict(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('delDictById calls correct endpoint', async () => {
    await delDictById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('restoreDictById calls correct endpoint', async () => {
    await restoreDictById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeDictById calls correct endpoint with DELETE', async () => {
    await wipeDictById(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
  it('getItemPage calls correct endpoint', async () => {
    await getItemPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getItemRecyclePage calls correct endpoint', async () => {
    await getItemRecyclePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createItem calls correct endpoint', async () => {
    await createItem(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateItem calls correct endpoint with PUT', async () => {
    await updateItem(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('delItemById calls correct endpoint', async () => {
    await delItemById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('restoreItemById calls correct endpoint', async () => {
    await restoreItemById(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeItemById calls correct endpoint with DELETE', async () => {
    await wipeItemById(mockData);
    expect(requestClient.delete).toHaveBeenCalled();
  });
});
