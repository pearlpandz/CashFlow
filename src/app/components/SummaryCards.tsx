import { Paper, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Grid2 as Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@prisma/client";
import { useMemo } from "react";
import '@/app/utils/prototypes';

function SummaryCards() {
    const queryClient = useQueryClient();
    const transactions: Partial<Transaction>[] = queryClient.getQueryData(["transactions"]) ?? [];
    
    const { expenseAmount, incomeAmount }  = useMemo(() => {
        let expenseAmount = 0, incomeAmount = 0;
        if(transactions.length > 0) {
            const expenses: number[] = transactions.filter(item => item.type === 'expense' && item.amount !== undefined).map(a => a.amount as number) ?? [];
            expenseAmount = expenses?.reduce((a, b) => a + b, 0);
            const income: number[] = transactions.filter(item => item.type === 'income' && item.amount !== undefined).map(a=> a.amount as number) ?? []
            incomeAmount = income?.reduce((a, b) => a + b, 0);
        }
        return { expenseAmount, incomeAmount }
    }, [transactions]) 
    

    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, position: 'relative', backgroundColor: '#e5e5ff' }}>
                    <AccountBalanceWalletIcon sx={{ position: 'absolute', top: 16, left: 16, color: 'primary.main' }} />
                    <Typography variant="h3" align="center" sx={{ my: 3, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>{incomeAmount.toINRCurrency()}</Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Income</Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, position: 'relative', backgroundColor: '#e5e5ff' }}>
                    <AccountBalanceWalletIcon sx={{ position: 'absolute', top: 16, left: 16, color: 'error.main' }} />
                    <Typography variant="h3" align="center" sx={{ my: 3, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>{expenseAmount.toINRCurrency()}</Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Expenses</Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, position: 'relative', backgroundColor: '#e5e5ff' }}>
                    <AccountBalanceWalletIcon sx={{ position: 'absolute', top: 16, left: 16, color: 'success.main' }} />
                    <Typography variant="h3" align="center" sx={{ my: 3, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>$700</Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Savings</Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, position: 'relative', backgroundColor: '#e5e5ff' }}>
                    <AccountBalanceWalletIcon sx={{ position: 'absolute', top: 16, left: 16, color: 'warning.main' }} />
                    <Typography variant="h3" align="center" sx={{ my: 3, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>$250</Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Investments</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SummaryCards;
