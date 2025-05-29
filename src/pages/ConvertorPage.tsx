import React, { useState } from 'react';
import axios from 'axios';

const conversionOptions: Record<string, string[]> = {
  mass: ["kg", "g", "mg", "pound", "ounce", "ton", "stone"],
  length: ["km", "m", "cm", "mm", "mile", "yard", "foot", "inch", "nautical_mile"],
  energy: ["kW", "W", "MW", "J", "Wh", "kcal", "cal", "BTU"],
  temperature: ["celsius", "kelvin", "fahrenheit"],
  area: ["sqm", "sqkm", "sqft", "sqinch", "acre", "hectare"],
  volume: ["liter", "ml", "gallon", "cubic_meter", "cubic_cm", "pint"],
  speed: ["kmh", "mph", "ms", "knot"],
  time: ["second", "minute", "hour", "day", "week", "year"]
};


const ConvertorPage = () => {
  const [type, setType] = useState("mass");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [value, setValue] = useState<number | "">("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/convert", {
        type,
        from: fromUnit,
        to: toUnit,
        value: Number(value)
      });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.description || "Eroare la conversie");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Convertor de unități</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Tip */}
        <div>
          <label className="block font-medium">Tip unitate</label>
          <select 
          className="w-full p-2 border rounded" 
          value={type} 
          onChange={(e) => {
            const newType = e.target.value;
            setType(newType);
            setFromUnit("");
            setToUnit("");
          }}
          >
            {Object.keys(conversionOptions).map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
          </select>
        </div>

        {/* Din */}
        <div>
          <label className="block font-medium">Din unitate</label>
          <select
            className="w-full p-2 border rounded"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            <option value="">Selectează...</option>
            {conversionOptions[type].map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* În */}
        <div>
          <label className="block font-medium">În unitate</label>
          <select
            className="w-full p-2 border rounded"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            <option value="">Selectează...</option>
            {conversionOptions[type].map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Valoare */}
        <div>
          <label className="block font-medium">Valoare</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            placeholder="Ex: 2"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Convertește
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-green-100">
          <p>
            <strong>Rezultat:</strong> {result.original.value} {result.original.unit} ={" "}
            {result.converted.value} {result.converted.unit}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 border rounded bg-red-100 text-red-800">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ConvertorPage;
