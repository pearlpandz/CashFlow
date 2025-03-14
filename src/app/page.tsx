"use client"

import { Box, Typography, Grid2 as Grid } from "@mui/material"
import SummaryCards from "./components/SummaryCards";
import BudgetEmotionChart from "./components/BudgetEmotionChart";
import BudgetUsageChart from "./components/BudgetUsageChart";
import ExpenseChart from "./components/ExpenseChart";
import { useTransactions } from "./hooks/useTransactions";

export default function UsersList() {
  const { data, error, isLoading } = useTransactions();

  return (
    <Box>
      <Box>
        <Typography variant="h6" component='h1' sx={{ fontWeight: 'bold' }}>Summary</Typography>
        <Typography variant="body1">1 Jan, 2025 - 31 Jan, 2025</Typography>
      </Box>
      <Grid container spacing={2.5} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <SummaryCards />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <BudgetEmotionChart income={2500} expense={2800} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 7 }}>
          <BudgetUsageChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <ExpenseChart />
        </Grid>
      </Grid>
    </Box>
  );
}
