/*
  Warnings:

  - You are about to drop the column `municipality` on the `GeoSpatialData` table. All the data in the column will be lost.
  - Added the required column `observationSite` to the `GeoSpatialData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orden` to the `SpecimenInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GeoSpatialData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coordinates" TEXT NOT NULL,
    "observationSite" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "locality" TEXT NOT NULL
);
INSERT INTO "new_GeoSpatialData" ("coordinates", "id", "locality", "province") SELECT "coordinates", "id", "locality", "province" FROM "GeoSpatialData";
DROP TABLE "GeoSpatialData";
ALTER TABLE "new_GeoSpatialData" RENAME TO "GeoSpatialData";
CREATE TABLE "new_SpecimenInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scientificName" TEXT NOT NULL,
    "genus" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "orden" TEXT NOT NULL
);
INSERT INTO "new_SpecimenInfo" ("family", "genus", "id", "scientificName") SELECT "family", "genus", "id", "scientificName" FROM "SpecimenInfo";
DROP TABLE "SpecimenInfo";
ALTER TABLE "new_SpecimenInfo" RENAME TO "SpecimenInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
