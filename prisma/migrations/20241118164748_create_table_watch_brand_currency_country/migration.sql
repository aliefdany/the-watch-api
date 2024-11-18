-- CreateTable
CREATE TABLE "Watch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "reference_number" TEXT NOT NULL,
    "retail_price" INTEGER NOT NULL,
    "release_date" DATETIME NOT NULL,
    "brandId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    CONSTRAINT "Watch_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Watch_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Watch_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
