"use client";

import { Box, Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { DatasetElementType } from '@mui/x-charts/models/seriesType/config';
import { useEffect, useState } from 'react';

interface BudgetUsage extends DatasetElementType<string | number | Date | null | undefined> {
  category: string;
  allocated: number;
  used: number;
  percentage: number;
}

interface BudgetUsageChartProps {
  data?: BudgetUsage[];
  loading?: boolean;
  error?: string | null;
}

const BudgetUsageChart = ({ data = [], loading = false, error = null }: BudgetUsageChartProps) => {
  const [chartData, setChartData] = useState<BudgetUsage[]>([]);

  useEffect(() => {
    // If no data provided, use sample data
    if (data.length === 0) {
      setChartData([
        { category: 'Food', allocated: 500, used: 350, percentage: 70 },
        { category: 'Transport', allocated: 300, used: 240, percentage: 80 },
        { category: 'Entertainment', allocated: 200, used: 180, percentage: 90 },
        { category: 'Shopping', allocated: 400, used: 200, percentage: 50 },
        { category: 'Utilities', allocated: 250, used: 225, percentage: 90 },
      ]);
    } else {
      setChartData(data);
    }
  }, []);

  // Define colors for each category
  const categoryColors = {
    Food: '#2196f3', // Blue
    Transport: '#4caf50', // Green  
    Entertainment: '#f44336', // Red
    Shopping: '#ff9800', // Orange
    Utilities: '#9c27b0', // Purple
  };

  const totalAllocated = chartData.reduce((sum, item) => sum + item.allocated, 0);
  const totalUsed = chartData.reduce((sum, item) => sum + item.used, 0);
  const totalPercentage = Math.round((totalUsed / totalAllocated) * 100);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ p: 3, backgroundColor: '#efefef' }}>
      <Box sx={{ width: '100%', height: 325, borderRadius: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Current Month Budget
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ flex: 1, borderRight: '4px solid #4caf50', pr: 4 }}>
            {chartData.map((item) => (
              <Box key={item.category} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.category}</Typography>
                  <Typography>{item.percentage}%</Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 1 }}>
                  <Box
                    sx={{
                      width: `${item.percentage}%`,
                      height: 10,
                      bgcolor: categoryColors[item.category as keyof typeof categoryColors] || '#2196f3',
                      borderRadius: 1,
                      transition: 'width 0.5s ease-in-out',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                  {totalPercentage}%
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                  Used
                </Typography>
              </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BudgetUsageChart;
