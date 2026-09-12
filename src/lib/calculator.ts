export interface CalculatorInput {
  monthlyBill: number;
  rooftopArea: number;
  state: string;
}

export interface CalculatorResult {
  unitsConsumed: number;
  systemSize: number;
  estimatedCost: number;
  monthlyBillSavings: number;
  paybackPeriod: number;
  co2Offset: number;
  rooftopAreaRequired: number;
  annualGeneration: number;
  subsidyAmount: number;
}

const STATE_TARIFFS: Record<string, number> = {
  'Rajasthan': 7.5,
  'Gujarat': 5.5,
  'Maharashtra': 8.0,
  'Karnataka': 6.5,
  'Tamil Nadu': 6.0,
  'Andhra Pradesh': 7.0,
  'Telangana': 7.5,
  'Delhi': 8.0,
  'Uttar Pradesh': 6.5,
  'Madhya Pradesh': 6.0,
  'Haryana': 7.0,
  'Punjab': 7.0,
  'Kerala': 6.5,
  'West Bengal': 7.5,
  'Bihar': 6.0,
  'Odisha': 5.5,
  'Jharkhand': 6.0,
  'Chhattisgarh': 5.5,
  'Assam': 6.5,
  'Others': 7.0,
};

const STATE_SOLAR_HOURS: Record<string, number> = {
  'Rajasthan': 5.5,
  'Gujarat': 5.2,
  'Maharashtra': 4.8,
  'Karnataka': 4.6,
  'Tamil Nadu': 4.5,
  'Andhra Pradesh': 5.0,
  'Telangana': 5.0,
  'Delhi': 4.5,
  'Uttar Pradesh': 4.5,
  'Madhya Pradesh': 5.0,
  'Haryana': 4.5,
  'Punjab': 4.5,
  'Kerala': 4.0,
  'West Bengal': 4.2,
  'Bihar': 4.5,
  'Odisha': 4.5,
  'Jharkhand': 4.5,
  'Chhattisgarh': 4.8,
  'Assam': 4.0,
  'Others': 4.5,
};

function getSubsidy(systemSizeKw: number): number {
  if (systemSizeKw <= 2) {
    return systemSizeKw * 30000;
  } else if (systemSizeKw <= 3) {
    return 2 * 30000 + (systemSizeKw - 2) * 18000;
  } else {
    return 78000;
  }
}

export function calculateSolar(input: CalculatorInput): CalculatorResult {
  const tariff = STATE_TARIFFS[input.state] || STATE_TARIFFS['Others'];
  const solarHours = STATE_SOLAR_HOURS[input.state] || STATE_SOLAR_HOURS['Others'];

  // Calculate units consumed per month
  const unitsConsumed = Math.round(input.monthlyBill / tariff);

  // System size needed (kW)
  const dailyUnits = unitsConsumed / 30;
  let systemSize = Math.round((dailyUnits / solarHours) * 10) / 10;

  // Check rooftop area constraint (approx 100 sq ft per kW)
  const maxSystemByArea = Math.floor(input.rooftopArea / 100);
  if (systemSize > maxSystemByArea && input.rooftopArea > 0) {
    systemSize = maxSystemByArea;
  }

  // Ensure minimum 1 kW
  systemSize = Math.max(1, systemSize);

  // Subsidy
  const subsidyAmount = getSubsidy(systemSize);

  // Cost (approx ₹65,000/kW before subsidy for residential)
  const grossCost = systemSize * 65000;
  const estimatedCost = grossCost - subsidyAmount;

  // Generation
  const dailyGeneration = systemSize * solarHours;
  const monthlyGeneration = dailyGeneration * 30;
  const annualGeneration = Math.round(dailyGeneration * 365);

  // Savings
  const monthlyBillSavings = Math.round(Math.min(monthlyGeneration, unitsConsumed) * tariff);

  // Payback period
  const annualSavings = monthlyBillSavings * 12;
  const paybackPeriod = annualSavings > 0 ? Math.round((estimatedCost / annualSavings) * 10) / 10 : 0;

  // CO2 offset (approx 0.82 kg CO2 per kWh in India)
  const co2Offset = Math.round((annualGeneration * 0.82) / 1000 * 10) / 10;

  // Rooftop area required
  const rooftopAreaRequired = Math.round(systemSize * 100);

  return {
    unitsConsumed,
    systemSize,
    estimatedCost,
    monthlyBillSavings,
    paybackPeriod,
    co2Offset,
    rooftopAreaRequired,
    annualGeneration,
    subsidyAmount,
  };
}

export const states = Object.keys(STATE_TARIFFS);
