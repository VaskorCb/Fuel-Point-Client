export const rootPaths = {
  root: '',
  pagesRoot: 'pages',
  errorRoot: 'error',
};

const rootPrefix = rootPaths.root ? `/${rootPaths.root}` : '';

const paths = {
  dashboard: `${rootPrefix}/dashboard`,
  sales: `${rootPrefix}/sales`,
  sales_new: `${rootPrefix}/sales/new`,
  shifts: `${rootPrefix}/shifts`,
  shifts_start: `${rootPrefix}/shifts/start`,
  tanks: `${rootPrefix}/tanks`,
  pumps: `${rootPrefix}/pumps`,
  employees: `${rootPrefix}/employees`,
  employees_new: `${rootPrefix}/employees/new`,
  customers: `${rootPrefix}/customers`,
  credits: `${rootPrefix}/credits`,
  credits_payment: `${rootPrefix}/credits/payment`,
  supplies: `${rootPrefix}/supplies`,
  supplies_new: `${rootPrefix}/supplies/new`,
  expenses: `${rootPrefix}/expenses`,
  bank_deposits: `${rootPrefix}/bank-deposits`,
  reports: `${rootPrefix}/reports`,
  settings: `${rootPrefix}/settings`,
  fuel_prices: `${rootPrefix}/settings/fuel-prices`,
  team: `${rootPrefix}/team`,
  manage_subscription: `${rootPrefix}/manage-subscription`,

  // Auth
  login: '/sign-in',
  signup: '/sign-up',
  forgotPassword: '/forgot-password',
  twoFactorAuth: '/2fa',
  setPassword: '/set-password',
  loggedOut: '/logged-out',

  // Onboarding
  onboarding: '/onboarding',

  // Subscription
  subscription: '/subscription',

  // Platform Admin
  platformAdmin: '/platform-admin',
  platformAdminSubscriptions: '/platform-admin/subscriptions',

  notifications: `/${rootPaths.pagesRoot}/notifications`,
  404: `/${rootPaths.errorRoot}/404`,
};

export const authPaths = {
  login: paths.login,
  signup: paths.signup,
  forgotPassword: paths.forgotPassword,
  setNewPassword: paths.setPassword,
  twoFactorAuth: paths.twoFactorAuth,
};

export const apiEndpoints = {
  // Auth
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  profile: '/users/profile',
  refresh: '/auth/refresh',
  getUsers: '/users',
  forgotPassword: '/auth/forgot-password',
  setPassword: '/auth/set-password',

  // Users / Team
  inviteUser: '/users/invite',
  team: '/users/team',
  onboardingComplete: '/users/onboarding-complete',
  owners: '/users/owners',
  platformStats: '/users/platform-stats',

  // Fuel Types
  fuelTypes: '/fuel-types',
  fuelTypeById: (id: number) => `/fuel-types/${id}`,
  fuelTypePrice: (id: number) => `/fuel-types/${id}/price`,
  fuelTypePriceHistory: (id: number) => `/fuel-types/${id}/price-history`,

  // Tanks
  tanks: '/tanks',
  tankById: (id: number) => `/tanks/${id}`,
  tankAlerts: '/tanks/alerts',
  tankDipping: (id: number) => `/tanks/${id}/dipping`,
  tankDippings: (id: number) => `/tanks/${id}/dippings`,

  // Pumps & Nozzles
  pumps: '/pumps',
  pumpById: (id: number) => `/pumps/${id}`,
  pumpNozzles: (pumpId: number) => `/pumps/${pumpId}/nozzles`,
  nozzles: '/nozzles',
  nozzleById: (id: number) => `/nozzles/${id}`,

  // Employees
  employees: '/employees',
  employeeById: (id: number) => `/employees/${id}`,

  // Shifts
  shiftStart: '/shifts/start',
  shiftEnd: (id: number) => `/shifts/${id}/end`,
  shifts: '/shifts',
  shiftById: (id: number) => `/shifts/${id}`,
  shiftsActive: '/shifts/active',

  // Sales
  sales: '/sales',
  saleById: (id: number) => `/sales/${id}`,
  salesDailySummary: '/sales/daily-summary',

  // Vehicles
  vehicles: '/vehicles',
  vehicleSearch: '/vehicles/search',
  vehicleById: (id: number) => `/vehicles/${id}`,

  // Customers
  customers: '/customers',
  customerById: (id: number) => `/customers/${id}`,

  // Credits
  creditPayment: '/credits/payment',
  credits: '/credits',
  creditsOutstanding: '/credits/outstanding',
  creditsSummary: '/credits/summary',

  // Supplies
  supplies: '/supplies',
  supplyById: (id: number) => `/supplies/${id}`,

  // Expenses
  expenses: '/expenses',
  expenseById: (id: number) => `/expenses/${id}`,
  expensesSummary: '/expenses/summary',

  // Bank Deposits
  bankDeposits: '/bank-deposits',
  bankDepositById: (id: number) => `/bank-deposits/${id}`,

  // Dashboard
  dashboardSummary: '/dashboard/summary',
  dashboardSalesChart: '/dashboard/sales-chart',
  dashboardTankLevels: '/dashboard/tank-levels',
  dashboardCreditOverview: '/dashboard/credit-overview',

  // Subscriptions
  subscriptionTrial: '/subscriptions/trial',
  subscriptionSubscribe: '/subscriptions/subscribe',
  subscriptionCurrent: '/subscriptions/current',
  subscriptions: '/subscriptions',
  subscriptionActivate: (id: number) => `/subscriptions/${id}/activate`,
  subscriptionExpireOverdue: '/subscriptions/expire-overdue',

  // Reports
  reportDaily: '/reports/daily',
  reportMonthly: '/reports/monthly',
  reportFuelWise: '/reports/fuel-wise',
  reportShiftWise: '/reports/shift-wise',
  reportProfitLoss: '/reports/profit-loss',
  reportStock: '/reports/stock',
};

export default paths;
