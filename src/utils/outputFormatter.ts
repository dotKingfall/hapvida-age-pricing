interface PriceData {
  age: number;
  range: string;
  enf: (number | null)[];
  amb: (number | null)[];
  apt: (number | null)[];
}

export const formatPricingData = (data: PriceData[]) => {
  // Format for "with coparticipation"
  const withCop = data
    .map(item => {
      const enfPrice = item.enf[1] ? `R$${item.enf[1].toFixed(2)}` : '-';
      const ambPrice = item.amb[1] ? `R$${item.amb[1].toFixed(2)}` : '-';
      const aptPrice = item.apt[1] ? `R$${item.apt[1].toFixed(2)}` : '-';
      
      return `${item.range}: Enf: ${enfPrice}, Amb: ${ambPrice}, Apt: ${aptPrice}`;
    })
    .join('\n');

  // Format for "without coparticipation"
  const noCop = data
    .map(item => {
      const enfPrice = item.enf[0] ? `R$${item.enf[0].toFixed(2)}` : '-';
      const ambPrice = item.amb[0] ? `R$${item.amb[0].toFixed(2)}` : '-';
      const aptPrice = item.apt[0] ? `R$${item.apt[0].toFixed(2)}` : '-';
      
      return `${item.range}: Enf: ${enfPrice}, Amb: ${ambPrice}, Apt: ${aptPrice}`;
    })
    .join('\n');

  return { withCop, noCop };
};