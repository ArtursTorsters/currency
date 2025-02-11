const Select = ({ selectedCurrency, onCurrencyChange }) => {
    const currencies = ["USD", "AUD", "GBP"];

    return (
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="border rounded p-2"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            EUR to {currency}
          </option>
        ))}
      </select>
    );
  };

  export default Select;
