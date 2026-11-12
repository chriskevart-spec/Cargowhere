# Prompts Log

This document records the user prompts provided during the development of the ParkSG Live application.

---

### Prompt 1: Initial Application Specification

```text
build a singapore based carpark app that track real time availability and parking rates for drivers. build just the frontend for now. i will integrate the backend later
```

**Delivered:**
- Built comprehensive Singapore carpark directory covering HDB, URA, and major shopping mall venues.
- Interactive custom vector Singapore island map with expressway corridors (PIE, CTE, AYE, ECP) and real-time occupancy pins.
- Parking fee calculator with duration presets, grace period logic, and nearby price comparison.
- Driver utilities: Find My Parked Car memo with running meter, and live ERP 2.0 gantry radar.

---

### Prompt 2: Remote Git Push

```text
git push https://<GITHUB_PAT>@github.com/chriskevart-spec/Cargowhere.git
```
*(Token redacted for security hygiene)*

**Delivered:**
- Initialized local Git repository with `main` branch.
- Committed initial codebase and configured remote origin tracking.
- Successfully pushed initial commit (`2361538`) to GitHub.

---

### Prompt 3: LTA DataMall Serverless Connection

```text
1. add a serverless connection that pulls live data from LTA's datamall using the following endpoint:

# Live carpark lots (HDB, LTA and URA):
https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2

# Every request needs the header:  AccountKey: <LTA_ACCOUNT_KEY>

2. store this in /api folder at project root level (not the src file)

3. include /health.ts and /carparkavailabilty.ts within the same subfolder

4. do not hardcode any key, i will input them later
```

**Delivered:**
- Created root-level `/api` folder.
- Implemented `/api/health.ts` for service and environment health checks.
- Implemented `/api/carparkavailabilty.ts` (and alias `/api/carparkavailability.ts`) serverless handler pulling from LTA DataMall with dynamic `AccountKey` header injection and 60-second in-memory caching.
- Created `server.ts` mounting Vite in dev mode and Express proxy routes.
- Documented `LTA_ACCOUNT_KEY` in `.env.example` without hardcoding credentials.
- Committed and pushed commit (`c996526`) to GitHub.

---

### Prompt 4: Prompts Collation

```text
collate all of the prompts and store them as a prompts.md file
```

**Delivered:**
- Generated `prompts.md` documenting chronological prompts and deliverables.
