import { describe, expect, it, vi } from 'vitest';

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    createApp: vi.fn().mockReturnValue({
      use: vi.fn().mockReturnThis(),
      mount: vi.fn(),
    }),
  };
});

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue-router')>();
  return {
    ...actual,
    createRouter: vi.fn().mockReturnValue({
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
      currentRoute: { value: { meta: {} } },
      use: vi.fn(),
    }),
    createWebHashHistory: vi.fn().mockReturnValue({}),
    createWebHistory: vi.fn().mockReturnValue({}),
  };
});

vi.mock('pinia', () => ({
  createPinia: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/plugins/motion', () => ({
  MotionPlugin: {},
}));

vi.mock('@vben/stores', () => ({
  resetAllStores: vi.fn(),
}));

vi.mock('element-plus', () => ({
  default: {},
}));

vi.mock('@vben/access', () => ({
  registerAccessDirective: vi.fn(),
}));

vi.mock('@vben/common-ui', () => ({
  registerLoadingDirective: vi.fn(),
  setupVbenForm: vi.fn(),
  useVbenForm: vi.fn(),
  z: {},
}));

vi.mock('@vben/common-ui/es/tippy', () => ({
  initTippy: vi.fn(),
}));

vi.mock('@vben/preferences', () => ({
  preferences: { app: { dynamicTitle: false, name: 'Test' } },
}));

vi.mock('@vben/styles', () => ({}));
vi.mock('@vben/styles/ele', () => ({}));

vi.mock('@vueuse/core', () => ({
  useTitle: vi.fn(),
}));

vi.mock('#/locales', () => ({
  $t: vi.fn((key: string) => key),
  setupI18n: vi.fn(),
}));

vi.mock('./adapter/component', () => ({
  initComponentAdapter: vi.fn(),
}));

vi.mock('./adapter/form', () => ({
  initSetupVbenForm: vi.fn(),
}));

vi.mock('./app.vue', () => ({
  default: {},
}));

vi.mock('./router', () => ({
  router: {
    currentRoute: { value: { meta: {} } },
    use: vi.fn(),
  },
}));

vi.mock('@vben/hooks', () => ({
  useAppConfig: vi.fn().mockReturnValue({ apiURL: '' }),
  useElementPlusDesignTokens: vi.fn(),
}));

describe('Bootstrap', () => {
  it('can be imported', async () => {
    const mod = await import('#/bootstrap.ts');
    expect(mod).toBeDefined();
  }, 30000);
});
