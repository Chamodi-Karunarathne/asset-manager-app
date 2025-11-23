import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Asset } from './types';
import './App.css';

function EditAsset() {
  const { id } = useParams(); // Get ID from URL (e.g. /edit/5)
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    itemType: '',
    serialNumber: '',
    status: 'In Stock',
    purchaseDate: ''
  });

  // 1. Load existing data when page opens
  useEffect(() => {
    fetch('http://localhost:5000/api/assets') // In a real app, you'd fetch just one item: /api/assets/${id}
      .then(res => res.json())
      .then((data: Asset[]) => {
        const found = data.find(a => a.id === Number(id));
        if (found) {
          // Convert date to YYYY-MM-DD for the input field
          const formattedDate = new Date(found.purchaseDate).toISOString().split('T')[0];
          setForm({ ...found, purchaseDate: formattedDate });
        }
      });
  }, [id]);

  // 2. Handle Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/assets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    navigate('/'); // Go back to list
  };

  return (
    <div className="container">
      <h2>✏️ Edit Asset</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <label>Item Type</label>
        <input value={form.itemType} onChange={e => setForm({...form, itemType: e.target.value})} required />
        
        <label>Serial Number</label>
        <input value={form.serialNumber} onChange={e => setForm({...form, serialNumber: e.target.value})} required />
        
        <label>Status</label>
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option>Damaged</option>
          <option>Working</option>
          <option>Under Maintenance</option>
          <option>Disposed</option>
        </select>
        
        <label>Purchase Date</label>
        <input type="date" value={form.purchaseDate} onChange={e => setForm({...form, purchaseDate: e.target.value})} required />
        
        <button type="submit" style={{ background: '#009879', color: 'white', padding: '10px', border:'none', cursor: 'pointer' }}>
          Update Asset
        </button>
      </form>
    </div>
  );
}

export default EditAsset;