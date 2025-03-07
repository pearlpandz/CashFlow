"use client"

import { Box, Paper, Typography } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import './BudgetEmotionChart.css';

interface ArrowProps {
    income: number;
    expense: number;
}
interface EmotionChartProps {
    income: number;
    expense: number;
}

const EmotionArrow = ({ income, expense }: ArrowProps) => {
    const difference = income - expense;
    if (difference > 0) {
        return (
            <TrendingUpIcon
                className="trend-icon trend-icon--up"
            />
        );
    }
    return (
        <TrendingDownIcon
            className="trend-icon trend-icon--down"
        />
    );
};

const BudgetEmotionChart = ({ income, expense }: EmotionChartProps) => {  
    return (
        <Paper sx={{ p: 3, backgroundColor: '#efefef' }}>
            <Box sx={{ position: 'relative', height: 325, borderRadius: 1 }}>
                {/* Income Box - Top Left */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, textAlign: 'left' }}>
                    <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>${income}</Typography>
                    <Typography variant="body2" component="h6" sx={{ fontWeight: 'bold' }}>Income</Typography>
                </Box>

                {/* Arrow in the middle */}
                <Box sx={{ position: 'absolute', top: '-40px', left: 0, right: 0, textAlign: 'center' }}>
                    <EmotionArrow income={income} expense={expense} />
                </Box>

                {/* Expense Box - Bottom Right */}
                <Box sx={{ position: 'absolute', bottom: 0, right: 0, p: 2, textAlign: 'right' }}>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>${expense}</Typography>
                <Typography variant="body2" component="h6" sx={{ fontWeight: 'bold' }}>Expense</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default BudgetEmotionChart;
