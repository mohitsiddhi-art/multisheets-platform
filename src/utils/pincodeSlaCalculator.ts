export const calculateSLA = (originPincode: string, destinationPincode: string) => {
  // Mock logic for SLA/distance computation
  // In production, this would integrate with postal zone matrices
  const distance = Math.abs(parseInt(originPincode) - parseInt(destinationPincode)) % 500;
  let slaDays = 3;
  if (distance > 400) slaDays = 7;
  else if (distance > 200) slaDays = 5;

  return {
    distance: `${distance} km`,
    estimatedSla: `${slaDays} days`,
    zone: 'Zone A',
    transitMode: 'Road/Air'
  };
};
