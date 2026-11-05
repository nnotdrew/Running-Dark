// Copies Leaflet from node_modules into www/vendor so the app works without a CDN.
import { cpSync, mkdirSync } from "node:fs";

const src = "node_modules/leaflet/dist";
const dest = "www/vendor/leaflet";
mkdirSync(dest, { recursive: true });
for (const f of ["leaflet.js", "leaflet.css"]) cpSync(`${src}/${f}`, `${dest}/${f}`);
cpSync(`${src}/images`, `${dest}/images`, { recursive: true });
console.log(`Copied Leaflet to ${dest}`);
