"use client";

import { Box, Typography } from '@mui/material';
import AddTransaction from '../components/AddTransaction';
import ListTransaction from '../components/ListTransaction';
import { useQueryClient } from '@tanstack/react-query';
import { useTransactions } from '../hooks/useTransactions';

interface ExpenseRow {
  date: Date | null;
  type: string;
  category: string;
  amount: string;
  description: string;
}



export default function InputPage() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useTransactions();

  const handleSave = async (payload: ExpenseRow) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      const savedTransaction = await response.json();
      console.log('Transactions saved successfully');
      queryClient.setQueryData(["transactions"], (oldData: ExpenseRow[] = []) => [...oldData, savedTransaction]);
    } else {
      console.error('Failed to save transactions');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Income/Expense
      </Typography>
    
      <AddTransaction handleSave={handleSave} />

      <ListTransaction rows={data} loading={isLoading} />
    </Box>
  );
}
