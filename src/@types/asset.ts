export interface Asset {
  id?:             number;
  sensors?:        string[];
  model?:          string;
  status?:        string;
  healthscore?:   number;
  name?:           string;
  image?:          string;
  specifications?: Specifications;
  metrics?:        Metrics;
  unitId?:         number;
  companyId?:      number;
}

interface Metrics {
  totalCollectsUptime?: number;
  totalUptime?:         number;
  lastUptimeAt?:        Date;
}

interface Specifications {
  maxTemp?: number;
  power?:  number;
  rpm?:    number | null;
}