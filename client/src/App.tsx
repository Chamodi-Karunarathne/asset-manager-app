import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssetList from './AssetList';
import AddAsset from './AddAsset';
import EditAsset from './EditAsset'; // Import the new page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AssetList />} />
        <Route path="/add" element={<AddAsset />} />
        
        {/* Add this route. :id allows us to capture the asset ID */}
        <Route path="/edit/:id" element={<EditAsset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;