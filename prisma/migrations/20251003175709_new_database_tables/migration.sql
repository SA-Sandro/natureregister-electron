-- CreateTable
CREATE TABLE "SpecimenObservation" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "specimenInfoId" INTEGER NOT NULL,
    "observedAt" TEXT NOT NULL,
    "geoSpatialDataId" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "SpecimenObservation_specimenInfoId_fkey" FOREIGN KEY ("specimenInfoId") REFERENCES "SpecimenInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SpecimenObservation_geoSpatialDataId_fkey" FOREIGN KEY ("geoSpatialDataId") REFERENCES "GeoSpatialData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpecimenInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scientificName" TEXT NOT NULL,
    "genus" TEXT NOT NULL,
    "family" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GeoSpatialData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coordinates" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "locality" TEXT NOT NULL
);
