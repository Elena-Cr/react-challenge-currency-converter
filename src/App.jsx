// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [currencyInput, setCurrencyInput] = useState("USD");
  const [currencyOutput, setCurrencyOutput] = useState("USD");
  const [value, setValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  useEffect(
    function () {
      async function fetchConvertionValue() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${value}&from=${currencyInput}&to=${currencyOutput}`,
          );
          const data = await res.json();
          setConvertedValue(data.rates[currencyOutput]);
        } catch (err) {
          console.error(err);
        }
      }
      fetchConvertionValue();
    },
    [currencyInput, currencyOutput, value],
  );

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <select
        value={currencyInput}
        onChange={(e) => setCurrencyInput(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyOutput}
        onChange={(e) => setCurrencyOutput(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedValue}</p>
    </div>
  );
}
