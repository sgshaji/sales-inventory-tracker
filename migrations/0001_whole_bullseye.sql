CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"table" text NOT NULL,
	"row_id" uuid,
	"action" text NOT NULL,
	"payload" jsonb,
	"performed_by" uuid,
	"ts" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "po_items" (
	"po_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"qty_ordered" integer NOT NULL,
	"unit_cost" numeric NOT NULL,
	CONSTRAINT "po_items_po_id_product_id_pk" PRIMARY KEY("po_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "price_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"old_price" numeric NOT NULL,
	"new_price" numeric NOT NULL,
	"changed_at" timestamp DEFAULT now(),
	"changed_by" uuid
);
--> statement-breakpoint
CREATE TABLE "purchase_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_id" uuid NOT NULL,
	"status" text DEFAULT 'issued',
	"eta" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"contact" text,
	"lead_time_days" integer DEFAULT 7
);
--> statement-breakpoint
ALTER TABLE "inventory_by_location" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory_by_location" ALTER COLUMN "location_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "location_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory_by_location" ADD CONSTRAINT "inventory_by_location_product_id_location_id_pk" PRIMARY KEY("product_id","location_id");--> statement-breakpoint
ALTER TABLE "inventory_by_location" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "is_return" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "po_items" ADD CONSTRAINT "po_items_po_id_purchase_orders_id_fk" FOREIGN KEY ("po_id") REFERENCES "public"."purchase_orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "po_items" ADD CONSTRAINT "po_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;