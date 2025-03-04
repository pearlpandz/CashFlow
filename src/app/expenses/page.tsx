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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Expense Tracker
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
        >
          Add Expense
        </Button>
      </Box>

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
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker overlay
              backdropFilter: "blur(5px)", // Blur effect
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