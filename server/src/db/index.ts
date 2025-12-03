
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from './schema.js';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });
const { assets } = schema;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/api/assets', async (_req, res) => {
  try {
    const allAssets = await db.select().from(assets);
    res.json(allAssets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});


app.get('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.select().from(assets).where(eq(assets.id, Number(id)));
    if (result.length === 0) return res.status(404).json({ error: "Asset not found" });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
});

app.post('/api/assets', async (req, res) => {
  try {
    const { itemType, serialNumber, status, purchaseDate } = req.body;
    const newAsset = await db.insert(assets).values({
      itemType,
      serialNumber,
      status,
      purchaseDate,
    }).returning();
    res.status(201).json(newAsset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
});

app.put('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { itemType, serialNumber, status, purchaseDate } = req.body;

   
    const updated = await db.update(assets)
      .set({ itemType, serialNumber, status, purchaseDate })
      .where(eq(assets.id, Number(id)))
      .returning();
      
    res.json(updated[0]);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: 'Failed to update asset' });
  }
});


app.delete('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(assets).where(eq(assets.id, Number(id)));
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});