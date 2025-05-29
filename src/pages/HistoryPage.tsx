import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Conversion {
  id: number;
  original: { value: number; unit: string };
  converted: { value: number; unit: string };
}

const HistoryPage = () => {
  const [history, setHistory] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://pythonapi-conversion-backend.onrender.com/convert")
      .then(res => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Nu s-a putut obține istoricul.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Istoric conversii</h2>

      {loading && <p>Se încarcă...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-3">
        {history.map((conv) => (
          <li key={conv.id} className="border p-3 rounded bg-gray-100">
            <p><strong>{conv.original.value} {conv.original.unit}</strong> → <strong>{conv.converted.value} {conv.converted.unit}</strong></p>
            <p className="text-sm text-gray-600">ID: {conv.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
