export const queryKeys = {
  auth: {
    profile: ['auth', 'profile'] as const,
  },
  fuelTypes: {
    all: ['fuel-types'] as const,
    detail: (id: number) => ['fuel-types', id] as const,
    priceHistory: (id: number) => ['fuel-types', id, 'price-history'] as const,
  },
  tanks: {
    all: ['tanks'] as const,
    detail: (id: number) => ['tanks', 'detail', id] as const,
    alerts: ['tanks', 'alerts'] as const,
    dippings: (tankId: number) => ['tanks', tankId, 'dippings'] as const,
  },
  pumps: {
    all: ['pumps'] as const,
    detail: (id: number) => ['pumps', 'detail', id] as const,
    nozzles: ['nozzles'] as const,
  },
  employees: {
    all: ['employees'] as const,
    detail: (id: number) => ['employees', 'detail', id] as const,
  },
  shifts: {
    all: ['shifts'] as const,
    detail: (id: number) => ['shifts', 'detail', id] as const,
    active: ['shifts', 'active'] as const,
  },
  sales: {
    all: ['sales'] as const,
    detail: (id: number) => ['sales', 'detail', id] as const,
    dailySummary: (date: string) => ['sales', 'daily-summary', date] as const,
  },
  vehicles: {
    search: (vehicleNumber: string) => ['vehicles', 'search', vehicleNumber] as const,
    byCustomer: (customerId: number) => ['vehicles', 'customer', customerId] as const,
    detail: (id: number) => ['vehicles', 'detail', id] as const,
  },
  customers: {
    all: ['customers'] as const,
    detail: (id: number) => ['customers', 'detail', id] as const,
  },
  credits: {
    byCustomer: (customerId: number) => ['credits', customerId] as const,
    outstanding: ['credits', 'outstanding'] as const,
    summary: ['credits', 'summary'] as const,
  },
  supplies: {
    all: ['supplies'] as const,
    detail: (id: number) => ['supplies', 'detail', id] as const,
  },
  expenses: {
    all: ['expenses'] as const,
    detail: (id: number) => ['expenses', 'detail', id] as const,
    summary: (month: number, year: number) =>
      ['expenses', 'summary', month, year] as const,
  },
  bankDeposits: {
    all: ['bank-deposits'] as const,
    detail: (id: number) => ['bank-deposits', 'detail', id] as const,
  },
  dashboard: {
    summary: ['dashboard', 'summary'] as const,
    salesChart: (period: string) => ['dashboard', 'sales-chart', period] as const,
    tankLevels: ['dashboard', 'tank-levels'] as const,
    creditOverview: ['dashboard', 'credit-overview'] as const,
  },
  reports: {
    daily: (date: string) => ['reports', 'daily', date] as const,
    monthly: (month: number, year: number) =>
      ['reports', 'monthly', month, year] as const,
    fuelWise: ['reports', 'fuel-wise'] as const,
    shiftWise: (date: string) => ['reports', 'shift-wise', date] as const,
    profitLoss: (month: number, year: number) =>
      ['reports', 'profit-loss', month, year] as const,
    stock: ['reports', 'stock'] as const,
  },
  users: {
    team: ['users', 'team'] as const,
    owners: ['users', 'owners'] as const,
    platformStats: ['users', 'platform-stats'] as const,
    all: ['users', 'all'] as const,
  },
  subscriptions: {
    current: ['subscriptions', 'current'] as const,
    all: ['subscriptions'] as const,
  },
};
