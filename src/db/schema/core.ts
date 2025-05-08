// src/db/schema/core.ts
import {
    pgTable,
    uuid,
    text,
    numeric,
    integer,
    timestamp,
    boolean,
    jsonb,
    primaryKey,
} from "drizzle-orm/pg-core";
  
/* ────────────────────────────────
   Master Data
──────────────────────────────────*/

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  sku: text("sku").unique().notNull(),
  name: text("name").notNull(),
  category: text("category"),
  purchasePrice: numeric("purchase_price").notNull(),
  sellPrice: numeric("sell_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const suppliers = pgTable("suppliers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  contact: text("contact"),
  leadTimeDays: integer("lead_time_days").default(7),
});

/* ────────────────────────────────
   Locations & Inventory
──────────────────────────────────*/

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address"),
});

export const inventoryByLocation = pgTable(
  "inventory_by_location",
  {
    productId: uuid("product_id")
      .references(() => products.id)
      .notNull(),
    locationId: uuid("location_id")
      .references(() => locations.id)
      .notNull(),
    qtyOnHand: integer("qty_on_hand").default(0),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.locationId),
  })
);

/* ────────────────────────────────
   Sales & Returns
──────────────────────────────────*/

export const sales = pgTable("sales", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  locationId: uuid("location_id")
    .references(() => locations.id)
    .notNull(),
  qtySold: integer("qty_sold").notNull(),
  salePrice: numeric("sale_price").notNull(),
  soldBy: uuid("sold_by"), // user ID
  createdAt: timestamp("created_at").defaultNow(),
  isReturn: boolean("is_return").default(false),
});

/* ────────────────────────────────
   Purchase Orders & Receiving
──────────────────────────────────*/

export const purchaseOrders = pgTable("purchase_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  supplierId: uuid("supplier_id")
    .references(() => suppliers.id)
    .notNull(),
  status: text("status").default("issued"), // issued | received | cancelled
  eta: timestamp("eta"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const poItems = pgTable(
  "po_items",
  {
    poId: uuid("po_id")
      .references(() => purchaseOrders.id)
      .notNull(),
    productId: uuid("product_id")
      .references(() => products.id)
      .notNull(),
    qtyOrdered: integer("qty_ordered").notNull(),
    unitCost: numeric("unit_cost").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.poId, t.productId),
  })
);

/* ────────────────────────────────
   Price History & Audit Logs
──────────────────────────────────*/

export const priceHistory = pgTable("price_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  oldPrice: numeric("old_price").notNull(),
  newPrice: numeric("new_price").notNull(),
  changedAt: timestamp("changed_at").defaultNow(),
  changedBy: uuid("changed_by"),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableName: text("table").notNull(),
  rowId: uuid("row_id"),
  action: text("action").notNull(), // insert | update | delete
  payload: jsonb("payload"),
  performedBy: uuid("performed_by"),
  ts: timestamp("ts").defaultNow(),
});
  