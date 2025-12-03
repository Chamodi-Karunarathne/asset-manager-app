import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Asset } from './types';
import './App.css';

const statusToClass = (status: string) => status.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function AssetList() {
  const [assets, setAssets] = useState<Asset[]>([]);

  const fetchAssets = () => {
    fetch('http://localhost:5000/api/assets')
      .then((res) => res.json())
      .then((data) => setAssets(data));
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  
  const handleDelete = async (id: number) => {
    
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    
    await fetch(`http://localhost:5000/api/assets/${id}`, {
      method: 'DELETE',
    });

    
    fetchAssets();
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <p className="eyebrow">Main Dashboard</p>
          <h1>Asset Manager</h1>
        </div>
        <Link to="/add" className="primary-btn">
          + Add Asset
        </Link>
      </div>

      <div className="table-card">
        <table className="asset-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Type</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Purchase Date</th>
            <th>Actions</th> {/* New Header */}
          </tr>
        </thead>
        <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.itemType}</td>
                <td>
                  <span className="serial-chip">{asset.serialNumber}</span>
                </td>
                <td>
                  <span className={`status-pill status-${statusToClass(asset.status)}`}>
                    {asset.status}
                  </span>
                </td>
                <td>{new Date(asset.purchaseDate).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/edit/${asset.id}`} className="icon-btn" aria-label={`Edit asset ${asset.id}`}>
                      <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <button
                      type="button"
                      className="icon-btn danger"
                      onClick={() => handleDelete(asset.id)}
                      aria-label={`Delete asset ${asset.id}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssetList;