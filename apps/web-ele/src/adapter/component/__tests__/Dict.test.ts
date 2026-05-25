import { describe, expect, it, vi } from 'vitest';

vi.mock('vue', () => ({
  computed: vi.fn().mockReturnValue({}),
  defineComponent: vi.fn().mockReturnValue({ name: 'Component' }),
  ref: vi.fn().mockReturnValue({}),
  watchEffect: vi.fn(),
}));

vi.mock('element-plus', () => ({
  ElTag: { name: 'ElTag', template: '<span><slot /></span>' },
}));

vi.mock('#/api/sys/dict', () => ({
  getItemLabelByDictCodeAndValue: vi.fn().mockResolvedValue(''),
}));

describe('Dict', () => {
  it('can be imported', async () => {
    const mod = await import('#/adapter/component/Dict.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
