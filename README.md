# Blindspot

Driving routes that avoid ALPR cameras (Flock and others) mapped in OpenStreetMap, the dataset DeFlock displays. A Capacitor app: the UI is `www/index.html`, wrapped in a native Android shell.

## Option A: build the APK on GitHub (no Android Studio needed)

1. Create a new GitHub repo and push this folder to `main`.
2. Open the repo's **Actions** tab. The **Build APK** workflow runs on every push (or start it by hand with **Run workflow**). It takes about 5 minutes.
3. Open the finished run and download **blindspot-debug-apk** under Artifacts. It's a zip containing `app-debug.apk`.
4. Install it on your phone (see "Installing" below).

## Option B: build locally with Android Studio

Requires Node 20+, JDK 21 and Android Studio.

```bash
npm install
npm run build
npm run android:add      # generates android/ and adds location permissions
npx cap sync android
npm run android:open     # opens Android Studio; press Run with your phone plugged in
```

After changing `www/index.html`, run `npm run android:sync` and Run again.

## Installing

- **Over USB:** enable Developer options and USB debugging on the phone, then `adb install -r app-debug.apk`.
- **On the phone:** copy the APK over, tap it, and allow "Install unknown apps" for your file manager when Android asks.

Debug builds are signed with a throwaway debug key, which is fine for testing. For a release build you'd generate your own keystore and run `./gradlew assembleRelease`.

## Testing in a browser first

`npm run build && npm run serve`, then open http://localhost:8080. Everything works except the Android-only parts: the share sheet and launching the Maps app.

## Services used

| What | Service | Notes |
|---|---|---|
| Camera locations | Overpass API (OpenStreetMap) | `node["surveillance:type"="ALPR"]` |
| Address search | Nominatim | 1 request/second limit |
| Routing (default) | OSRM public demo server | Free, light use only |
| Routing (optional) | Google Routes API | Needs your API key; billed per request |
| Map tiles | tile.openstreetmap.org | Fine for testing; switch to a commercial tile provider if you distribute the app |
