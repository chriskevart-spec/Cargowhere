export interface ERPGantryInfo {
  id: string;
  name: string;
  zone: 'CBD / Marina Bay' | 'Orchard Cordon' | 'Expressway (CTE/AYE/PIE)' | 'Kallang / Bugis';
  currentRate: number;
  timeWindow: string;
  vehicleType: 'Car / Light Goods' | 'Motorcycle' | 'Heavy Goods';
  status: 'Active' | 'Free / $0' | 'Closed';
  expresswayRoad: string;
}

export const SINGAPORE_ERP_GANTRIES: ERPGantryInfo[] = [
  {
    id: 'erp-cte-braddell',
    name: 'CTE Southbound between Braddell & Balestier Slip',
    zone: 'Expressway (CTE/AYE/PIE)',
    currentRate: 3.00,
    timeWindow: '08:00 - 09:30',
    vehicleType: 'Car / Light Goods',
    status: 'Active',
    expresswayRoad: 'Central Expressway (CTE)'
  },
  {
    id: 'erp-sheares-ave',
    name: 'Sheares Avenue into Marina Bay / CBD',
    zone: 'CBD / Marina Bay',
    currentRate: 2.00,
    timeWindow: '08:30 - 09:30',
    vehicleType: 'Car / Light Goods',
    status: 'Active',
    expresswayRoad: 'Sheares Ave / MCE'
  },
  {
    id: 'erp-orchard-link',
    name: 'Orchard Link Cordon (Gantry 32)',
    zone: 'Orchard Cordon',
    currentRate: 1.00,
    timeWindow: '12:00 - 20:00',
    vehicleType: 'Car / Light Goods',
    status: 'Active',
    expresswayRoad: 'Orchard Road / Paterson'
  },
  {
    id: 'erp-nicoll-hwy',
    name: 'Nicoll Highway into City',
    zone: 'Kallang / Bugis',
    currentRate: 1.50,
    timeWindow: '08:00 - 09:00',
    vehicleType: 'Car / Light Goods',
    status: 'Active',
    expresswayRoad: 'Nicoll Highway'
  },
  {
    id: 'erp-aye-clementi',
    name: 'AYE towards City (after Jurong Town Hall)',
    zone: 'Expressway (CTE/AYE/PIE)',
    currentRate: 2.00,
    timeWindow: '08:00 - 09:30',
    vehicleType: 'Car / Light Goods',
    status: 'Active',
    expresswayRoad: 'Ayer Rajah Expressway (AYE)'
  },
  {
    id: 'erp-cbd-eu-tong-sen',
    name: 'Eu Tong Sen Street (Clarke Quay / Chinatown Cordon)',
    zone: 'CBD / Marina Bay',
    currentRate: 1.00,
    timeWindow: '17:30 - 19:00',
    vehicleType: 'Car / Light Goods',
    status: 'Active',
    expresswayRoad: 'Eu Tong Sen St'
  },
  {
    id: 'erp-pie-kallang',
    name: 'PIE Eastbound into KPE Tunnel Slip',
    zone: 'Expressway (CTE/AYE/PIE)',
    currentRate: 0.00,
    timeWindow: 'Non-Peak',
    vehicleType: 'Car / Light Goods',
    status: 'Free / $0',
    expresswayRoad: 'Pan-Island Expressway (PIE)'
  }
];
