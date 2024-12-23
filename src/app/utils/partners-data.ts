import { Partner } from '../types/partners';

// Helper function to determine file extension
const getFileExtension = (number: number, isBank: boolean = false): string => {
  if (isBank) {
    return number === 8 ? 'jpg' : 'png';
  } else {
    const jpgPartners = [8, 70, 68, 66, 65, 60, 58, 57, 52, 50, 48, 46, 45, 42, 40, 33, 32, 31, 29, 27, 25, 20, 14, 12, 11, 10];
    return jpgPartners.includes(number) ? 'jpg' : 'png';
  }
};

// Existing partners
export const existingPartners: Partner[] = [
  { name: "USAID", logo: "usaid.png", description: "usaid" },
  { name: "TOMATE", logo: "tomate.png", description: "tomate" },
  { name: "Morana", logo: "morana.jpg", description: "morana" },
  { name: "Morana Audit", logo: "morana_audit.jpg", description: "moranaAudit" },
  { name: "Enplus", logo: "enplus.jpg", description: "enplus" },
  { name: "Intecsup", logo: "intecsup.png", description: "intecsup" },
];

// Generate new partners array
const generateNewPartners = (): Partner[] => {
  const newPartners: Partner[] = [];
  
  // Generate bank partners (only include existing images)
  const existingBankPartners = [1, 3, 4, 5, 8, 9];
  for (const i of existingBankPartners) {
    newPartners.push({
      name: `Bank ${i}`,
      logo: `partenaire${i}b.${getFileExtension(i, true)}`,
      description: "",
      isBank: true
    });
  }
  
  // Generate regular partners (only include existing images)
  const existingPartners = [8, 10, 11, 12, 14, 20, 25, 27, 29, 31, 32, 33, 40, 42, 45, 46, 48, 50, 52, 57, 58, 60, 65, 66, 68, 70];
  for (const i of existingPartners) {
    newPartners.push({
      name: `Partner ${i}`,
      logo: `partenaire${i}.${getFileExtension(i)}`,
      description: `partner${i}`
    });
  }
  
  return newPartners;
};

export const allPartners = [...existingPartners, ...generateNewPartners()];

