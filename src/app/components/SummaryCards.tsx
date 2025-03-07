import { Paper, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Grid2 as Grid } from "@mui/material";

function SummaryCards() {
    return (
        <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, position: 'relative', backgroundColor: '#e5e5ff' }}>
                    <AccountBalanceWalletIcon sx={{ position: 'absolute', top: 16, left: 16, color: 'primary.main' }} />
                    <Typography variant="h3" align="center" sx={{ my: 3, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>$2,500</Typography>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Income</Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, position: 'relative', backgroundColor: '#e5e5ff' }}>
                    <AccountBalanceWalletIcon sx={{ position: 'absolute', top: 16, left: 16, color: 'error.main' }} />
                    <Typography variant="h3" align="center" sx={{ my: 3, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>$1,800</Typography>
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
