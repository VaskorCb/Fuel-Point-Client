import { SxProps } from '@mui/material';
import paths from './paths';
import { UserRole } from 'types/auth-and-onboarding';

export interface SubMenuItem {
  name: string;
  pathName: string;
  key?: string;
  selectionPrefix?: string;
  path?: string;
  active?: boolean;
  icon?: string;
  iconSx?: SxProps;
  items?: SubMenuItem[];
  new?: boolean;
  hasNew?: boolean;
  roles?: UserRole[];
}

export interface MenuItem {
  id: string;
  key?: string;
  subheader?: string;
  icon: string;
  iconSx?: SxProps;
  items: SubMenuItem[];
  roles?: UserRole[];
}

const sitemap: MenuItem[] = [
  {
    id: 'main',
    key: 'main',
    icon: 'material-symbols:view-quilt-outline',
    roles: ['OWNER', 'ADMIN'],
    items: [
      {
        name: 'Dashboard',
        key: 'dashboard',
        path: paths.dashboard,
        pathName: 'dashboard',
        icon: 'material-symbols:dashboard-outline',
        active: true,
        roles: ['OWNER', 'ADMIN'],
      },
    ],
  },
  {
    id: 'sales',
    subheader: 'Sales & Operations',
    key: 'sales_operations',
    icon: 'material-symbols:point-of-sale',
    roles: ['OWNER', 'ADMIN'],
    items: [
      {
        name: 'Sales',
        key: 'sales',
        path: paths.sales,
        pathName: 'sales',
        icon: 'material-symbols:point-of-sale',
        active: true,
        selectionPrefix: '/sales',
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Shifts',
        key: 'shifts',
        path: paths.shifts,
        pathName: 'shifts',
        icon: 'material-symbols:schedule-outline',
        active: true,
        selectionPrefix: '/shifts',
        roles: ['OWNER', 'ADMIN'],
      },
    ],
  },
  {
    id: 'inventory',
    subheader: 'Inventory',
    key: 'inventory',
    icon: 'material-symbols:inventory-2-outline',
    roles: ['OWNER', 'ADMIN'],
    items: [
      {
        name: 'Tanks',
        key: 'tanks',
        path: paths.tanks,
        pathName: 'tanks',
        icon: 'material-symbols:propane-tank-outline',
        active: true,
        selectionPrefix: '/tanks',
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Pumps & Nozzles',
        key: 'pumps',
        path: paths.pumps,
        pathName: 'pumps',
        icon: 'material-symbols:local-gas-station-outline',
        active: true,
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Supplies (BPC)',
        key: 'supplies',
        path: paths.supplies,
        pathName: 'supplies',
        icon: 'material-symbols:local-shipping-outline',
        active: true,
        selectionPrefix: '/supplies',
        roles: ['OWNER', 'ADMIN'],
      },
    ],
  },
  {
    id: 'people',
    subheader: 'People',
    key: 'people',
    icon: 'material-symbols:group-outline',
    roles: ['OWNER', 'ADMIN'],
    items: [
      {
        name: 'Employees',
        key: 'employees',
        path: paths.employees,
        pathName: 'employees',
        icon: 'material-symbols:badge-outline',
        active: true,
        selectionPrefix: '/employees',
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Customers',
        key: 'customers',
        path: paths.customers,
        pathName: 'customers',
        icon: 'material-symbols:group-outline',
        active: true,
        selectionPrefix: '/customers',
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Credit / Baki',
        key: 'credits',
        path: paths.credits,
        pathName: 'credits',
        icon: 'material-symbols:account-balance-wallet-outline',
        active: true,
        selectionPrefix: '/credits',
        roles: ['OWNER', 'ADMIN'],
      },
    ],
  },
  {
    id: 'finance',
    subheader: 'Finance',
    key: 'finance',
    icon: 'material-symbols:account-balance-outline',
    roles: ['OWNER', 'ADMIN'],
    items: [
      {
        name: 'Expenses',
        key: 'expenses',
        path: paths.expenses,
        pathName: 'expenses',
        icon: 'material-symbols:receipt-long-outline',
        active: true,
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Bank Deposits',
        key: 'bank_deposits',
        path: paths.bank_deposits,
        pathName: 'bank-deposits',
        icon: 'material-symbols:account-balance-outline',
        active: true,
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Reports',
        key: 'reports',
        path: paths.reports,
        pathName: 'reports',
        icon: 'material-symbols:analytics-outline',
        active: true,
        roles: ['OWNER', 'ADMIN'],
      },
    ],
  },
  {
    id: 'admin',
    subheader: 'Admin',
    key: 'admin',
    icon: 'material-symbols:admin-panel-settings-outline',
    roles: ['OWNER', 'ADMIN'],
    items: [
      {
        name: 'Team',
        key: 'team',
        path: paths.team,
        pathName: 'team',
        icon: 'material-symbols:group-add-outline',
        active: true,
        roles: ['OWNER', 'ADMIN'],
      },
      {
        name: 'Fuel Prices',
        key: 'fuel_prices',
        path: paths.fuel_prices,
        pathName: 'fuel-prices',
        icon: 'material-symbols:oil-barrel-outline',
        active: true,
        roles: ['OWNER', 'ADMIN'],
      },
    ],
  },
];

export const settingsSitemap: SubMenuItem = {
  name: 'Settings',
  pathName: 'settings',
  icon: 'material-symbols:settings-outline',
  active: true,
  path: paths.settings,
};

export default sitemap;
