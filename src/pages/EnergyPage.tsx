import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Country {
  code: string;
  name: string;
  customCities?: City[];
  units: string[];
}

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

interface EnergyData {
  temperature_C: number;
  windspeed_km_h: number;
}

const unitMap: Record<string, string> = {
  RO: "Unități: °C, km/h",
  AE: "Units: °C, km/h",
  AM: "Միավորներ: °C, կմ/ժ",
  AZ: "Vahidlər: °C, km/saat",
  AT: "Einheiten: °C, km/h",
  BE: "Unités: °C, km/h",
  CN: "单位: 摄氏度, 公里/小时",
  FR: "Unités: °C, km/h",
  IN: "यूनिट: °C, किमी/घंटा",
  IT: "Unità: °C, km/h",
  KZ: "Бірліктер: °C, км/сағ",
  MD: "Unități: °C, km/h",
  MC: "Unités: °C, km/h",
  JP: "単位: °C, km/h",
  PT: "Unidades: °C, km/h",
  ES: "Unidades: °C, km/h",
  KG: "Бөлүмдөр: °C, км/саат"
};


const EnergyPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [energy, setEnergy] = useState<EnergyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCountries([
      {
        code: "RO",
        name: "Romania",
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
          { name: "București", latitude: 44.4268, longitude: 26.1025 },
          { name: "Cluj-Napoca", latitude: 46.7712, longitude: 23.6236 },
          { name: "Timișoara", latitude: 45.7489, longitude: 21.2087 },
          { name: "Iași", latitude: 47.1585, longitude: 27.6014 },
          { name: "Constanța", latitude: 44.1598, longitude: 28.6348 },
          { name: "Craiova", latitude: 44.3302, longitude: 23.7949 },
          { name: "Brașov", latitude: 45.6580, longitude: 25.6012 },
          { name: "Galați", latitude: 45.4353, longitude: 28.0079 },
          { name: "Ploiești", latitude: 44.9401, longitude: 26.0234 },
          { name: "Oradea", latitude: 47.0722, longitude: 21.9211 },
          { name: "Brăila", latitude: 45.2653, longitude: 27.9595 },
          { name: "Arad", latitude: 46.1866, longitude: 21.3123 },
          { name: "Pitești", latitude: 44.8565, longitude: 24.8692 },
          { name: "Sibiu", latitude: 45.7983, longitude: 24.1256 },
          { name: "Bacău", latitude: 46.5679, longitude: 26.9138 },
          { name: "Târgu Mureș", latitude: 46.5405, longitude: 24.5626 },
          { name: "Baia Mare", latitude: 47.6597, longitude: 23.5795 },
          { name: "Buzău", latitude: 45.1517, longitude: 26.8231 },
          { name: "Botoșani", latitude: 47.7486, longitude: 26.6694 },
          { name: "Satu Mare", latitude: 47.7928, longitude: 22.8850 }
        ]
      },
      
      {
        code: "US",
        name: "Statele Unite",
        units: ["°F", "mph", "lb", "ft", "mile", "BTU"],
        customCities: [
          { name: "New York", latitude: 40.7128, longitude: -74.0060 },
          { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
          { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
          { name: "Houston", latitude: 29.7604, longitude: -95.3698 },
          { name: "Phoenix", latitude: 33.4484, longitude: -112.0740 },
          { name: "Philadelphia", latitude: 39.9526, longitude: -75.1652 },
          { name: "San Antonio", latitude: 29.4241, longitude: -98.4936 },
          { name: "San Diego", latitude: 32.7157, longitude: -117.1611 },
          { name: "Dallas", latitude: 32.7767, longitude: -96.7970 },
          { name: "San Jose", latitude: 37.3382, longitude: -121.8863 },
          { name: "Austin", latitude: 30.2672, longitude: -97.7431 },
          { name: "Jacksonville", latitude: 30.3322, longitude: -81.6557 },
          { name: "Fort Worth", latitude: 32.7555, longitude: -97.3308 },
          { name: "Columbus", latitude: 39.9612, longitude: -82.9988 },
          { name: "Charlotte", latitude: 35.2271, longitude: -80.8431 },
          { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
          { name: "Indianapolis", latitude: 39.7684, longitude: -86.1581 },
          { name: "Seattle", latitude: 47.6062, longitude: -122.3321 },
          { name: "Denver", latitude: 39.7392, longitude: -104.9903 },
          { name: "Washington", latitude: 38.9072, longitude: -77.0369 }
        ]
      },
       {code: "AE", name: "Emiratele Arabe Unite",
        units: ["°C", "km/h"],
        customCities: [
        { name: "Abu Dhabi", latitude: 24.4539, longitude: 54.3773 },
        { name: "Dubai", latitude: 25.2048, longitude: 55.2708 },
        { name: "Sharjah", latitude: 25.3463, longitude: 55.4209 }
      ]},
      { code: "AM", name: "Armenia", 
        units: ["°C", "км/ч"],
        customCities: [
        { name: "Yerevan", latitude: 40.1792, longitude: 44.4991 },
        { name: "Gyumri", latitude: 40.7894, longitude: 43.8476 },
        { name: "Vanadzor", latitude: 40.8128, longitude: 44.4883 }
      ]},
      { code: "AZ", name: "Azerbaidjan", 
        units: ["°C", "км/ч"],
        customCities: [
        { name: "Baku", latitude: 40.4093, longitude: 49.8671 },
        { name: "Ganja", latitude: 40.6828, longitude: 46.3606 },
        { name: "Sumqayit", latitude: 40.5897, longitude: 49.6686 }
      ]},
      { code: "AT", name: "Austria", 
        units: ["°C", "km/h"],
        customCities: [
        { name: "Vienna", latitude: 48.2082, longitude: 16.3738 },
        { name: "Graz", latitude: 47.0707, longitude: 15.4395 },
        { name: "Linz", latitude: 48.3069, longitude: 14.2858 }
      ]},
      { code: "BE", name: "Belgia",
        units: ["°C", "km/h"],
        customCities: [
        { name: "Bruxelles", latitude: 50.8503, longitude: 4.3517 },
        { name: "Antwerp", latitude: 51.2194, longitude: 4.4025 },
        { name: "Ghent", latitude: 51.0543, longitude: 3.7174 }
      ]},
      { code: "CN", name: "China",
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Beijing", latitude: 39.9042, longitude: 116.4074 },
        { name: "Shanghai", latitude: 31.2304, longitude: 121.4737 },
        { name: "Shenzhen", latitude: 22.5431, longitude: 114.0579 }
      ]},
      { code: "FR", name: "Franța",
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
        { name: "Lyon", latitude: 45.7640, longitude: 4.8357 },
        { name: "Marseille", latitude: 43.2965, longitude: 5.3698 }
      ]},
      { code: "IN", name: "India", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "New Delhi", latitude: 28.6139, longitude: 77.2090 },
        { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 },
        { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 }
      ]},
      { code: "IT", name: "Italia", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Milano", latitude: 45.4642, longitude: 9.1900 },
        { name: "Roma", latitude: 41.9028, longitude: 12.4964 },
        { name: "Napoli", latitude: 40.8518, longitude: 14.2681 }
      ]},
      { code: "KZ", name: "Kazahstan", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Almaty", latitude: 43.2220, longitude: 76.8512 },
        { name: "Astana", latitude: 51.1605, longitude: 71.4704 },
        { name: "Shymkent", latitude: 42.3417, longitude: 69.5901 }
      ]},
      { code: "MD", name: "Moldova", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Chișinău", latitude: 47.0105, longitude: 28.8638 },
        { name: "Bălți", latitude: 47.7594, longitude: 27.9289 },
        { name: "Tiraspol", latitude: 46.8427, longitude: 29.5961 }
      ]},
      { code: "MC", name: "Monaco", 
        units:  ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Monaco", latitude: 43.7384, longitude: 7.4246 }
      ]},
      { code: "JP", name: "Japonia", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
        { name: "Osaka", latitude: 34.6937, longitude: 135.5023 },
        { name: "Nagoya", latitude: 35.1815, longitude: 136.9066 }
      ]},
      { code: "PT", name: "Portugalia", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Lisabona", latitude: 38.7169, longitude: -9.1399 },
        { name: "Porto", latitude: 41.1496, longitude: -8.6109 },
        { name: "Coimbra", latitude: 40.2033, longitude: -8.4103 }
      ]},
      { code: "ES", name: "Spania", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
        { name: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
        { name: "Valencia", latitude: 39.4699, longitude: -0.3763 }
      ]},
      { code: "KG", name: "Kîrgîzstan", 
        units: ["°C", "km/h", "kg", "km", "kWh", "m²", "m³", "s"],
        customCities: [
        { name: "Bishkek", latitude: 42.8746, longitude: 74.5698 },
        { name: "Osh", latitude: 40.5136, longitude: 72.8161 },
        { name: "Jalal-Abad", latitude: 40.9333, longitude: 73.0000 }
      ]}
    ]);
  }, []);

  useEffect(() => {
    const found = countries.find(c => c.code === selectedCountry);
    if (found?.customCities) {
      setCities(found.customCities);
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const { latitude, longitude } = selectedCity;
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m`
        );

        const current = res.data.current;

        setEnergy({
          temperature_C: current.temperature_2m,
          windspeed_km_h: current.windspeed_10m
        });

        setLoading(false);
      } catch (err) {
        setError("Eroare la preluarea datelor meteo.");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">🌍 Selectează locația</h2>

      <select
        className="w-full p-2 border rounded"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          setCities([]);
          setSelectedCity(null);
          setEnergy(null);
        }}
      >
        <option value="">-- Alege o țară --</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      {cities.length > 0 && (
        <select
          className="w-full p-2 border rounded"
          value={selectedCity ? `${selectedCity.latitude},${selectedCity.longitude}` : ""}
          onChange={(e) => {
            const [lat, lon] = e.target.value.split(",").map(Number);
            const city = cities.find(c => c.latitude === lat && c.longitude === lon);
            setSelectedCity(city || null);
          }}
        >
          <option value="">Selectează un oraș</option>
          {cities.map((city) => (
            <option
              key={`${city.name}-${city.latitude}-${city.longitude}`}
              value={`${city.latitude},${city.longitude}`}
            >
              {city.name}
            </option>
          ))}
        </select>
      )}

      {energy && (
        <div className="bg-green-100 p-4 rounded space-y-2">
          <p><strong>🌡️ Temperatură:</strong> {energy.temperature_C} °C</p>
          <p><strong>🌬️ Viteza vântului:</strong> {energy.windspeed_km_h} km/h</p>
          {selectedCountry && countries.find(c => c.code === selectedCountry)?.units && (
            <div>
              <p className="text-sm text-gray-600">🔧 Unități utilizate:</p>
              <ul className="list-disc ml-5 text-sm">
                {countries.find(c => c.code === selectedCountry)?.units.map((u, idx) => (
                  <li key={idx}>✅ {u}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {loading && <p>Se încarcă...</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default EnergyPage;
