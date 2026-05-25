import { describe, expect, it, vi } from 'vitest';

vi.mock('@vben/locales', () => ({
  $t: vi.fn((key: string) => key),
  loadLocalesMapFromDir: vi.fn().mockReturnValue({}),
}));

vi.mock('@vben/common-ui', () => ({
  Page: { name: 'Page', template: '<div><slot /></div>' },
  useVbenForm: vi.fn().mockReturnValue([{}, {}]),
  useVbenModal: vi.fn().mockReturnValue([{}, {}]),
  useVbenDrawer: vi.fn().mockReturnValue([{}, {}]),
}));

vi.mock('element-plus', () => ({
  ElButton: { name: 'ElButton', template: '<button><slot /></button>' },
  ElMessage: { success: vi.fn(), error: vi.fn() },
  ElCard: { name: 'ElCard', template: '<div><slot /></div>' },
  ElRow: { name: 'ElRow', template: '<div><slot /></div>' },
  ElCol: { name: 'ElCol', template: '<div><slot /></div>' },
}));

vi.mock('#/adapter/component/Dict.vue', () => ({
  default: { name: 'Dict', template: '<span>{ value }</span>', props: ['value'] },
}));

vi.mock('@vben/icons', () => ({
  SvgBellIcon: { name: 'SvgBellIcon', template: '<svg></svg>' },
  SvgCakeIcon: { name: 'SvgCakeIcon', template: '<svg></svg>' },
  SvgCardIcon: { name: 'SvgCardIcon', template: '<svg></svg>' },
  SvgDownloadIcon: { name: 'SvgDownloadIcon', template: '<svg></svg>' },
}));

vi.mock('./analytics-trends.vue', () => ({
  default: { name: 'AnalyticsTrends', template: '<div>trends</div>' },
}));

vi.mock('./analytics-visits-data.vue', () => ({
  default: { name: 'AnalyticsVisitsData', template: '<div>visits-data</div>' },
}));

vi.mock('./analytics-visits-sales.vue', () => ({
  default: { name: 'AnalyticsVisitsSales', template: '<div>visits-sales</div>' },
}));

vi.mock('./analytics-visits-source.vue', () => ({
  default: { name: 'AnalyticsVisitsSource', template: '<div>visits-source</div>' },
}));

vi.mock('./analytics-visits.vue', () => ({
  default: { name: 'AnalyticsVisits', template: '<div>visits</div>' },
}));

describe('DashboardAnalytics', () => {
  it('can be imported', async () => {
    const mod = await import('#/views/dashboard/analytics/index.vue');
    expect(mod).toBeDefined();
  }, 30000);
});
