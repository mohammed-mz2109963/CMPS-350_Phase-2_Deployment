-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "money_balance" INTEGER DEFAULT 0,
    "company_name" TEXT,
    "bank_account" TEXT,
    "contact_person_name" TEXT,
    "street" TEXT,
    "apartment_suite_number" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "mobile_number" TEXT
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "distance" REAL NOT NULL,
    "image_url" TEXT,
    "isSold" BOOLEAN NOT NULL DEFAULT false,
    "seller_id" INTEGER NOT NULL,
    CONSTRAINT "Product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buyer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "purchase_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
