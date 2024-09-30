/*
  Warnings:

  - A unique constraint covering the columns `[street,city,postCode,country]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_street_city_postCode_country_key" ON "Address"("street", "city", "postCode", "country");
