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
} from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';

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

      <ExpenseForm userId={userId} onSubmit={fetchExpenses} />

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