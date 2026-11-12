import { Carpark } from '../types/carpark';

export const SINGAPORE_CARPARKS: Carpark[] = [
  // ORCHARD ROAD
  {
    id: 'ion-orchard',
    carparkNo: 'ION-01',
    name: 'ION Orchard Carpark',
    address: '2 Orchard Turn, Singapore 238801',
    postalCode: '238801',
    agency: 'MALL',
    structure: 'Basement',
    region: 'Orchard',
    coordinates: {
      lat: 1.3040,
      lng: 103.8318,
      mapX: 47.8,
      mapY: 62.1
    },
    lots: {
      car: { total: 580, available: 168 },
      motorcycle: { total: 60, available: 22 },
      ev: {
        totalLots: 12,
        availableLots: 5,
        providers: ['SP Mobility', 'Charge+'],
        powerKw: 50,
        plugTypes: ['Type 2', 'CCS2'],
        chargingRatePerKwh: 0.65
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Thu: $3.27 for 1st hr, $1.64 per subseq 30 mins (8am - 4:59pm)',
        baseMinutes: 60,
        baseRate: 3.27,
        subsequentMinutes: 30,
        subsequentRate: 1.64,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 4.90
      },
      weekdayEvening: {
        description: 'Mon - Thu: $4.90 per entry (5pm - 7:59am next day)',
        baseMinutes: 60,
        baseRate: 4.90,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 4.90
      },
      saturday: {
        description: 'Sat & Sun: $4.36 for 1st hr, $2.18 per subseq 30 mins (8am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 4.36,
        subsequentMinutes: 30,
        subsequentRate: 2.18,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 4.90
      },
      sundayPH: {
        description: 'Sun & PH: $4.36 1st hr, $2.18 subseq 30 mins; $4.90/entry after 6pm',
        baseMinutes: 60,
        baseRate: 4.36,
        subsequentMinutes: 30,
        subsequentRate: 2.18,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 4.90
      },
      motorcyclePerEntry: 2.20
    },
    gracePeriodMin: 10,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'NETS FlashPay', 'Credit Card In-App'],
    nearestMrt: {
      name: 'Orchard MRT (NS22/TE14)',
      line: 'North-South / Thomson-East Coast Line',
      walkingMinutes: 2
    },
    amenities: ['EV Fast Charging', 'Direct Mall Lift Access', 'Handicapped Accessible', 'Valet Parking'],
    erpHit: {
      gantryName: 'Orchard Link Cordon',
      currentRate: 1.00,
      distanceMeters: 180,
      operationalWindow: '12:00pm - 8:00pm'
    },
    lastUpdated: '2026-11-12T09:10:00+08:00'
  },
  {
    id: 'ngee-ann-city',
    carparkNo: 'NAC-01',
    name: 'Ngee Ann City (Takashimaya)',
    address: '391 Orchard Road, Singapore 238873',
    postalCode: '238873',
    agency: 'MALL',
    structure: 'Basement',
    region: 'Orchard',
    coordinates: {
      lat: 1.3025,
      lng: 103.8346,
      mapX: 48.6,
      mapY: 62.4
    },
    lots: {
      car: { total: 850, available: 312 },
      motorcycle: { total: 80, available: 41 },
      ev: {
        totalLots: 8,
        availableLots: 3,
        providers: ['CDG ENGIE'],
        powerKw: 22,
        plugTypes: ['Type 2'],
        chargingRatePerKwh: 0.60
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $2.80 1st hr, $1.40 per subseq 30 mins (12:01am - 5:00pm)',
        baseMinutes: 60,
        baseRate: 2.80,
        subsequentMinutes: 30,
        subsequentRate: 1.40,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 4.50
      },
      weekdayEvening: {
        description: 'Mon - Fri: $4.50 per entry after 5pm',
        baseMinutes: 60,
        baseRate: 4.50,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 4.50
      },
      saturday: {
        description: 'Sat: $4.00 1st hr, $2.00 per subseq 30 mins (12:01am - 5pm), $4.50/entry after',
        baseMinutes: 60,
        baseRate: 4.00,
        subsequentMinutes: 30,
        subsequentRate: 2.00,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 4.50
      },
      sundayPH: {
        description: 'Sun & PH: $4.00 1st hr, $2.00 per subseq 30 mins; $4.50/entry after 5pm',
        baseMinutes: 60,
        baseRate: 4.00,
        subsequentMinutes: 30,
        subsequentRate: 2.00,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 4.50
      },
      motorcyclePerEntry: 2.00
    },
    gracePeriodMin: 10,
    freeParkingScheme: false,
    heightClearanceMeters: 2.0,
    paymentMethods: ['Cashless EPS', 'NETS FlashPay', 'EZ-Link'],
    nearestMrt: {
      name: 'Orchard / Somerset MRT',
      line: 'North-South Line',
      walkingMinutes: 4
    },
    amenities: ['EV AC Chargers', 'Handicapped Lots', 'Car Detailing & Wash', 'Taxi Stand Attached'],
    erpHit: {
      gantryName: 'Bideford Road Gantry',
      currentRate: 0.00,
      distanceMeters: 220,
      operationalWindow: 'Off-peak'
    },
    lastUpdated: '2026-11-12T09:09:40+08:00'
  },
  {
    id: 'plaza-singapura',
    carparkNo: 'PS-01',
    name: 'Plaza Singapura & The Atrium',
    address: '68 Orchard Road, Singapore 238839',
    postalCode: '238839',
    agency: 'MALL',
    structure: 'Multi-Level & Basement',
    region: 'Orchard',
    coordinates: {
      lat: 1.3006,
      lng: 103.8450,
      mapX: 51.2,
      mapY: 62.7
    },
    lots: {
      car: { total: 720, available: 89 },
      motorcycle: { total: 90, available: 34 },
      ev: {
        totalLots: 10,
        availableLots: 2,
        providers: ['SP Mobility'],
        powerKw: 50,
        plugTypes: ['CCS2', 'Type 2'],
        chargingRatePerKwh: 0.65
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.95 1st hr, $0.55 per subseq 15 mins (12:00am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 1.95,
        subsequentMinutes: 15,
        subsequentRate: 0.55,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.50
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.50 per entry (6:00pm - 11:59pm)',
        baseMinutes: 60,
        baseRate: 3.50,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.50
      },
      saturday: {
        description: 'Sat & Sun: $3.00 for 1st 2 hrs, $0.60 per subseq 15 mins (all day)',
        baseMinutes: 120,
        baseRate: 3.00,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sun & PH: $3.00 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 3.00,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      motorcyclePerEntry: 1.40
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'CapitaStar In-App', 'NETS'],
    nearestMrt: {
      name: 'Dhoby Ghaut MRT (NS24/NE6/CC1)',
      line: 'Triple MRT Interchange',
      walkingMinutes: 1
    },
    amenities: ['Direct MRT Underground Link', 'DC Fast Charging', 'Pram / Family Friendly'],
    lastUpdated: '2026-11-12T09:10:15+08:00'
  },

  // MARINA BAY & DOWNTOWN CBD
  {
    id: 'marina-bay-sands',
    carparkNo: 'MBS-01',
    name: 'Marina Bay Sands Integrated Resort',
    address: '10 Bayfront Avenue, Singapore 018956',
    postalCode: '018956',
    agency: 'COMMERCIAL',
    structure: 'Basement',
    region: 'Marina Bay',
    coordinates: {
      lat: 1.2838,
      lng: 103.8590,
      mapX: 54.8,
      mapY: 67.2
    },
    lots: {
      car: { total: 2500, available: 940 },
      motorcycle: { total: 150, available: 65 },
      ev: {
        totalLots: 24,
        availableLots: 11,
        providers: ['Charge+', 'Tesla Supercharger', 'SP'],
        powerKw: 120,
        plugTypes: ['Tesla', 'CCS2', 'Type 2'],
        chargingRatePerKwh: 0.69
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Thu: $14.00 1st hr, $1.50 per subseq 30 mins (7am - 7pm); Max $32.00',
        baseMinutes: 60,
        baseRate: 14.00,
        subsequentMinutes: 30,
        subsequentRate: 1.50,
        eveningFlatCutoffHour: 19,
        eveningFlatRate: 14.00
      },
      weekdayEvening: {
        description: 'Mon - Thu: $14.00 flat entry (7pm - 7am next day)',
        baseMinutes: 60,
        baseRate: 14.00,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 14.00
      },
      saturday: {
        description: 'Fri - Sun & PH: $16.00 1st hr, $2.00 per subseq 30 mins',
        baseMinutes: 60,
        baseRate: 16.00,
        subsequentMinutes: 30,
        subsequentRate: 2.00
      },
      sundayPH: {
        description: 'Sun & PH: $16.00 1st hr, $2.00 per subseq 30 mins (Max $38.00/24h)',
        baseMinutes: 60,
        baseRate: 16.00,
        subsequentMinutes: 30,
        subsequentRate: 2.00
      },
      motorcyclePerEntry: 4.00
    },
    gracePeriodMin: 10,
    freeParkingScheme: false,
    heightClearanceMeters: 2.0,
    paymentMethods: ['Cashless EPS', 'Sands Rewards Redemption', 'Credit Card'],
    nearestMrt: {
      name: 'Bayfront MRT (DT16/CE1)',
      line: 'Downtown / Circle Line',
      walkingMinutes: 2
    },
    amenities: ['Tesla Superchargers', 'Valet Services', 'Sands Lifestyle Redemption', 'Helipad Access'],
    erpHit: {
      gantryName: 'Sheares Avenue Gantry',
      currentRate: 2.00,
      distanceMeters: 350,
      operationalWindow: '8:00am - 9:30am'
    },
    lastUpdated: '2026-11-12T09:08:50+08:00'
  },
  {
    id: 'suntec-city',
    carparkNo: 'SUNT-01',
    name: 'Suntec City Mall & Convention Centre',
    address: '3 Temasek Boulevard, Singapore 038983',
    postalCode: '038983',
    agency: 'MALL',
    structure: 'Basement',
    region: 'Marina Bay',
    coordinates: {
      lat: 1.2935,
      lng: 103.8572,
      mapX: 54.1,
      mapY: 64.5
    },
    lots: {
      car: { total: 3100, available: 1140 },
      motorcycle: { total: 200, available: 98 },
      ev: {
        totalLots: 20,
        availableLots: 8,
        providers: ['SP Mobility', 'Schneider Electric'],
        powerKw: 50,
        plugTypes: ['CCS2', 'Type 2'],
        chargingRatePerKwh: 0.62
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $2.60 for 1st hr, $0.70 per subseq 15 mins (7am - 5pm)',
        baseMinutes: 60,
        baseRate: 2.60,
        subsequentMinutes: 15,
        subsequentRate: 0.70,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 3.50
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.50 per entry (5pm - 7am next day)',
        baseMinutes: 60,
        baseRate: 3.50,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.50
      },
      saturday: {
        description: 'Sat, Sun & PH: $2.80 1st 4 hrs, $0.70 per subseq 15 mins (7am - 5pm); $3.50/entry after',
        baseMinutes: 240,
        baseRate: 2.80,
        subsequentMinutes: 15,
        subsequentRate: 0.70,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 3.50
      },
      sundayPH: {
        description: 'Sun & PH: $2.80 1st 4 hrs, then $0.70/15 mins; $3.50/entry after 5pm',
        baseMinutes: 240,
        baseRate: 2.80,
        subsequentMinutes: 15,
        subsequentRate: 0.70,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 3.50
      },
      motorcyclePerEntry: 1.50
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.0,
    paymentMethods: ['Cashless EPS', 'Suntec+ App', 'NETS'],
    nearestMrt: {
      name: 'Promenade / Esplanade MRT',
      line: 'Circle / Downtown Line',
      walkingMinutes: 3
    },
    amenities: ['Color Zone Guidance System (Red/Yellow/Green/Blue)', 'EV DC Chargers', 'Car Wash Bay'],
    lastUpdated: '2026-11-12T09:10:05+08:00'
  },
  {
    id: 'albert-centre',
    carparkNo: 'ACB',
    name: 'Albert Centre Basement (Bugis)',
    address: '270 Queen Street, Singapore 180270',
    postalCode: '180270',
    agency: 'HDB',
    structure: 'Basement',
    region: 'Central / CBD',
    coordinates: {
      lat: 1.3009,
      lng: 103.8540,
      mapX: 53.4,
      mapY: 62.9
    },
    lots: {
      car: { total: 340, available: 42 },
      motorcycle: { total: 110, available: 68 }
    },
    rates: {
      weekdayDay: {
        description: 'HDB Central Area: $1.20 per 30 mins (7:00am - 5:00pm Mon - Sat)',
        baseMinutes: 30,
        baseRate: 1.20,
        subsequentMinutes: 30,
        subsequentRate: 1.20,
        eveningFlatCutoffHour: 17
      },
      weekdayEvening: {
        description: 'HDB Standard: $0.60 per 30 mins (5:00pm - 10:30pm), Night Cap $5.00',
        baseMinutes: 30,
        baseRate: 0.60,
        subsequentMinutes: 30,
        subsequentRate: 0.60,
        nightCap: 5.00
      },
      saturday: {
        description: 'Sat: $1.20 per 30 mins (7am - 5pm), $0.60 per 30 mins thereafter',
        baseMinutes: 30,
        baseRate: 1.20,
        subsequentMinutes: 30,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Free Parking Scheme (FPS) 7:30am - 10:30pm for cars!',
        baseMinutes: 60,
        baseRate: 0.00,
        subsequentMinutes: 60,
        subsequentRate: 0.00,
        isFree: true
      },
      motorcyclePerEntry: 0.65
    },
    gracePeriodMin: 15,
    freeParkingScheme: true,
    heightClearanceMeters: 1.9,
    paymentMethods: ['Cashless EPS', 'Parking.sg App'],
    nearestMrt: {
      name: 'Bugis MRT (EW12/DT14)',
      line: 'East-West / Downtown Line',
      walkingMinutes: 3
    },
    amenities: ['HDB Sunday Free Parking (FPS)', 'Albert Food Centre Upstairs', 'Affordable Hawker Parking'],
    erpHit: {
      gantryName: 'Bugis Cordon ERP',
      currentRate: 1.00,
      distanceMeters: 150,
      operationalWindow: 'Peak Hours'
    },
    lastUpdated: '2026-11-12T09:11:00+08:00'
  },
  {
    id: 'bras-basah-complex',
    carparkNo: 'BBM',
    name: 'Bras Basah Complex MSCP',
    address: '231 Bain Street, Singapore 180231',
    postalCode: '180231',
    agency: 'HDB',
    structure: 'MSCP',
    region: 'Central / CBD',
    coordinates: {
      lat: 1.2968,
      lng: 103.8532,
      mapX: 53.1,
      mapY: 63.8
    },
    lots: {
      car: { total: 460, available: 124 },
      motorcycle: { total: 120, available: 55 }
    },
    rates: {
      weekdayDay: {
        description: 'Central Area: $1.20 per 30 mins (7:00am - 5:00pm)',
        baseMinutes: 30,
        baseRate: 1.20,
        subsequentMinutes: 30,
        subsequentRate: 1.20
      },
      weekdayEvening: {
        description: '$0.60 per 30 mins (5:00pm - 10:30pm), Night Cap $5.00',
        baseMinutes: 30,
        baseRate: 0.60,
        subsequentMinutes: 30,
        subsequentRate: 0.60,
        nightCap: 5.00
      },
      saturday: {
        description: 'Sat: $1.20 per 30 mins (7am - 5pm), $0.60/30m after',
        baseMinutes: 30,
        baseRate: 1.20,
        subsequentMinutes: 30,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Free Parking Scheme (FPS) on Sun & PH: 7:30am - 10:30pm',
        baseMinutes: 60,
        baseRate: 0.00,
        subsequentMinutes: 60,
        subsequentRate: 0.00,
        isFree: true
      },
      motorcyclePerEntry: 0.65
    },
    gracePeriodMin: 15,
    freeParkingScheme: true,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'Parking.sg App'],
    nearestMrt: {
      name: 'Bras Basah / City Hall MRT',
      line: 'Circle / EW / NS Line',
      walkingMinutes: 3
    },
    amenities: ['Multi-Storey Sheltered MSCP', 'Sunday Free Parking', 'Wide Vehicle Clearance'],
    lastUpdated: '2026-11-12T09:09:12+08:00'
  },
  {
    id: 'chinatown-complex',
    carparkNo: 'BA2',
    name: 'Chinatown Complex MSCP',
    address: '335 Smith Street, Singapore 050335',
    postalCode: '050335',
    agency: 'HDB',
    structure: 'MSCP',
    region: 'Central / CBD',
    coordinates: {
      lat: 1.2824,
      lng: 103.8436,
      mapX: 50.8,
      mapY: 67.4
    },
    lots: {
      car: { total: 390, available: 18 },
      motorcycle: { total: 140, available: 72 }
    },
    rates: {
      weekdayDay: {
        description: 'Central Area HDB: $1.20 per 30 mins (7am - 5pm)',
        baseMinutes: 30,
        baseRate: 1.20,
        subsequentMinutes: 30,
        subsequentRate: 1.20
      },
      weekdayEvening: {
        description: '$0.60 per 30 mins (5pm - 10:30pm), Max $5.00 night parking',
        baseMinutes: 30,
        baseRate: 0.60,
        subsequentMinutes: 30,
        subsequentRate: 0.60,
        nightCap: 5.00
      },
      saturday: {
        description: 'Sat: $1.20/30m (7am - 5pm), $0.60/30m after',
        baseMinutes: 30,
        baseRate: 1.20,
        subsequentMinutes: 30,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sunday Free Parking Scheme (7:30am - 10:30pm)',
        baseMinutes: 60,
        baseRate: 0.00,
        subsequentMinutes: 60,
        subsequentRate: 0.00,
        isFree: true
      },
      motorcyclePerEntry: 0.65
    },
    gracePeriodMin: 15,
    freeParkingScheme: true,
    heightClearanceMeters: 1.85,
    paymentMethods: ['Cashless EPS', 'Parking.sg'],
    nearestMrt: {
      name: 'Chinatown MRT (NE4/DT19)',
      line: 'North-East / Downtown Line',
      walkingMinutes: 2
    },
    amenities: ['Chinatown Hawker Center', 'Sunday Free Parking (FPS)', 'Low Roof Alert (1.85m)'],
    lastUpdated: '2026-11-12T09:10:45+08:00'
  },
  {
    id: 'guoco-tower',
    carparkNo: 'TPC-01',
    name: 'Guoco Tower / Tanjong Pagar Centre',
    address: '1 Wallich Street, Singapore 078881',
    postalCode: '078881',
    agency: 'COMMERCIAL',
    structure: 'Basement',
    region: 'Central / CBD',
    coordinates: {
      lat: 1.2766,
      lng: 103.8458,
      mapX: 51.4,
      mapY: 69.1
    },
    lots: {
      car: { total: 450, available: 165 },
      motorcycle: { total: 50, available: 20 },
      ev: {
        totalLots: 6,
        availableLots: 2,
        providers: ['SP Mobility'],
        powerKw: 50,
        plugTypes: ['CCS2', 'Type 2'],
        chargingRatePerKwh: 0.65
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $3.50 for 1st hr, $1.80 per subseq 30 mins (6am - 6pm)',
        baseMinutes: 60,
        baseRate: 3.50,
        subsequentMinutes: 30,
        subsequentRate: 1.80,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 4.00
      },
      weekdayEvening: {
        description: 'Mon - Fri: $4.00 per entry (6pm - 6am next day)',
        baseMinutes: 60,
        baseRate: 4.00,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 4.00
      },
      saturday: {
        description: 'Sat & Sun: $3.50 for 1st 2 hrs, $1.50 per subseq 30 mins',
        baseMinutes: 120,
        baseRate: 3.50,
        subsequentMinutes: 30,
        subsequentRate: 1.50
      },
      sundayPH: {
        description: 'Sun & PH: $3.50 for 1st 2 hrs, $1.50 per subseq 30 mins',
        baseMinutes: 120,
        baseRate: 3.50,
        subsequentMinutes: 30,
        subsequentRate: 1.50
      },
      motorcyclePerEntry: 2.00
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'NETS'],
    nearestMrt: {
      name: 'Tanjong Pagar MRT (EW15)',
      line: 'East-West Line',
      walkingMinutes: 1
    },
    amenities: ['Direct Underground MRT Link', 'EV Fast Charging', 'Modern Automated Guidance'],
    lastUpdated: '2026-11-12T09:08:10+08:00'
  },

  // EAST REGION
  {
    id: 'jewel-changi',
    carparkNo: 'JWL-01',
    name: 'Jewel Changi Airport (General Carpark 2M/B2M)',
    address: '78 Airport Boulevard, Singapore 819666',
    postalCode: '819666',
    agency: 'COMMERCIAL',
    structure: 'Basement',
    region: 'East',
    coordinates: {
      lat: 1.3602,
      lng: 103.9897,
      mapX: 89.2,
      mapY: 48.6
    },
    lots: {
      car: { total: 2500, available: 1210 },
      motorcycle: { total: 200, available: 140 },
      ev: {
        totalLots: 16,
        availableLots: 9,
        providers: ['Tesla Supercharger', 'SP Mobility'],
        powerKw: 150,
        plugTypes: ['Tesla', 'CCS2', 'Type 2'],
        chargingRatePerKwh: 0.68
      }
    },
    rates: {
      weekdayDay: {
        description: 'General: $0.04 per min ($2.40/hr for 1st 90m), $5.00/subseq 30m; Short Stay B2/B2M',
        baseMinutes: 60,
        baseRate: 2.40,
        subsequentMinutes: 30,
        subsequentRate: 2.40
      },
      weekdayEvening: {
        description: 'Same standard 24/7 airport rate: $0.04/min ($2.40/hr)',
        baseMinutes: 60,
        baseRate: 2.40,
        subsequentMinutes: 30,
        subsequentRate: 2.40
      },
      saturday: {
        description: '$0.04/min ($2.40/hr)',
        baseMinutes: 60,
        baseRate: 2.40,
        subsequentMinutes: 30,
        subsequentRate: 2.40
      },
      sundayPH: {
        description: '$0.04/min ($2.40/hr)',
        baseMinutes: 60,
        baseRate: 2.40,
        subsequentMinutes: 30,
        subsequentRate: 2.40
      },
      motorcyclePerEntry: 1.40
    },
    gracePeriodMin: 10,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'Changi Rewards In-App', 'NETS'],
    nearestMrt: {
      name: 'Changi Airport MRT (CG2)',
      line: 'East-West Branch',
      walkingMinutes: 2
    },
    amenities: ['Direct Airport Terminal Link', 'Ultra-Fast DC Charging', 'Luggage Trolley Hubs'],
    lastUpdated: '2026-11-12T09:09:55+08:00'
  },
  {
    id: 'our-tampines-hub',
    carparkNo: 'TP41',
    name: 'Our Tampines Hub (OTH) Carpark',
    address: '1 Tampines Walk, Singapore 528523',
    postalCode: '528523',
    agency: 'URA',
    structure: 'Basement',
    region: 'East',
    coordinates: {
      lat: 1.3533,
      lng: 103.9405,
      mapX: 76.8,
      mapY: 50.1
    },
    lots: {
      car: { total: 1400, available: 620 },
      motorcycle: { total: 250, available: 165 },
      ev: {
        totalLots: 12,
        availableLots: 6,
        providers: ['Charge+', 'CDG ENGIE'],
        powerKw: 50,
        plugTypes: ['Type 2', 'CCS2'],
        chargingRatePerKwh: 0.58
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $0.60 per 30 mins (12:00am - 5:59pm)',
        baseMinutes: 30,
        baseRate: 0.60,
        subsequentMinutes: 30,
        subsequentRate: 0.60,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 2.40
      },
      weekdayEvening: {
        description: 'Mon - Fri: $2.40 per entry (6:00pm - 11:59pm)',
        baseMinutes: 60,
        baseRate: 2.40,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 2.40
      },
      saturday: {
        description: 'Sat & Sun: $0.60 per 30 mins (12am - 5:59pm); $2.40/entry after',
        baseMinutes: 30,
        baseRate: 0.60,
        subsequentMinutes: 30,
        subsequentRate: 0.60,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 2.40
      },
      sundayPH: {
        description: 'Sun & PH: $0.60 per 30 mins; $2.40/entry after 6:00pm',
        baseMinutes: 30,
        baseRate: 0.60,
        subsequentMinutes: 30,
        subsequentRate: 0.60,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 2.40
      },
      motorcyclePerEntry: 0.65
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'NETS FlashPay'],
    nearestMrt: {
      name: 'Tampines MRT (EW2/DT32)',
      line: 'East-West / Downtown Line',
      walkingMinutes: 5
    },
    amenities: ['Community Hub & Stadium Access', 'EV Charging', 'Sheltered Drop-Off', 'Hawker Centre Attached'],
    lastUpdated: '2026-11-12T09:11:10+08:00'
  },
  {
    id: 'paya-lebar-quarter',
    carparkNo: 'PLQ-01',
    name: 'Paya Lebar Quarter (PLQ Mall)',
    address: '10 Paya Lebar Road, Singapore 409057',
    postalCode: '409057',
    agency: 'MALL',
    structure: 'Basement',
    region: 'East',
    coordinates: {
      lat: 1.3175,
      lng: 103.8927,
      mapX: 64.2,
      mapY: 59.2
    },
    lots: {
      car: { total: 980, available: 410 },
      motorcycle: { total: 110, available: 62 },
      ev: {
        totalLots: 8,
        availableLots: 4,
        providers: ['SP Mobility'],
        powerKw: 50,
        plugTypes: ['CCS2', 'Type 2'],
        chargingRatePerKwh: 0.64
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.90 1st hr, $0.55 per subseq 15 mins (6am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 1.90,
        subsequentMinutes: 15,
        subsequentRate: 0.55,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.20
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.20 per entry (6pm - 5:59am next day)',
        baseMinutes: 60,
        baseRate: 3.20,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.20
      },
      saturday: {
        description: 'Sat & Sun: $2.40 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sun & PH: $2.40 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      motorcyclePerEntry: 1.30
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.0,
    paymentMethods: ['Cashless EPS', 'NETS'],
    nearestMrt: {
      name: 'Paya Lebar MRT (EW8/CC9)',
      line: 'East-West / Circle Line Interchange',
      walkingMinutes: 1
    },
    amenities: ['Direct MRT Underpass', 'EV Charging', 'Outdoor Plaza Dining Link'],
    lastUpdated: '2026-11-12T09:07:30+08:00'
  },

  // WEST REGION
  {
    id: 'jem-jurong-east',
    carparkNo: 'JEM-01',
    name: 'Jem Carpark (Jurong East Gateway)',
    address: '50 Jurong Gateway Road, Singapore 608549',
    postalCode: '608549',
    agency: 'MALL',
    structure: 'Basement',
    region: 'West',
    coordinates: {
      lat: 1.3333,
      lng: 103.7436,
      mapX: 24.3,
      mapY: 54.8
    },
    lots: {
      car: { total: 820, available: 215 },
      motorcycle: { total: 95, available: 44 },
      ev: {
        totalLots: 10,
        availableLots: 3,
        providers: ['Charge+'],
        powerKw: 50,
        plugTypes: ['CCS2', 'Type 2'],
        chargingRatePerKwh: 0.62
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.90 1st hr, $0.50 per subseq 15 mins (6am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 1.90,
        subsequentMinutes: 15,
        subsequentRate: 0.50,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.50
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.50 per entry (6pm - 5:59am next day)',
        baseMinutes: 60,
        baseRate: 3.50,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.50
      },
      saturday: {
        description: 'Sat & Sun: $2.40 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sun & PH: $2.40 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      motorcyclePerEntry: 1.40
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'Lendlease Plus App', 'NETS'],
    nearestMrt: {
      name: 'Jurong East MRT (NS1/EW24)',
      line: 'NS / EW Interchange',
      walkingMinutes: 2
    },
    amenities: ['Direct Elevated J-Walk to MRT/Westgate', 'Fast EV Chargers', 'Family Parking'],
    lastUpdated: '2026-11-12T09:10:20+08:00'
  },
  {
    id: 'imm-building',
    carparkNo: 'IMM-01',
    name: 'IMM Building Carpark (Outlet Mall)',
    address: '2 Jurong East Street 21, Singapore 609601',
    postalCode: '609601',
    agency: 'MALL',
    structure: 'Multi-Level & Rooftop',
    region: 'West',
    coordinates: {
      lat: 1.3347,
      lng: 103.7468,
      mapX: 25.1,
      mapY: 54.3
    },
    lots: {
      car: { total: 1300, available: 520 },
      motorcycle: { total: 160, available: 89 },
      ev: {
        totalLots: 14,
        availableLots: 7,
        providers: ['SP Mobility'],
        powerKw: 50,
        plugTypes: ['CCS2'],
        chargingRatePerKwh: 0.60
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: 1st hr Free (1st entry only), $1.30 per subseq 30 mins (6am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 0.00, // 1st hour free!
        subsequentMinutes: 30,
        subsequentRate: 1.30,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.00
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.00 per entry (6pm - 5:59am next day)',
        baseMinutes: 60,
        baseRate: 3.00,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.00
      },
      saturday: {
        description: 'Sat & Sun: $1.50 for 1st 2 hrs, $1.30 per subseq 30 mins',
        baseMinutes: 120,
        baseRate: 1.50,
        subsequentMinutes: 30,
        subsequentRate: 1.30
      },
      sundayPH: {
        description: 'Sun & PH: $1.50 1st 2 hrs, $1.30 per subseq 30 mins',
        baseMinutes: 120,
        baseRate: 1.50,
        subsequentMinutes: 30,
        subsequentRate: 1.30
      },
      motorcyclePerEntry: 1.30
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.15,
    paymentMethods: ['Cashless EPS', 'CapitaStar In-App', 'NETS'],
    nearestMrt: {
      name: 'Jurong East MRT',
      line: 'NS / EW Line',
      walkingMinutes: 8
    },
    amenities: ['1st Hour Free Weekday Parking Promo', 'High Clearance 2.15m', 'CapitaLand Vouchers'],
    lastUpdated: '2026-11-12T09:08:40+08:00'
  },
  {
    id: 'star-vista',
    carparkNo: 'SV-01',
    name: 'The Star Vista (Buona Vista)',
    address: '1 Vista Exchange Green, Singapore 138617',
    postalCode: '138617',
    agency: 'MALL',
    structure: 'Basement',
    region: 'West',
    coordinates: {
      lat: 1.3068,
      lng: 103.7884,
      mapX: 36.2,
      mapY: 61.6
    },
    lots: {
      car: { total: 800, available: 310 },
      motorcycle: { total: 70, available: 35 },
      ev: {
        totalLots: 6,
        availableLots: 3,
        providers: ['CDG ENGIE'],
        powerKw: 22,
        plugTypes: ['Type 2'],
        chargingRatePerKwh: 0.59
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: Lunchtime Free 12pm-2pm! Otherwise $1.80 1st hr, $0.50/subseq 15m',
        baseMinutes: 60,
        baseRate: 1.80,
        subsequentMinutes: 15,
        subsequentRate: 0.50,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.50
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.50 per entry (6pm - 11:59pm)',
        baseMinutes: 60,
        baseRate: 3.50,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.50
      },
      saturday: {
        description: 'Sat & Sun: $2.50 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.50,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sun & PH: $2.50 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.50,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      motorcyclePerEntry: 1.40
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'NETS'],
    nearestMrt: {
      name: 'Buona Vista MRT (EW21/CC22)',
      line: 'East-West / Circle Line',
      walkingMinutes: 2
    },
    amenities: ['Weekday Lunchtime Free Parking Promo', 'Direct MRT Covered Bridge', 'EV AC Chargers'],
    lastUpdated: '2026-11-12T09:09:10+08:00'
  },

  // NORTH & NORTH-EAST REGION
  {
    id: 'amk-hub',
    carparkNo: 'AMKH',
    name: 'AMK Hub Multi-Storey Carpark',
    address: '53 Ang Mo Kio Avenue 3, Singapore 569933',
    postalCode: '569933',
    agency: 'MALL',
    structure: 'MSCP',
    region: 'North',
    coordinates: {
      lat: 1.3691,
      lng: 103.8485,
      mapX: 52.3,
      mapY: 45.8
    },
    lots: {
      car: { total: 460, available: 185 },
      motorcycle: { total: 80, available: 42 }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.60 for 1st hr, $0.80 per subseq 30 mins (7am - 6pm)',
        baseMinutes: 60,
        baseRate: 1.60,
        subsequentMinutes: 30,
        subsequentRate: 0.80,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 2.80
      },
      weekdayEvening: {
        description: 'Mon - Fri: $2.80 per entry (6pm - 7am next day)',
        baseMinutes: 60,
        baseRate: 2.80,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 2.80
      },
      saturday: {
        description: 'Sat & Sun: $2.00 1st hr, $1.00 per subseq 30 mins',
        baseMinutes: 60,
        baseRate: 2.00,
        subsequentMinutes: 30,
        subsequentRate: 1.00
      },
      sundayPH: {
        description: 'Sun & PH: $2.00 1st hr, $1.00 per subseq 30 mins',
        baseMinutes: 60,
        baseRate: 2.00,
        subsequentMinutes: 30,
        subsequentRate: 1.00
      },
      motorcyclePerEntry: 1.30
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.0,
    paymentMethods: ['Cashless EPS', 'NETS'],
    nearestMrt: {
      name: 'Ang Mo Kio MRT (NS16)',
      line: 'North-South Line',
      walkingMinutes: 1
    },
    amenities: ['Integrated Bus Interchange', 'Direct Underpass to MRT', 'Hawker Center Proximity'],
    lastUpdated: '2026-11-12T09:11:05+08:00'
  },
  {
    id: 'junction-8-bishan',
    carparkNo: 'J8-01',
    name: 'Junction 8 Shopping Centre',
    address: '9 Bishan Place, Singapore 579837',
    postalCode: '579837',
    agency: 'MALL',
    structure: 'Basement',
    region: 'North',
    coordinates: {
      lat: 1.3508,
      lng: 103.8488,
      mapX: 52.4,
      mapY: 50.8
    },
    lots: {
      car: { total: 310, available: 64 },
      motorcycle: { total: 45, available: 19 },
      ev: {
        totalLots: 4,
        availableLots: 1,
        providers: ['SP Mobility'],
        powerKw: 50,
        plugTypes: ['CCS2'],
        chargingRatePerKwh: 0.65
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.95 1st hr, $0.55 per subseq 15 mins (12am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 1.95,
        subsequentMinutes: 15,
        subsequentRate: 0.55,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.30
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.30 per entry (6pm - 11:59pm)',
        baseMinutes: 60,
        baseRate: 3.30,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.30
      },
      saturday: {
        description: 'Sat & Sun: $2.40 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sun & PH: $2.40 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      motorcyclePerEntry: 1.30
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.05,
    paymentMethods: ['Cashless EPS', 'CapitaStar In-App', 'NETS'],
    nearestMrt: {
      name: 'Bishan MRT (NS17/CC15)',
      line: 'NS / Circle Line Interchange',
      walkingMinutes: 1
    },
    amenities: ['Direct MRT Connection', 'EV Fast Charger', 'Bishan Community Library Adjacent'],
    lastUpdated: '2026-11-12T09:10:40+08:00'
  },
  {
    id: 'nex-serangoon',
    carparkNo: 'NEX-01',
    name: 'NEX Mall Multi-Storey Carpark',
    address: '23 Serangoon Central, Singapore 556083',
    postalCode: '556083',
    agency: 'MALL',
    structure: 'MSCP',
    region: 'North-East',
    coordinates: {
      lat: 1.3506,
      lng: 103.8723,
      mapX: 58.7,
      mapY: 50.9
    },
    lots: {
      car: { total: 680, available: 142 },
      motorcycle: { total: 90, available: 38 },
      ev: {
        totalLots: 8,
        availableLots: 3,
        providers: ['Charge+'],
        powerKw: 50,
        plugTypes: ['CCS2', 'Type 2'],
        chargingRatePerKwh: 0.63
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.70 1st hr, $0.60 per subseq 15 mins (7am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 1.70,
        subsequentMinutes: 15,
        subsequentRate: 0.60,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.00
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.00 per entry (6pm - 6:59am next day)',
        baseMinutes: 60,
        baseRate: 3.00,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.00
      },
      saturday: {
        description: 'Sat & Sun: $2.40 1st 2 hrs, $0.70 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.70
      },
      sundayPH: {
        description: 'Sun & PH: $2.40 1st 2 hrs, $0.70 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.70
      },
      motorcyclePerEntry: 1.40
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'NETS FlashPay'],
    nearestMrt: {
      name: 'Serangoon MRT (NE12/CC13)',
      line: 'North-East / Circle Line',
      walkingMinutes: 1
    },
    amenities: ['Rooftop Dog Park & Playground Access', 'EV Charging', '24-Hour FairPrice Xtra'],
    lastUpdated: '2026-11-12T09:10:00+08:00'
  },
  {
    id: 'waterway-point-punggol',
    carparkNo: 'WWP-01',
    name: 'Waterway Point Carpark',
    address: '83 Punggol Central, Singapore 828761',
    postalCode: '828761',
    agency: 'MALL',
    structure: 'Basement',
    region: 'North-East',
    coordinates: {
      lat: 1.4067,
      lng: 103.9022,
      mapX: 66.8,
      mapY: 36.3
    },
    lots: {
      car: { total: 620, available: 290 },
      motorcycle: { total: 85, available: 51 },
      ev: {
        totalLots: 10,
        availableLots: 5,
        providers: ['SP Mobility'],
        powerKw: 50,
        plugTypes: ['CCS2'],
        chargingRatePerKwh: 0.62
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.60 1st hr, $0.50 per subseq 15 mins (12am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 1.60,
        subsequentMinutes: 15,
        subsequentRate: 0.50,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 2.80
      },
      weekdayEvening: {
        description: 'Mon - Fri: $2.80 per entry (6pm - 11:59pm)',
        baseMinutes: 60,
        baseRate: 2.80,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 2.80
      },
      saturday: {
        description: 'Sat & Sun: $2.20 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.20,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sun & PH: $2.20 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.20,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      motorcyclePerEntry: 1.30
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'Frasers Experience App', 'NETS'],
    nearestMrt: {
      name: 'Punggol MRT (NE17/PTC)',
      line: 'North-East Line / Punggol LRT',
      walkingMinutes: 2
    },
    amenities: ['Waterway Promenade Access', 'EV Fast Charging', 'Cinema & 24h Supermarket'],
    lastUpdated: '2026-11-12T09:09:00+08:00'
  },
  {
    id: 'causeway-point-woodlands',
    carparkNo: 'CP-01',
    name: 'Causeway Point (Woodlands)',
    address: '1 Woodlands Square, Singapore 738099',
    postalCode: '738099',
    agency: 'MALL',
    structure: 'Multi-Storey & Basement',
    region: 'North',
    coordinates: {
      lat: 1.4361,
      lng: 103.7865,
      mapX: 35.8,
      mapY: 28.5
    },
    lots: {
      car: { total: 840, available: 380 },
      motorcycle: { total: 110, available: 65 },
      ev: {
        totalLots: 8,
        availableLots: 4,
        providers: ['SP Mobility'],
        powerKw: 50,
        plugTypes: ['CCS2'],
        chargingRatePerKwh: 0.62
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.60 1st hr, $0.50 per subseq 15 mins (12am - 5:59pm)',
        baseMinutes: 60,
        baseRate: 1.60,
        subsequentMinutes: 15,
        subsequentRate: 0.50,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 2.80
      },
      weekdayEvening: {
        description: 'Mon - Fri: $2.80 per entry (6pm - 11:59pm)',
        baseMinutes: 60,
        baseRate: 2.80,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 2.80
      },
      saturday: {
        description: 'Sat & Sun: $2.20 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.20,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      sundayPH: {
        description: 'Sun & PH: $2.20 1st 2 hrs, $0.60 per subseq 15 mins',
        baseMinutes: 120,
        baseRate: 2.20,
        subsequentMinutes: 15,
        subsequentRate: 0.60
      },
      motorcyclePerEntry: 1.30
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'Frasers Experience', 'NETS'],
    nearestMrt: {
      name: 'Woodlands MRT (NS9/TE2)',
      line: 'NS / TEL Interchange',
      walkingMinutes: 1
    },
    amenities: ['Direct Woodlands Bus Interchange Link', 'Woodlands Civic Centre Nearby', 'EV Fast Charging'],
    lastUpdated: '2026-11-12T09:10:30+08:00'
  },

  // SOUTH / HARBOURFRONT
  {
    id: 'vivocity-harbourfront',
    carparkNo: 'VIVO-01',
    name: 'VivoCity Shopping Mall Carpark',
    address: '1 HarbourFront Walk, Singapore 098585',
    postalCode: '098585',
    agency: 'MALL',
    structure: 'Multi-Level & Basement',
    region: 'Central / CBD',
    coordinates: {
      lat: 1.2644,
      lng: 103.8222,
      mapX: 45.2,
      mapY: 72.3
    },
    lots: {
      car: { total: 2180, available: 680 },
      motorcycle: { total: 180, available: 92 },
      ev: {
        totalLots: 18,
        availableLots: 8,
        providers: ['SP Mobility', 'Charge+'],
        powerKw: 50,
        plugTypes: ['CCS2', 'Type 2'],
        chargingRatePerKwh: 0.65
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $1.60 1st hr, $0.80 per subseq 30 mins (7am - 6pm)',
        baseMinutes: 60,
        baseRate: 1.60,
        subsequentMinutes: 30,
        subsequentRate: 0.80,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 3.50
      },
      weekdayEvening: {
        description: 'Mon - Fri: $3.50 per entry (6pm - 4am next day)',
        baseMinutes: 60,
        baseRate: 3.50,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 3.50
      },
      saturday: {
        description: 'Sat, Sun & PH: $2.00 1st hr, $1.00 per subseq 30 mins (7am - 6pm); $4.00/entry after',
        baseMinutes: 60,
        baseRate: 2.00,
        subsequentMinutes: 30,
        subsequentRate: 1.00,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 4.00
      },
      sundayPH: {
        description: 'Sun & PH: $2.00 1st hr, $1.00 subseq 30 mins; $4.00/entry after 6pm',
        baseMinutes: 60,
        baseRate: 2.00,
        subsequentMinutes: 30,
        subsequentRate: 1.00,
        eveningFlatCutoffHour: 18,
        eveningFlatRate: 4.00
      },
      motorcyclePerEntry: 1.50
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'VivoCity App / Mapletree', 'NETS'],
    nearestMrt: {
      name: 'HarbourFront MRT (NE1/CC29)',
      line: 'North-East / Circle Line Interchange',
      walkingMinutes: 1
    },
    amenities: ['Direct Sentosa Express Monorail Link', 'High Capacity Multi-Deck', 'Harbourfront Cruise Ferry Link'],
    lastUpdated: '2026-11-12T09:10:48+08:00'
  },
  {
    id: 'clarke-quay-central',
    carparkNo: 'CLQC',
    name: 'Clarke Quay Central Carpark',
    address: '6 Eu Tong Sen Street, Singapore 059817',
    postalCode: '059817',
    agency: 'MALL',
    structure: 'MSCP',
    region: 'Central / CBD',
    coordinates: {
      lat: 1.2887,
      lng: 103.8465,
      mapX: 51.5,
      mapY: 65.8
    },
    lots: {
      car: { total: 470, available: 135 },
      motorcycle: { total: 60, available: 28 },
      ev: {
        totalLots: 6,
        availableLots: 2,
        providers: ['Charge+'],
        powerKw: 50,
        plugTypes: ['CCS2'],
        chargingRatePerKwh: 0.64
      }
    },
    rates: {
      weekdayDay: {
        description: 'Mon - Fri: $2.40 1st hr, $0.65 per subseq 15 mins (6am - 5pm)',
        baseMinutes: 60,
        baseRate: 2.40,
        subsequentMinutes: 15,
        subsequentRate: 0.65,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 4.50
      },
      weekdayEvening: {
        description: 'Mon - Fri: $4.50 per entry (5pm - 5:59am next day)',
        baseMinutes: 60,
        baseRate: 4.50,
        subsequentMinutes: 60,
        subsequentRate: 0,
        eveningFlatRate: 4.50
      },
      saturday: {
        description: 'Sat & Sun: $3.00 1st 2 hrs, $0.70 per subseq 15 mins; $4.50/entry after 5pm',
        baseMinutes: 120,
        baseRate: 3.00,
        subsequentMinutes: 15,
        subsequentRate: 0.70,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 4.50
      },
      sundayPH: {
        description: 'Sun & PH: $3.00 1st 2 hrs, $0.70 per subseq 15 mins; $4.50/entry after 5pm',
        baseMinutes: 120,
        baseRate: 3.00,
        subsequentMinutes: 15,
        subsequentRate: 0.70,
        eveningFlatCutoffHour: 17,
        eveningFlatRate: 4.50
      },
      motorcyclePerEntry: 1.50
    },
    gracePeriodMin: 15,
    freeParkingScheme: false,
    heightClearanceMeters: 2.1,
    paymentMethods: ['Cashless EPS', 'Far East Malls App'],
    nearestMrt: {
      name: 'Clarke Quay MRT (NE5)',
      line: 'North-East Line',
      walkingMinutes: 1
    },
    amenities: ['Direct MRT Connection', 'Singapore River Boardwalk Access', 'EV Fast Charging'],
    lastUpdated: '2026-11-12T09:11:00+08:00'
  }
];
