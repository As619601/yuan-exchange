import { useState } from 'react';

export type Currency = 'THB' | 'CNY';

export const useExchange = (initialRate = 5.05) => {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<Currency>('THB');
  const [toCurrency, setToCurrency] = useState<Currency>('CNY');
  const [exchangeRate] = useState<number>(initialRate);

  // 🧮 ลอจิกค่าธรรมเนียม: ต่ำกว่า 1000 เก็บ 50 บาท (เฉพาะตอนส่งเป็น THB น่อ)
  const fee = (fromCurrency === 'THB' && amount < 1000 && amount > 0) ? 50 : 0;

  // 🧮 คำนวณยอดสุทธิหลังหักค่าธรรมเนียม
  const netAmount = amount > fee ? amount - fee : 0;

  // 🧮 คำนวณผลลัพธ์การแลกเปลี่ยน
  const result = fromCurrency === toCurrency 
    ? netAmount 
    : fromCurrency === 'THB' 
      ? netAmount / exchangeRate 
      : netAmount * exchangeRate;

  const swapCurrency = () => {
    const prevFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(prevFrom);
  };

  return {
    amount, setAmount,
    fromCurrency, setFromCurrency,
    toCurrency, setToCurrency,
    exchangeRate,
    fee,
    result,
    swapCurrency
  };
};