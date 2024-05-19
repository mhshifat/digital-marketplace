CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"category" text NOT NULL,
	"price" integer NOT NULL,
	"summary" text NOT NULL,
	"description" text DEFAULT '',
	"images" text DEFAULT '',
	"file" text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripe_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"user_id" text NOT NULL,
	"connected" text NOT NULL,
	"test" text NOT NULL
);
