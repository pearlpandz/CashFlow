"use client";

import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

interface ExpenseRow {
  id: number;
  date: Date | null;
  type: string;
  category: string;
  amount: string;
  description: string;
}

export default function InputPage() {
  const [rows, setRows] = useState<ExpenseRow[]>([
    {
      id: 1,
      date: new Date(),
      type: '',
      category: '',
      amount: '',
      description: ''
    }
  ]);

  const handleAddRow = () => {
    const newRow: ExpenseRow = {
      id: rows.length + 1,
      date: new Date(),
      type: '',
      category: '',
      amount: '',
      description: ''
    };
    setRows([...rows, newRow]);
  };

  const handleChange = (id: number, field: keyof ExpenseRow, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add Income/Expense
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Box>
          {rows.map((row) => (
            <Box 
              key={row.id}
              sx={{ 
                display: 'flex', 
                gap: 2, 
                mb: 2,
                alignItems: 'center'
              }}
            >
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={row.type}
                  label="Type"
                  onChange={(e) => handleChange(row.id, 'type', e.target.value)}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={row.category}
                  label="Category"
                  onChange={(e) => handleChange(row.id, 'category', e.target.value)}
                >
                  <MenuItem value="salary">Salary</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="transport">Transport</MenuItem>
                  <MenuItem value="utilities">Utilities</MenuItem>
                  <MenuItem value="entertainment">Entertainment</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Amount"
                type="number"
                value={row.amount}
                onChange={(e) => handleChange(row.id, 'amount', e.target.value)}
                sx={{ width: 150 }}
              />

              <TextField
                label="Description"
                value={row.description}
                onChange={(e) => handleChange(row.id, 'description', e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={handleAddRow}
          >
            Add Row
          </Button>
          <Button 
            variant="contained" 
            color="primary"
          >
            Save All
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
