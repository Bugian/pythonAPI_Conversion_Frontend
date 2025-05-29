import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then(response => setRates(response.data.rates))
      .catch(error => console.error('Eroare la preluarea cursurilor:', error));
  }, [fromCurrency]);

  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount(parseFloat((amount * rates[toCurrency]).toFixed(2)));
    }
  }, [rates, toCurrency, amount]);

  return (
    <div>
      <h2>Convertor Valutar</h2>
      <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
        {Object.keys(rates).map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <span> către </span>
      <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
        {Object.keys(rates).map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <h3>Rezultat: {convertedAmount} {toCurrency}</h3>
    </div>
  );
};

export default CurrencyConverter;
