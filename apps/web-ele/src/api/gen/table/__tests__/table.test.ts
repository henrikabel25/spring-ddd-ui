import { describe, expect, it, vi } from 'vitest';
import { requestClient } from '#/api/request';
import { getTablePage, wipeTableData, codeGenerate, codePreview, getTableInfoPage, getTableInfo, createTableInfo, updateTableInfo, getColumnsInfo, getJaveEntityInfo, createColumns, updateColumns } from '#/api/gen/table';

vi.mock('#/api/request', () => ({
  requestClient: {
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

describe('table', () => {
  const mockData = { id: '1' };
  const mockIds = ['1'];
  const mockCode = 'code';
  const mockValue = 1;
  it('getTablePage calls correct endpoint', async () => {
    await getTablePage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('wipeTableData calls correct endpoint with DELETE', async () => {
    await wipeTableData();
    expect(requestClient.delete).toHaveBeenCalled();
  });
  it('codeGenerate calls correct endpoint', async () => {
    await codeGenerate(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('codePreview calls correct endpoint', async () => {
    await codePreview();
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getTableInfoPage calls correct endpoint', async () => {
    await getTableInfoPage(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getTableInfo calls correct endpoint', async () => {
    await getTableInfo(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createTableInfo calls correct endpoint', async () => {
    await createTableInfo(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateTableInfo calls correct endpoint with PUT', async () => {
    await updateTableInfo(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
  it('getColumnsInfo calls correct endpoint', async () => {
    await getColumnsInfo("1", "db");
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('getJaveEntityInfo calls correct endpoint', async () => {
    await getJaveEntityInfo("1");
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('createColumns calls correct endpoint', async () => {
    await createColumns(mockData);
    expect(requestClient.post).toHaveBeenCalled();
  });
  it('updateColumns calls correct endpoint with PUT', async () => {
    await updateColumns(mockData);
    expect(requestClient.put).toHaveBeenCalled();
  });
});
