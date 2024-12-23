export interface Partner {
  name: string;
  logo: string;
  description: string;
  isBank?: boolean;
}

export interface PartnersTranslations {
  title: string;
  subtitle: string;
  bankingPartnersTitle: string;
  otherPartnersTitle: string;
  partners: Array<{
    name: string;
    category: string;
    description: string;
  }>;
}

