"use client"

import { Box, Typography, Paper, TableCell, TableRow, TableBody, Table, TableHead } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

// Sample data - in real app this would come from props or API
const expenseData = [
    { category: 'Housing', amount: 1200 },
    { category: 'Food', amount: 400 },
    { category: 'Transportation', amount: 300 },
    { category: 'Utilities', amount: 250 },
    { category: 'Entertainment', amount: 200 },
    { category: 'Others', amount: 450 }
];

export default function ExpenseChart() {
    const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);

    const pieData = expenseData.map(item => ({
        id: item.category,
        value: item.amount,
        label: item.category
    }));

    return (
        <Paper sx={{ p: 3, height: '100%', backgroundColor: '#efefef' }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                Expense Breakdown
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <Box sx={{ flex: 1, minHeight: 400 }}>
                    <PieChart
                        series={[
                            {
                                data: pieData,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                innerRadius: 30,
                                // arcLabel: (item) => `${item.value}`,
                                // arcLabelMinAngle: 20,
                            },
                        ]}
                        height={400}
                        skipAnimation={true}
                        slotProps={{
                            legend: {
                                hidden: true
                            }
                        }}
                    />
                </Box>

                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    //   gap: 1.5,
                    minWidth: 250
                }}>
                    <Table>
                        <TableBody>
                            {expenseData.map((item, index) => (
                                <TableRow key={item.category}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    bgcolor: `hsl(${index * (360 / expenseData.length)}, 70%, 50%)`,
                                                }}
                                            />
                                            <Typography variant="body1">{item.category}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        ${item.amount}
                                    </TableCell>
                                    <TableCell align="right">
                                        {((item.amount / totalExpense) * 100).toFixed(1)}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* <Box sx={{
            mt: 2,
            p: 1.5,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 1
          }}>
            <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total</span>
              <span>${totalExpense}</span>
            </Typography>
          </Box> */}
                </Box>
            </Box>
        </Paper>
    );
}
