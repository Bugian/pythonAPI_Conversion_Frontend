import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

const cityData: Record<string, City[]> = {
  Moldova: [
    { name: 'Cahul', latitude: 45.9, longitude: 28.2 },
    { name: 'Chișinău', latitude: 47.01, longitude: 28.86 },
    { name: 'Bălți', latitude: 47.76, longitude: 27.91 },
    { name: 'Tiraspol', latitude: 46.85, longitude: 29.6 },
    { name: 'Comrat', latitude: 46.3, longitude: 28.65 },
    { name: 'Orhei', latitude: 47.38, longitude: 28.82 },
    { name: 'Edineț', latitude: 48.17, longitude: 27.3 },
    { name: 'Căușeni', latitude: 46.64, longitude: 29.41 },
    { name: 'Strășeni', latitude: 47.14, longitude: 28.61 },
    { name: 'Hîncești', latitude: 46.82, longitude: 28.59 },
  ],
  Romania: [
    { name: 'București', latitude: 44.43, longitude: 26.1 },
    { name: 'Cluj-Napoca', latitude: 46.77, longitude: 23.6 },
    { name: 'Timișoara', latitude: 45.75, longitude: 21.23 },
    { name: 'Iași', latitude: 47.16, longitude: 27.58 },
    { name: 'Constanța', latitude: 44.17, longitude: 28.63 },
    { name: 'Brașov', latitude: 45.66, longitude: 25.61 },
    { name: 'Craiova', latitude: 44.32, longitude: 23.8 },
    { name: 'Galați', latitude: 45.44, longitude: 28.04 },
    { name: 'Ploiești', latitude: 44.94, longitude: 26.03 },
    { name: 'Oradea', latitude: 47.07, longitude: 21.92 },
  ],
    Germania: [
    { name: 'Berlin', latitude: 52.52, longitude: 13.405 },
    { name: 'Hamburg', latitude: 53.55, longitude: 10.0 },
    { name: 'München', latitude: 48.14, longitude: 11.58 },
    { name: 'Köln', latitude: 50.94, longitude: 6.96 },
    { name: 'Frankfurt', latitude: 50.11, longitude: 8.68 },
    { name: 'Stuttgart', latitude: 48.77, longitude: 9.17 },
    { name: 'Düsseldorf', latitude: 51.22, longitude: 6.77 },
    { name: 'Dortmund', latitude: 51.51, longitude: 7.46 },
    { name: 'Essen', latitude: 51.46, longitude: 7.01 },
    { name: 'Leipzig', latitude: 51.34, longitude: 12.38 },
  ],
    Italia: [
    { name: 'Roma', latitude: 41.89, longitude: 12.49 },
    { name: 'Milano', latitude: 45.46, longitude: 9.19 },
    { name: 'Napoli', latitude: 40.85, longitude: 14.27 },
    { name: 'Torino', latitude: 45.07, longitude: 7.69 },
    { name: 'Palermo', latitude: 38.12, longitude: 13.36 },
    { name: 'Genova', latitude: 44.41, longitude: 8.93 },
    { name: 'Bologna', latitude: 44.5, longitude: 11.34 },
    { name: 'Firenze', latitude: 43.77, longitude: 11.26 },
    { name: 'Bari', latitude: 41.12, longitude: 16.87 },
    { name: 'Catania', latitude: 37.5, longitude: 15.08 },
  ],
    Franța: [
    { name: 'Paris', latitude: 48.85, longitude: 2.35 },
    { name: 'Marseille', latitude: 43.3, longitude: 5.37 },
    { name: 'Lyon', latitude: 45.76, longitude: 4.84 },
    { name: 'Toulouse', latitude: 43.6, longitude: 1.44 },
    { name: 'Nice', latitude: 43.7, longitude: 7.27 },
    { name: 'Nantes', latitude: 47.22, longitude: -1.55 },
    { name: 'Strasbourg', latitude: 48.58, longitude: 7.75 },
    { name: 'Montpellier', latitude: 43.61, longitude: 3.87 },
    { name: 'Bordeaux', latitude: 44.84, longitude: -0.58 },
    { name: 'Lille', latitude: 50.63, longitude: 3.06 },
  ],
    Spania: [
    { name: 'Madrid', latitude: 40.42, longitude: -3.7 },
    { name: 'Barcelona', latitude: 41.38, longitude: 2.17 },
    { name: 'Valencia', latitude: 39.47, longitude: -0.38 },
    { name: 'Sevilla', latitude: 37.39, longitude: -5.99 },
    { name: 'Zaragoza', latitude: 41.65, longitude: -0.88 },
    { name: 'Málaga', latitude: 36.72, longitude: -4.42 },
    { name: 'Murcia', latitude: 37.99, longitude: -1.13 },
    { name: 'Palma', latitude: 39.57, longitude: 2.65 },
    { name: 'Las Palmas', latitude: 28.12, longitude: -15.43 },
    { name: 'Bilbao', latitude: 43.26, longitude: -2.93 },
  ],
    SUA: [
    { name: 'New York', latitude: 40.71, longitude: -74.01 },
    { name: 'Los Angeles', latitude: 34.05, longitude: -118.24 },
    { name: 'Chicago', latitude: 41.88, longitude: -87.63 },
    { name: 'Houston', latitude: 29.76, longitude: -95.37 },
    { name: 'Phoenix', latitude: 33.45, longitude: -112.07 },
    { name: 'Philadelphia', latitude: 39.95, longitude: -75.17 },
    { name: 'San Antonio', latitude: 29.42, longitude: -98.49 },
    { name: 'San Diego', latitude: 32.72, longitude: -117.16 },
    { name: 'Dallas', latitude: 32.78, longitude: -96.8 },
    { name: 'San Jose', latitude: 37.33, longitude: -121.89 },
  ],
    China: [
    { name: 'Beijing', latitude: 39.91, longitude: 116.4 },
    { name: 'Shanghai', latitude: 31.23, longitude: 121.47 },
    { name: 'Guangzhou', latitude: 23.13, longitude: 113.27 },
    { name: 'Shenzhen', latitude: 22.55, longitude: 114.09 },
    { name: 'Chengdu', latitude: 30.67, longitude: 104.06 },
    { name: 'Wuhan', latitude: 30.59, longitude: 114.3 },
    { name: 'Tianjin', latitude: 39.12, longitude: 117.2 },
    { name: 'Hangzhou', latitude: 30.27, longitude: 120.15 },
    { name: 'Nanjing', latitude: 32.06, longitude: 118.78 },
    { name: 'Chongqing', latitude: 29.56, longitude: 106.55 },
  ],
    Japonia: [
    { name: 'Tokyo', latitude: 35.68, longitude: 139.76 },
    { name: 'Yokohama', latitude: 35.45, longitude: 139.64 },
    { name: 'Osaka', latitude: 34.69, longitude: 135.5 },
    { name: 'Nagoya', latitude: 35.18, longitude: 136.91 },
    { name: 'Sapporo', latitude: 43.07, longitude: 141.35 },
    { name: 'Fukuoka', latitude: 33.59, longitude: 130.41 },
    { name: 'Kobe', latitude: 34.69, longitude: 135.19 },
    { name: 'Kyoto', latitude: 35.01, longitude: 135.77 },
    { name: 'Sendai', latitude: 38.26, longitude: 140.88 },
    { name: 'Hiroshima', latitude: 34.39, longitude: 132.45 },
  ],
    India: [
    { name: 'Mumbai', latitude: 19.08, longitude: 72.88 },
    { name: 'Delhi', latitude: 28.61, longitude: 77.21 },
    { name: 'Bangalore', latitude: 12.97, longitude: 77.59 },
    { name: 'Hyderabad', latitude: 17.38, longitude: 78.48 },
    { name: 'Ahmedabad', latitude: 23.03, longitude: 72.58 },
    { name: 'Chennai', latitude: 13.08, longitude: 80.27 },
    { name: 'Kolkata', latitude: 22.57, longitude: 88.36 },
    { name: 'Pune', latitude: 18.52, longitude: 73.86 },
    { name: 'Jaipur', latitude: 26.91, longitude: 75.79 },
    { name: 'Lucknow', latitude: 26.85, longitude: 80.95 },
  ],

};

const EnergyPage = () => {
  const [countries] = useState<string[]>(Object.keys(cityData));
  const [selectedCountry, setSelectedCountry] = useState<string>('Moldova');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [energy, setEnergy] = useState<{ temperature_C: number; windspeed_km_h: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);


  useEffect(() => {
    setCities(cityData[selectedCountry] || []);
    setSelectedCity(null);
    setEnergy(null);
    setError(null);
  }, [selectedCountry]);

  const fetchWeather = async (city: City) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,windspeed_10m`
      );
      const current = res.data.current;
      setEnergy({
        temperature_C: current.temperature_2m,
        windspeed_km_h: current.windspeed_10m,
      });
    } catch (err) {
      setError('Eroare la preluarea datelor meteo.');
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = async () => {
    setError(null);
    try {
      const res = await axios.get("http://api.exchangeratesapi.io/v1/latest", {
        params: {
          access_key: "4357e0de1cd6ecc174038c083cb58798",
          symbols: `${fromCurrency},${toCurrency}`
        }
      });

      const rates = res.data?.rates;

      const rateFrom = rates[fromCurrency];
      const rateTo = rates[toCurrency];

      if (rateFrom && rateTo) {
        const result = amount * (rateTo / rateFrom);
        setConvertedAmount(Number(result.toFixed(2)));
      } else {
        setError("Cursul valutar nu a fost găsit pentru moneda selectată.");
        setConvertedAmount(null);
      }
    } catch (err) {
      console.error(err);
      setError("Eroare la preluarea cursului valutar.");
      setConvertedAmount(null);
    }
  };






  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">🌍 Selectează o țară și un oraș</h2>

      <select
        className="w-full p-2 border rounded"
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {cities.length > 0 && (
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            const selected = cities.find((city) => city.name === e.target.value);
            setSelectedCity(selected || null);
            if (selected) {
              fetchWeather(selected);
            }
          }}
        >
          <option value="">-- Alege un oraș --</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      )}

      {energy && (
        <div className="bg-green-100 p-4 rounded space-y-2">
          <p>
            <strong>🌡️ Temperatură:</strong> {energy.temperature_C} °C
          </p>
          <p>
            <strong>🌬️ Viteza vântului:</strong> {energy.windspeed_km_h} km/h
          </p>

          <div className="bg-blue-100 p-4 rounded space-y-2">
            <h3 className="font-semibold">💱 Convertor Valutar</h3>

            <div className="flex space-x-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="p-2 border rounded w-24"
              />

              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="p-2 border rounded"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>RON</option>
                <option>MDL</option>
                <option>INR</option>
                <option>JPY</option>
                <option>CNY</option>
              </select>

              <span className="self-center">→</span>

              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="p-2 border rounded"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>RON</option>
                <option>MDL</option>
                <option>INR</option>
                <option>JPY</option>
                <option>CNY</option>
              </select>
            </div>

            <button
              onClick={convertCurrency}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Convertește
            </button>

            {convertedAmount !== null && (
              <p className="font-medium">
                💰 Rezultat: {convertedAmount} {toCurrency}
              </p>
            )}
          </div>
        </div> 
      )}

      {loading && <p>Se încarcă datele meteo...</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default EnergyPage;
