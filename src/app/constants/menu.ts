import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InputIcon from '@mui/icons-material/Input';

export const MENU_ITEMS = [
    { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { text: 'Budget', icon: AccountBalanceWalletIcon, path: '/budget' },
    { text: 'Expenses', icon: ReceiptIcon, path: '/expenses' },
    { text: 'Input', icon: InputIcon, path: '/input' }
]