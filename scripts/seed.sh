cd services/CultureAPI
node ./lib/importArtworks.mjs && node ./lib/importMuseums.mjs

cd ../ratp
node ./lib/importStops.mjs
