import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Converter() {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        axios.get('https://v6.exchangerate-api.com/v6/b8b5de481f50a1ca8ed652ef/latest/USD')
            .then(res => {
                setRates(res.data.conversion_rates);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (rates) {
            setConvertedAmount((amount * rates[toCurrency] / rates[fromCurrency]).toFixed(2));
        }
    }, [amount, fromCurrency, toCurrency, rates]);

    const handleAmountChange = e => {
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = e => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = e => {
        setToCurrency(e.target.value);
    };

    const handleSwapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };

    return (
        <div className="converter">
            <h2 className="converter-title">Конвертация валют</h2>
            <div className="converter-inputs">
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                    {Object.keys(rates).map(currency => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <button onClick={handleSwapCurrencies}>Смена валюты</button>
                <select value={toCurrency} onChange={handleToCurrencyChange}>
                    {Object.keys(rates).map(currency => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <h3 className="result">{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h3>
        </div>
    );
}

export default Converter;
