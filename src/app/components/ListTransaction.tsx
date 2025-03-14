import { Box, Typography, IconButton, MenuItem, Select, SelectChangeEvent, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useQueryClient } from "@tanstack/react-query";

interface Transaction {
    [x: string]: any;
    id: number;
    date: Date;
    type: string;
    category: string;
    amount: number;
    description: string;
}

export default function ListTransaction({ rows, loading }: { rows: Partial<Transaction>[], loading: boolean }) {
    const queryClient = useQueryClient();
    const [editedRows, setEditedRows] = useState<{ [key: number]: Partial<Transaction> }>({});

    const onSave = async (updatedRows: Partial<Transaction>[]) => {
        console.log('Saving row:', updatedRows);
        try {
            const response = await fetch('/api/transactions', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRows)
            });
            if (response.ok) {
                console.log('Row updated successfully');
            } else {
                console.error('Failed to update row');
            }
        } catch (error) {
            console.error('Failed to update row:', error);
        }
    };

    const handleSaveEdits = async () => {
        const updatedRows = Object.values(editedRows);
        if (updatedRows.length === 0) {
            console.log("No changes to save.");
            return;
        }
        // Update state with new data in tanquery
        queryClient.setQueryData(["transactions"], () => rows.map((row: Partial<Transaction>) => (row.id && editedRows[row.id] ? { ...row, ...editedRows[row.id] } : row)));
        // setRows(
        //     rows.map((row: Partial<Transaction>) => (row.id && editedRows[row.id] ? { ...row, ...editedRows[row.id] } : row))
        // );

        setEditedRows({}); // Clear edits after saving
        await onSave(updatedRows);
    };

    const handleInputChange = (id: number, field: keyof Transaction, value: string | number | Date | null) => {
        setEditedRows((prev) => ({
            ...prev,
            [id]: { ...prev[id], id, [field]: field === 'amount' ? parseFloat(value as string) : value },
        }));
        queryClient.setQueryData(["transactions"], () => rows.map((row: Partial<Transaction>) => (row.id === id ? { ...row, [field]: value } : row)));
        // Update state with new data in tanquery
        // setRows(
        //     rows.map((row: Partial<Transaction>) => (row.id === id ? { ...row, [field]: value } : row))
        // );
    };

    const columns: GridColDef[] = [
        {
            field: 'description',
            headerName: 'Title',
            editable: true,
            flex: 1,
            renderEditCell: (params) => {
                return <TextField
                    value={params.value}
                    onBlur={(e) => {
                        handleInputChange(params.id as number, 'description', e.target.value);
                    }}
                    onChange={(e) => {
                        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value });
                    }}
                    sx={{
                        width: '100%',
                        border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }}
                />
            }
        },
        {
            field: 'amount',
            headerName: 'Amount',
            editable: true,
            type: 'number',
            width: 150,
            renderEditCell: (params) => {
                return <TextField
                    value={params.value}
                    onBlur={(e) => {
                        handleInputChange(Number(params.id) as number, 'amount', e.target.value)
                    }}
                    onChange={(e) => {
                        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
                    }}
                    sx={{
                        width: '100%',
                        border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }}
                />
            }
        },
        {
            field: 'type',
            headerName: 'Type',
            editable: true,
            type: 'singleSelect',
            valueOptions: ['income', 'expense'],
            width: 150,
            renderEditCell: (params) => {
                return <Select
                    value={params.value}
                    onChange={(e) => {
                        handleInputChange(params.id as number, 'type', e.target.value)
                        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
                    }}
                    sx={{
                        width: '100%',
                        border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        },
                        '& .MuiOutlinedInput-root.Mui-active .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        }
                    }}
                >
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                    <MenuItem value="savings">Savings</MenuItem>
                    <MenuItem value="investments">Investments</MenuItem>
                </Select>
            }
        },
        {
            field: 'category',
            headerName: 'Category',
            editable: true,
            type: 'singleSelect',
            valueOptions: ['salary', 'food', 'transport', 'utilities', 'entertainment', 'other'],
            width: 150,
            renderEditCell: (params) => {
                return <Select
                    value={params.value}
                    onChange={(e) => {
                        handleInputChange(params.id as number, 'category', e.target.value)
                        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })
                    }}
                    sx={{
                        width: '100%',
                        border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        },
                        '& .MuiOutlinedInput-root.Mui-active .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            outline: 'none'
                        }
                    }}
                >
                    <MenuItem value="salary">Salary</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="transport">Transport</MenuItem>
                    <MenuItem value="utilities">Utilities</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            }
        },
        {
            field: 'date',
            headerName: 'Date',
            valueGetter: (params: any) => {
                console.log(params);
                return params ? new Date(params) : null
            },
            editable: true,
            type: 'date',
            width: 150,
            renderEditCell: (params) => {
                return <DatePicker
                    selected={params.value}
                    onChange={(newValue: Date | null) => {
                        handleInputChange(params.id as number, 'date', newValue)
                        params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue })
                    }}
                    className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl"
                    wrapperClassName="MuiFormControl-root"
                    customInput={<TextField sx={{
                        width: '100%',
                        border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }} />}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select date"
                    popperPlacement="top"
                    popperProps={{
                        strategy: "fixed"
                    }}
                />
            }
        },
        
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <IconButton
                    size="small"
                    onClick={() => {
                        console.log('Delete transaction:', params.row.id);
                    }}
                    color="error"
                >
                    <DeleteIcon />
                </IconButton>
            )
        }
    ]

    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                    List Transactions
                </Typography>
                <Button variant="contained" color="primary" onClick={handleSaveEdits}>
                    Save Edits
                </Button>
            </Box>

            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    pageSizeOptions={[20]}                    
                    editMode="row"
                    rowHeight={60}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            display: 'flex',
                            alignItems: 'center',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            width: '100%'
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            width: '100%'
                        },
                        '& .MuiDataGrid-row': {
                            width: '100%'
                        }
                    }}
                    loading={loading}
                />
            </Box>
        </Box>
    );
}
