import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- The tool to change pages
import './App.css';

function AddAsset() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemType: '',
    serialNumber: '',
    status: 'In Stock',
    purchaseDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Send to Backend
    await fetch('http://localhost:5000/api/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    // 2. Redirect back to Home Page
    navigate('/'); 
  };

  return (
    <div className="container form-container">
      <div className="form-card">
        <p className="eyebrow">New Entry</p>
        <h2>Add New Asset</h2>
        <form onSubmit={handleSubmit} className="asset-form">
          <input 
          placeholder="Item Type" 
          value={form.itemType} 
          onChange={e => setForm({...form, itemType: e.target.value})} 
          required 
        />
        <input 
          placeholder="Serial Number" 
          value={form.serialNumber} 
          onChange={e => setForm({...form, serialNumber: e.target.value})} 
          required 
        />
        <select 
          value={form.status} 
          onChange={e => setForm({...form, status: e.target.value})}
        >
          <option>Damaged</option>
          <option>Working</option>
          <option>Under Maintenance</option>
          <option>Disposed</option>
        </select>
        <input 
          type="date" 
          value={form.purchaseDate} 
          onChange={e => setForm({...form, purchaseDate: e.target.value})} 
          required 
        />
        <button type="submit" className="primary-btn block">
          Save & Return
        </button>
      </form>
      </div>
    </div>
  );
}

export default AddAsset;