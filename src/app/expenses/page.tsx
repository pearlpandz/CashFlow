"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button,
  IconButton,
  DialogTitle,
  Backdrop,
  Grid2 as Grid,
} from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import { Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // TODO: Replace with actual user ID from authentication
  const userId = 1;

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getDateRange = () => {
    if (expenses.length === 0) return 'No expenses';
    const dates = expenses.map(expense => new Date(expense.date));
    const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
    return `${formatDate(minDate.toISOString())} - ${formatDate(maxDate.toISOString())}`;
  };

  return (
    <Box>
      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid size={{xs:12, md: 6}}>
          <Typography variant="h6" component='h1' sx={{ fontWeight: 'bold' }}>Expense Summary</Typography>
          <Typography variant="body1" color="text.secondary">{getDateRange()}</Typography>
        </Grid>
        <Grid size={{xs:12, md: 6}} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
          >
            Add Expense
          </Button>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{xs:12, md: 4}}>
            <Typography variant="subtitle2" color="text.secondary">Total Expenses</Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {formatAmount(getTotalExpenses())}
            </Typography>
          </Grid>
          <Grid size={{xs:12, md: 4}}>
            <Typography variant="subtitle2" color="text.secondary">Number of Transactions</Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {expenses.length}
            </Typography>
          </Grid>
          <Grid size={{xs:12, md: 4}}>
            <Typography variant="subtitle2" color="text.secondary">Average Expense</Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {expenses.length > 0 ? formatAmount(getTotalExpenses() / expenses.length) : formatAmount(0)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(5px)",
            },
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Expense
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <ExpenseForm
            userId={userId}
            onSubmit={() => {
              fetchExpenses();
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Expenses
        </Typography>

        {loading ? (
          <Typography>Loading expenses...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : expenses.length === 0 ? (
          <Typography>No expenses found</Typography>
        ) : (
          <Paper elevation={2}>
            <List>
              {expenses.map((expense, index) => (
                <Box key={expense.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={expense.description}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {formatAmount(expense.amount)}
                          </Typography>
                          {' • '}
                          {expense.category}
                          {' • '}
                          {formatDate(expense.date)}
                        </>
                      }
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Box>
  );
} 