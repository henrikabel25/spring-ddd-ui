import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/common-ui', () => ({
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
  ApiComponent: { name: 'ApiComponent' },
  globalShareState: {
    setComponents: vi.fn(),
    defineMessage: vi.fn(),
  },
  IconPicker: { name: 'IconPicker' },
}));

vi.mock('element-plus', () => ({
  ElNotification: vi.fn(),
}));

vi.mock('vue', () => ({
  computed: vi.fn().mockReturnValue({}),
  defineAsyncComponent: vi.fn().mockReturnValue({ name: 'AsyncComponent' }),
  defineComponent: vi.fn().mockReturnValue({ name: 'Component' }),
  getCurrentInstance: vi.fn().mockReturnValue(null),
  h: vi.fn().mockReturnValue({}),
  ref: vi.fn().mockReturnValue({}),
}));

describe('AdapterComponent', () => {
  it('can be imported', async () => {
    const mod = await import('#/adapter/component/index.ts');
    expect(mod).toBeDefined();
  }, 60000);
});
