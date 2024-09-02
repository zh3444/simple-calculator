import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const Calculator = () => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculation = async (operation) => {
        const response = await fetch(`http://localhost:3001/${operation}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                number1: number1 || 0,
                number2: number2 || 0,
            }),
        });

        const data = await response.json();
        setResult(data.formattedResult);
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5, alignItems: 'center' }}>
                <Typography variant='h4'>
                    Fill up the 2 number input fields and press the add or subtract button to calculate the result
                </Typography>
                <TextField label="Number 1"
                    variant='outlined'
                    type='number'
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)} />
                <TextField label="Number 2"
                    variant='outlined'
                    type='number'
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value)} />
                <Button variant='contained'
                    color='primary'
                    sx={{ width: '40%' }}
                    onClick={() => { handleCalculation('add') }}>
                    Add
                </Button>
                <Button variant='contained'
                    color='secondary'
                    sx={{ width: '40%' }}
                    onClick={() => { handleCalculation('subtract') }}>
                    Subtract
                </Button>
                {result !== null && (
                    <Typography variant='h6'>
                        Result: {result}
                    </Typography>
                )}
            </Box>
        </Container>

    )
}

export default Calculator