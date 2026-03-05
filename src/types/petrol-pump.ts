// ============ FUEL TYPE ============
export interface FuelType {
  id: number;
  name: string;
  nameBn?: string;
  unit: string;
  currentPrice: number;
  isActive: boolean;
}

export interface CreateFuelTypePayload {
  name: string;
  nameBn?: string;
  unit?: string;
  currentPrice: number;
}

export interface UpdatePricePayload {
  newPrice: number;
  effectiveFrom?: string;
}

export interface FuelPriceHistory {
  id: number;
  fuelTypeId: number;
  oldPrice: number;
  newPrice: number;
  effectiveFrom: string;
  createdAt: string;
}

// ============ TANK ============
export interface Tank {
  id: number;
  fuelTypeId: number;
  tankNumber: string;
  capacity: number;
  currentLevel: number;
  minLevel: number;
  isActive: boolean;
  fuelType?: FuelType;
  _count?: { nozzles: number };
}

export interface CreateTankPayload {
  fuelTypeId: number;
  tankNumber: string;
  capacity: number;
  currentLevel: number;
  minLevel?: number;
}

export interface TankDipping {
  id: number;
  tankId: number;
  measuredLevel: number;
  calculatedLevel: number;
  difference: number;
  measuredBy: string;
  dippingDate: string;
  notes?: string;
}

export interface CreateDippingPayload {
  measuredLevel: number;
  measuredBy: string;
  dippingDate: string;
  notes?: string;
}

// ============ PUMP & NOZZLE ============
export interface Pump {
  id: number;
  pumpNumber: string;
  isActive: boolean;
  nozzles?: Nozzle[];
}

export interface CreatePumpPayload {
  pumpNumber: string;
}

export interface Nozzle {
  id: number;
  pumpId: number;
  tankId: number;
  fuelTypeId: number;
  nozzleNumber: string;
  isActive: boolean;
  fuelType?: FuelType;
  tank?: Tank;
  pump?: Pump;
}

export interface CreateNozzlePayload {
  tankId: number;
  fuelTypeId: number;
  nozzleNumber: string;
}

// ============ EMPLOYEE ============
export interface Employee {
  id: number;
  userId?: number;
  name: string;
  phone: string;
  nid?: string;
  address?: string;
  designation: string;
  salary?: number;
  joiningDate: string;
  isActive: boolean;
  _count?: { shifts: number; sales: number };
}

export interface CreateEmployeePayload {
  name: string;
  phone: string;
  nid?: string;
  address?: string;
  designation?: string;
  salary?: number;
  joiningDate: string;
  userId?: number;
}

// ============ SHIFT ============
export interface MeterReading {
  id: number;
  shiftId: number;
  nozzleId: number;
  openingReading: number;
  closingReading?: number;
  totalDispensed?: number;
  testFuel: number;
  nozzle?: Nozzle & { fuelType?: FuelType };
}

export interface Shift {
  id: number;
  employeeId: number;
  shiftType: string;
  startTime: string;
  endTime?: string;
  status: string;
  totalCash?: number;
  totalBkash?: number;
  totalNagad?: number;
  totalSales?: number;
  notes?: string;
  employee?: { id: number; name: string };
  meterReadings?: MeterReading[];
  sales?: Sale[];
  _count?: { sales: number };
}

export interface MeterReadingInput {
  nozzleId: number;
  openingReading: number;
}

export interface StartShiftPayload {
  employeeId: number;
  shiftType: string;
  meterReadings: MeterReadingInput[];
}

export interface ClosingMeterReadingInput {
  nozzleId: number;
  closingReading: number;
}

export interface EndShiftPayload {
  meterReadings: ClosingMeterReadingInput[];
  totalCash?: number;
  totalBkash?: number;
  totalNagad?: number;
  notes?: string;
}

// ============ SALE ============
export interface Sale {
  id: number;
  shiftId: number;
  employeeId: number;
  fuelTypeId: number;
  customerId?: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMethod: string;
  paymentRef?: string;
  isCredit: boolean;
  vehicleNumber?: string;
  notes?: string;
  saleDate: string;
  fuelType?: FuelType;
  employee?: { id: number; name: string };
  customer?: { id: number; name: string; phone: string };
  shift?: Shift;
  creditTransaction?: CreditTransaction;
}

export interface CreateSalePayload {
  shiftId: number;
  employeeId: number;
  fuelTypeId: number;
  customerId?: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMethod: string;
  paymentRef?: string;
  isCredit?: boolean;
  vehicleNumber?: string;
  vehicleId?: number;
  newCustomerName?: string;
  newCustomerPhone?: string;
  newVehicleType?: string;
  notes?: string;
}

export interface DailySummary {
  fuelWise: Array<{ fuelType: string; totalQuantity: number; totalAmount: number }>;
  paymentWise: Array<{ paymentMethod: string; totalAmount: number }>;
  totalSales: number;
  totalQuantity: number;
  totalTransactions: number;
}

// ============ VEHICLE ============
export type VehicleType = 'CAR' | 'CNG' | 'TRUCK' | 'BUS' | 'MOTORCYCLE' | 'MICROBUS' | 'PICKUP' | 'OTHER';

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  CAR: 'Car',
  CNG: 'CNG',
  TRUCK: 'Truck',
  BUS: 'Bus',
  MOTORCYCLE: 'Motorcycle',
  MICROBUS: 'Microbus',
  PICKUP: 'Pickup',
  OTHER: 'Other',
};

export interface Vehicle {
  id: number;
  customerId: number;
  vehicleNumber: string;
  vehicleType: VehicleType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  customer?: { id: number; name: string; phone: string; company?: string; currentBalance?: number; creditLimit?: number };
}

export interface CreateVehiclePayload {
  customerId: number;
  vehicleNumber: string;
  vehicleType?: VehicleType;
}

// ============ CUSTOMER ============
export interface Customer {
  id: number;
  name: string;
  phone: string;
  company?: string;
  address?: string;
  creditLimit: number;
  currentBalance: number;
  isActive: boolean;
  sales?: Sale[];
  creditTransactions?: CreditTransaction[];
  vehicles?: Vehicle[];
  _count?: { sales: number; vehicles?: number };
}

export interface CreateCustomerPayload {
  name: string;
  phone: string;
  company?: string;
  address?: string;
  creditLimit?: number;
}

// ============ CREDIT ============
export interface CreditTransaction {
  id: number;
  customerId: number;
  saleId?: number;
  type: string;
  amount: number;
  balanceAfter: number;
  paymentMethod?: string;
  paymentRef?: string;
  notes?: string;
  date: string;
  sale?: { id: number; quantity: number; fuelType?: { name: string } };
  customer?: Customer;
}

export interface CreateCreditPaymentPayload {
  customerId: number;
  amount: number;
  paymentMethod: string;
  paymentRef?: string;
  notes?: string;
}

export interface CreditSummary {
  totalOutstanding: number;
  totalDebtors: number;
  topDebtors: Customer[];
}

// ============ SUPPLY ============
export interface FuelSupply {
  id: number;
  tankId: number;
  challanNumber: string;
  supplierName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedDate: string;
  tankLevelBefore: number;
  tankLevelAfter: number;
  notes?: string;
  tank?: Tank & { fuelType?: FuelType };
}

export interface CreateSupplyPayload {
  tankId: number;
  challanNumber: string;
  supplierName?: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedDate: string;
  notes?: string;
}

// ============ EXPENSE ============
export interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
  paidBy?: string;
  date: string;
}

export interface CreateExpensePayload {
  category: string;
  description: string;
  amount: number;
  paidBy?: string;
  date: string;
}

export interface ExpenseSummary {
  categories: Array<{ category: string; total: number }>;
  grandTotal: number;
}

// ============ BANK DEPOSIT ============
export interface BankDeposit {
  id: number;
  bankName: string;
  accountNumber?: string;
  amount: number;
  depositDate: string;
  reference?: string;
  notes?: string;
}

export interface CreateBankDepositPayload {
  bankName: string;
  accountNumber?: string;
  amount: number;
  depositDate: string;
  reference?: string;
  notes?: string;
}

// ============ DASHBOARD ============
export interface DashboardSummary {
  todaySales: number;
  todayCollection: { cash: number; bkash: number; nagad: number; credit: number };
  activeShifts: number;
  totalCustomers: number;
  todayExpenses: number;
}

export interface SalesChartData {
  date: string;
  totalAmount: number;
  totalQuantity: number;
}

export interface TankLevel {
  tankId: number;
  tankNumber: string;
  fuelTypeName: string;
  capacity: number;
  currentLevel: number;
  percentage: number;
  isLow: boolean;
}

export interface CreditOverview {
  totalOutstanding: number;
  debtorCount: number;
  topDebtors: Array<{ id: number; name: string; phone: string; currentBalance: number }>;
}

// ============ REPORTS ============
export interface DailyReport {
  date: string;
  fuelWiseSales: Array<{ fuelType: string; quantity: number; amount: number }>;
  collectionBreakdown: Record<string, number>;
  expenses: Expense[];
  shifts: Shift[];
  totalSales: number;
  totalExpenses: number;
  netAmount: number;
}

export interface MonthlyReport {
  month: number;
  year: number;
  dailySales: Array<{ date: string; totalAmount: number }>;
  fuelWiseSales: Array<{ fuelType: string; totalQuantity: number; totalAmount: number }>;
  expensesByCategory: Array<{ category: string; total: number }>;
  totalSales: number;
  totalExpenses: number;
  totalSupplyCost: number;
  netProfit: number;
}

export interface ProfitLossReport {
  revenue: number;
  costOfGoods: number;
  grossProfit: number;
  operatingExpenses: number;
  netProfit: number;
  profitMargin: number;
}

export interface StockReport {
  tank: Tank;
  fuelType: FuelType;
  currentLevel: number;
  capacity: number;
  avgDailyConsumption: number;
  estimatedDaysRemaining: number;
}

// ============ API RESPONSE WRAPPER ============
export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}
