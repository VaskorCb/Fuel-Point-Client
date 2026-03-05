'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useDailySummary } from 'services/sales/sales.hooks';
import dayjs from 'dayjs';

interface DailySummaryCardProps {
  date?: string;
}

const DailySummaryCard = ({ date }: DailySummaryCardProps) => {
  const summaryDate = date ?? dayjs().format('YYYY-MM-DD');
  const { data: summaryData, isLoading } = useDailySummary(summaryDate);

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  const summary = summaryData?.data;

  if (!summary) {
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary">No summary data available for this date.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Daily Summary - {dayjs(summaryDate).format('DD MMM YYYY')}
        </Typography>

        {/* Totals */}
        <Box display="flex" gap={4} mb={3} flexWrap="wrap">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Sales
            </Typography>
            <Typography variant="h5">৳{summary.totalSales?.toLocaleString()}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Quantity
            </Typography>
            <Typography variant="h5">{summary.totalQuantity?.toLocaleString()}L</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Transactions
            </Typography>
            <Typography variant="h5">{summary.totalTransactions}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Fuel-wise Breakdown */}
        <Typography variant="subtitle1" mb={1}>
          Fuel-wise Breakdown
        </Typography>
        <TableContainer sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fuel Type</TableCell>
                <TableCell align="right">Quantity (L)</TableCell>
                <TableCell align="right">Amount (৳)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summary.fuelWise?.map((item) => (
                <TableRow key={item.fuelType}>
                  <TableCell>{item.fuelType}</TableCell>
                  <TableCell align="right">{item.totalQuantity?.toLocaleString()}</TableCell>
                  <TableCell align="right">৳{item.totalAmount?.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {(!summary.fuelWise || summary.fuelWise.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No fuel sales data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ mb: 2 }} />

        {/* Payment-wise Breakdown */}
        <Typography variant="subtitle1" mb={1}>
          Payment-wise Breakdown
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Amount (৳)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summary.paymentWise?.map((item) => (
                <TableRow key={item.paymentMethod}>
                  <TableCell>{item.paymentMethod}</TableCell>
                  <TableCell align="right">৳{item.totalAmount?.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {(!summary.paymentWise || summary.paymentWise.length === 0) && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No payment data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default DailySummaryCard;
