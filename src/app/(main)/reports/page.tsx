'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  useDailyReport,
  useMonthlyReport,
  useProfitLoss,
  useStockReport,
} from 'services/reports/reports.hooks';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
    {value === index && children}
  </Box>
);

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const formatCurrency = (amount: number | undefined | null): string => {
  return `৳${(amount ?? 0).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const ReportsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const dateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

  const dailyReport = useDailyReport(dateStr);
  const monthlyReport = useMonthlyReport(selectedMonth, selectedYear);
  const profitLoss = useProfitLoss(selectedMonth, selectedYear);
  const stockReport = useStockReport();

  const daily = dailyReport.data?.data;
  const monthly = monthlyReport.data?.data;
  const pl = profitLoss.data?.data;
  const stocks = stockReport.data?.data ?? [];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          Reports
        </Typography>

        <Card>
          <CardContent>
            <Tabs
              value={tabIndex}
              onChange={(_, newValue) => setTabIndex(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Daily Report" />
              <Tab label="Monthly Report" />
              <Tab label="Profit & Loss" />
              <Tab label="Stock Report" />
            </Tabs>

            {/* ==================== TAB 0: DAILY REPORT ==================== */}
            <TabPanel value={tabIndex} index={0}>
              <Box sx={{ mb: 3 }}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue as Date | null)}
                  slotProps={{
                    textField: { size: 'small', sx: { minWidth: 200 } },
                  }}
                />
              </Box>

              {dailyReport.isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : dailyReport.error ? (
                <Alert severity="error">Failed to load daily report.</Alert>
              ) : !daily ? (
                <Alert severity="info">No data available for the selected date.</Alert>
              ) : (
                <>
                  {/* Summary Cards */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Card variant="outlined" sx={{ bgcolor: 'success.50' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Total Sales
                          </Typography>
                          <Typography variant="h5" fontWeight={700} color="success.main">
                            {formatCurrency(daily.totalSales)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Card variant="outlined" sx={{ bgcolor: 'error.50' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Total Expenses
                          </Typography>
                          <Typography variant="h5" fontWeight={700} color="error.main">
                            {formatCurrency(daily.totalExpenses)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Card variant="outlined" sx={{ bgcolor: 'info.50' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Net Amount
                          </Typography>
                          <Typography variant="h5" fontWeight={700} color="info.main">
                            {formatCurrency(daily.netAmount)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {/* Fuel-wise Sales */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    Fuel-wise Sales
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Fuel Type</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Quantity (L)
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Amount (৳)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {daily.fuelWiseSales.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              <Typography variant="body2" color="text.secondary">
                                No fuel sales recorded.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          daily.fuelWiseSales.map((sale) => (
                            <TableRow key={sale.fuelType}>
                              <TableCell>{sale.fuelType}</TableCell>
                              <TableCell align="right">
                                {sale.quantity.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell align="right">{formatCurrency(sale.amount)}</TableCell>
                            </TableRow>
                          ))
                        )}
                        {daily.fuelWiseSales.length > 0 && (
                          <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {daily.fuelWiseSales
                                .reduce((sum, s) => sum + s.quantity, 0)
                                .toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {formatCurrency(daily.fuelWiseSales.reduce((sum, s) => sum + s.amount, 0))}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Collection Breakdown */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    Collection Breakdown
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Payment Method</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Amount (৳)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(daily.collectionBreakdown).length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              <Typography variant="body2" color="text.secondary">
                                No collection data available.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          Object.entries(daily.collectionBreakdown).map(([method, amount]) => (
                            <TableRow key={method}>
                              <TableCell>{method}</TableCell>
                              <TableCell align="right">{formatCurrency(amount)}</TableCell>
                            </TableRow>
                          ))
                        )}
                        {Object.keys(daily.collectionBreakdown).length > 0 && (
                          <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Total Collection</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {formatCurrency(
                                Object.values(daily.collectionBreakdown).reduce((sum, amt) => sum + amt, 0),
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Expenses */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    Expenses
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Amount (৳)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {daily.expenses.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              <Typography variant="body2" color="text.secondary">
                                No expenses recorded.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          daily.expenses.map((expense) => (
                            <TableRow key={expense.id}>
                              <TableCell>{expense.category}</TableCell>
                              <TableCell>{expense.description}</TableCell>
                              <TableCell align="right">{formatCurrency(expense.amount)}</TableCell>
                            </TableRow>
                          ))
                        )}
                        {daily.expenses.length > 0 && (
                          <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 700 }} colSpan={2}>
                              Total Expenses
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {formatCurrency(daily.expenses.reduce((sum, e) => sum + e.amount, 0))}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </TabPanel>

            {/* ==================== TAB 1: MONTHLY REPORT ==================== */}
            <TabPanel value={tabIndex} index={1}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  label="Month"
                  select
                  size="small"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  sx={{ minWidth: 160 }}
                >
                  {MONTHS.map((m) => (
                    <MenuItem key={m.value} value={m.value}>
                      {m.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Year"
                  select
                  size="small"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  sx={{ minWidth: 120 }}
                >
                  {yearOptions.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {monthlyReport.isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : monthlyReport.error ? (
                <Alert severity="error">Failed to load monthly report.</Alert>
              ) : !monthly ? (
                <Alert severity="info">No data available for the selected month.</Alert>
              ) : (
                <>
                  {/* Monthly Totals Summary */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card variant="outlined" sx={{ bgcolor: 'success.50' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Total Sales
                          </Typography>
                          <Typography variant="h6" fontWeight={700} color="success.main">
                            {formatCurrency(monthly.totalSales)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card variant="outlined" sx={{ bgcolor: 'error.50' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Total Expenses
                          </Typography>
                          <Typography variant="h6" fontWeight={700} color="error.main">
                            {formatCurrency(monthly.totalExpenses)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card variant="outlined" sx={{ bgcolor: 'warning.50' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Supply Cost
                          </Typography>
                          <Typography variant="h6" fontWeight={700} color="warning.main">
                            {formatCurrency(monthly.totalSupplyCost)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card variant="outlined" sx={{ bgcolor: 'info.50' }}>
                        <CardContent sx={{ textAlign: 'center', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Net Profit
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color={monthly.netProfit >= 0 ? 'success.main' : 'error.main'}
                          >
                            {formatCurrency(monthly.netProfit)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {/* Fuel-wise Sales Summary */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    Fuel-wise Sales Summary
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Fuel Type</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Total Quantity (L)
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Total Amount (৳)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {monthly.fuelWiseSales.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              <Typography variant="body2" color="text.secondary">
                                No fuel sales data.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          monthly.fuelWiseSales.map((sale) => (
                            <TableRow key={sale.fuelType}>
                              <TableCell>{sale.fuelType}</TableCell>
                              <TableCell align="right">
                                {sale.totalQuantity.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell align="right">{formatCurrency(sale.totalAmount)}</TableCell>
                            </TableRow>
                          ))
                        )}
                        {monthly.fuelWiseSales.length > 0 && (
                          <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {monthly.fuelWiseSales
                                .reduce((sum, s) => sum + s.totalQuantity, 0)
                                .toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {formatCurrency(monthly.fuelWiseSales.reduce((sum, s) => sum + s.totalAmount, 0))}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Daily Sales Trend */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    Daily Sales Trend
                  </Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, maxHeight: 400 }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Total Amount (৳)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {monthly.dailySales.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              <Typography variant="body2" color="text.secondary">
                                No daily sales data.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          monthly.dailySales.map((day) => (
                            <TableRow key={day.date}>
                              <TableCell>{new Date(day.date).toLocaleDateString('en-GB')}</TableCell>
                              <TableCell align="right">{formatCurrency(day.totalAmount)}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Expenses by Category */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    Expenses by Category
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>
                            Total (৳)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {monthly.expensesByCategory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              <Typography variant="body2" color="text.secondary">
                                No expense data.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          monthly.expensesByCategory.map((cat) => (
                            <TableRow key={cat.category}>
                              <TableCell>{cat.category}</TableCell>
                              <TableCell align="right">{formatCurrency(cat.total)}</TableCell>
                            </TableRow>
                          ))
                        )}
                        {monthly.expensesByCategory.length > 0 && (
                          <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Total Expenses</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                              {formatCurrency(monthly.expensesByCategory.reduce((sum, c) => sum + c.total, 0))}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </TabPanel>

            {/* ==================== TAB 2: PROFIT & LOSS ==================== */}
            <TabPanel value={tabIndex} index={2}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  label="Month"
                  select
                  size="small"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  sx={{ minWidth: 160 }}
                >
                  {MONTHS.map((m) => (
                    <MenuItem key={m.value} value={m.value}>
                      {m.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Year"
                  select
                  size="small"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  sx={{ minWidth: 120 }}
                >
                  {yearOptions.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {profitLoss.isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : profitLoss.error ? (
                <Alert severity="error">Failed to load profit & loss report.</Alert>
              ) : !pl ? (
                <Alert severity="info">No data available for the selected period.</Alert>
              ) : (
                <Card variant="outlined" sx={{ maxWidth: 600 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                      Profit & Loss Statement
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                      {MONTHS.find((m) => m.value === selectedMonth)?.label} {selectedYear}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {/* Revenue */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body1">Revenue (Total Sales)</Typography>
                      <Typography variant="body1" fontWeight={600} color="success.main">
                        {formatCurrency(pl.revenue)}
                      </Typography>
                    </Box>

                    {/* Cost of Goods */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body1">Cost of Goods (Fuel Purchase)</Typography>
                      <Typography variant="body1" fontWeight={600} color="error.main">
                        ({formatCurrency(pl.costOfGoods)})
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    {/* Gross Profit */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body1" fontWeight={700}>
                        Gross Profit
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        color={pl.grossProfit >= 0 ? 'success.main' : 'error.main'}
                      >
                        {formatCurrency(pl.grossProfit)}
                      </Typography>
                    </Box>

                    {/* Operating Expenses */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body1">Operating Expenses</Typography>
                      <Typography variant="body1" fontWeight={600} color="error.main">
                        ({formatCurrency(pl.operatingExpenses)})
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    {/* Net Profit */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1.5,
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: pl.netProfit >= 0 ? 'success.50' : 'error.50',
                      }}
                    >
                      <Typography variant="h6" fontWeight={700}>
                        Net Profit
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color={pl.netProfit >= 0 ? 'success.main' : 'error.main'}
                      >
                        {formatCurrency(pl.netProfit)}
                      </Typography>
                    </Box>

                    {/* Profit Margin */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: 'grey.50',
                      }}
                    >
                      <Typography variant="body1" fontWeight={600}>
                        Profit Margin
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        color={pl.profitMargin >= 0 ? 'success.main' : 'error.main'}
                      >
                        {pl.profitMargin.toFixed(2)}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </TabPanel>

            {/* ==================== TAB 3: STOCK REPORT ==================== */}
            <TabPanel value={tabIndex} index={3}>
              {stockReport.isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : stockReport.error ? (
                <Alert severity="error">Failed to load stock report.</Alert>
              ) : stocks.length === 0 ? (
                <Alert severity="info">No stock data available.</Alert>
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Tank</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Fuel Type</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Current Level (L)
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Capacity (L)
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Fill %
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Avg Daily Consumption (L)
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Est. Days Remaining
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stocks.map((stock, index) => {
                        const fillPercent =
                          stock.capacity > 0 ? (stock.currentLevel / stock.capacity) * 100 : 0;
                        const isLow = fillPercent < 20;
                        const isCritical = fillPercent < 10;

                        return (
                          <TableRow
                            key={stock.tank?.id ?? index}
                            sx={{
                              bgcolor: isCritical
                                ? 'error.50'
                                : isLow
                                  ? 'warning.50'
                                  : 'inherit',
                            }}
                          >
                            <TableCell>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                color={isCritical ? 'error.main' : isLow ? 'warning.main' : 'text.primary'}
                              >
                                Tank #{stock.tank?.tankNumber ?? 'N/A'}
                              </Typography>
                            </TableCell>
                            <TableCell>{stock.fuelType?.name ?? 'N/A'}</TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: isCritical
                                  ? 'error.main'
                                  : isLow
                                    ? 'warning.main'
                                    : 'text.primary',
                                fontWeight: isLow ? 700 : 400,
                              }}
                            >
                              {stock.currentLevel.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell align="right">
                              {stock.capacity.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: isCritical
                                  ? 'error.main'
                                  : isLow
                                    ? 'warning.main'
                                    : 'success.main',
                                fontWeight: 600,
                              }}
                            >
                              {fillPercent.toFixed(1)}%
                            </TableCell>
                            <TableCell align="right">
                              {stock.avgDailyConsumption.toLocaleString('en-BD', {
                                minimumFractionDigits: 2,
                              })}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                color: stock.estimatedDaysRemaining <= 3
                                  ? 'error.main'
                                  : stock.estimatedDaysRemaining <= 7
                                    ? 'warning.main'
                                    : 'text.primary',
                                fontWeight: stock.estimatedDaysRemaining <= 7 ? 700 : 400,
                              }}
                            >
                              {stock.avgDailyConsumption > 0
                                ? `${stock.estimatedDaysRemaining} days`
                                : 'N/A'}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default ReportsPage;
