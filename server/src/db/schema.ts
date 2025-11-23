import { pgTable, serial, text, date, varchar } from 'drizzle-orm/pg-core';

export const assets = pgTable('assets', {
  id: serial('id').primaryKey(), // Maps to ItemId
  itemType: varchar('item_type', { length: 255 }).notNull(),
  serialNumber: varchar('serial_number', { length: 255 }).unique().notNull(),
  status: text('status').notNull(), // e.g., "damaged", "working"
  purchaseDate: date('purchase_date').notNull(),
});

// Type inference for usage in API
export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;