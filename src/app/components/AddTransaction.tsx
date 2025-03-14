import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import DatePicker from "react-datepicker";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

interface ExpenseRow {
    date: Date | null;
    type: string;
    category: string;
    amount: string;
    description: string;
}

const initialState: ExpenseRow = {
    date: null,
    type: '',
    category: '',
    amount: '',
    description: ''
}

export default function AddTransaction({ handleSave }: { handleSave: (payload: ExpenseRow) => void }) {
    const [row, setRow] = useState<ExpenseRow>(initialState);

    const handleAddTransaction = () => {
        const payload = {
            ...row,
            userId: 1
        };
        handleSave(payload);
        setRow(initialState);
    };

    const handleChange = (field: keyof ExpenseRow, value: string | Date | null) => {
        setRow({ ...row, [field]: value });
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Box>
                <Box
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
                            onChange={(e) => handleChange('type', e.target.value)}
                        >
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                            <MenuItem value="savings">Savings</MenuItem>
                            <MenuItem value="investments">Investments</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={row.category}
                            label="Category"
                            onChange={(e) => handleChange('category', e.target.value)}
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
                        onChange={(e) => handleChange('amount', e.target.value)}
                        sx={{ width: 150 }}
                    />

                    <FormControl sx={{ width: 200 }}>
                        <DatePicker
                            selected={row.date}
                            onChange={(newValue: Date | null) => handleChange('date', newValue)}
                            className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl"
                            wrapperClassName="MuiFormControl-root"
                            customInput={<TextField />}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Select date"
                            popperPlacement="top"
                            popperProps={{
                                strategy: "fixed"
                            }}
                        />
                    </FormControl>

                    <TextField
                        label="Short Description"
                        value={row.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddTransaction}
                        startIcon={<AddIcon />}
                        sx={{ ml: 1 }}
                    >
                        Add Income/Expense
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
