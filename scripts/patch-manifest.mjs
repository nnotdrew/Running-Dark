// Adds location permissions to the generated Android manifest (needed for "My location").
import { readFileSync, writeFileSync } from "node:fs";

const path = "android/app/src/main/AndroidManifest.xml";
let xml = readFileSync(path, "utf8");
const perms = [
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
].filter(p => !xml.includes(p));

if (perms.length) {
  const lines = perms.map(p => `    <uses-permission android:name="${p}" />`).join("\n");
  xml = xml.replace("</manifest>", `${lines}\n</manifest>`);
  writeFileSync(path, xml);
  console.log(`Added ${perms.length} permission(s) to ${path}`);
} else {
  console.log("Location permissions already present");
}
