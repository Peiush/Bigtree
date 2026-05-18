export interface Event {
  id: string;
  slug: string;
  title: string;
  type: 'live-music' | 'private-event' | 'special-dining';
  date: string; // ISO YYYY-MM-DD
  time: string;
  image: string;
  description: string;
  cabanaCount: number;  // 0 = sold out
  price: number | null; // null = no cover
  artist?: string;
  genre?: string;
}

export const events: Event[] = [
  {
    id: '1', slug: 'anuv-jain-tribute-may-15',
    title: 'Anuv Jain Tribute Night',
    type: 'live-music', date: '2026-05-15', time: '8:00 PM',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=85',
    description: 'An acoustic homage to monsoon-soaked Bollywood ballads.',
    cabanaCount: 2, price: 1200, artist: 'Tribute Band', genre: 'Bollywood Acoustic',
  },
  {
    id: '2', slug: 'sunday-acoustic-brunch-may-17',
    title: 'Sunday Acoustic Brunch',
    type: 'live-music', date: '2026-05-17', time: '12:00 PM',
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=700&q=85',
    description: 'Slow brunch · two artists · all afternoon.',
    cabanaCount: 6, price: null, artist: 'Various Artists', genre: 'Acoustic',
  },
  {
    id: '3', slug: 'sufi-evenings-kabir-may-20',
    title: 'Sufi Evenings — Kabir',
    type: 'live-music', date: '2026-05-20', time: '8:30 PM',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=85',
    description: 'Four-piece sufi ensemble. Cabana booking recommended.',
    cabanaCount: 4, price: 1500, artist: 'Kabir Ensemble', genre: 'Sufi',
  },
  {
    id: '4', slug: 'monsoon-tasting-menu-may-22',
    title: 'Monsoon Tasting Menu',
    type: 'special-dining', date: '2026-05-22', time: '7:30 PM',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85',
    description: 'Seven courses · monsoon ingredients · pairings.',
    cabanaCount: 8, price: 2400,
  },
  {
    id: '5', slug: 'aanchals-30th-may-24',
    title: "Aanchal's 30th — Private",
    type: 'private-event', date: '2026-05-24', time: '8:00 PM',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&q=85',
    description: 'Cabanas 03–05 booked out.',
    cabanaCount: 0, price: null,
  },
  {
    id: '6', slug: 'indie-open-mic-may-28',
    title: 'Indie Open Mic',
    type: 'live-music', date: '2026-05-28', time: '9:00 PM',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=700&q=85',
    description: 'Eight artists · ten minutes each · zero ego.',
    cabanaCount: 12, price: 600, artist: 'Various', genre: 'Indie / Acoustic',
  },
  {
    id: '7', slug: 'wine-cheese-pairing-may-30',
    title: 'Wine & Cheese Pairing',
    type: 'special-dining', date: '2026-05-30', time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=85',
    description: 'Six wines, six cheeses, one perfect garden evening.',
    cabanaCount: 5, price: 1800,
  },
  {
    id: '8', slug: 'ghazal-night-anvi-june-04',
    title: 'Ghazal Night with Anvi',
    type: 'live-music', date: '2026-06-04', time: '8:30 PM',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&q=85',
    description: 'Old soul. New voice. Three sets.',
    cabanaCount: 9, price: 1200, artist: 'Anvi', genre: 'Ghazal',
  },
  {
    id: '9', slug: 'monsoon-jazz-june-07',
    title: 'Monsoon Jazz Evening',
    type: 'live-music', date: '2026-06-07', time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=700&q=85',
    description: 'Cool rain, warm jazz. The quartet returns for summer.',
    cabanaCount: 11, price: 1400, artist: 'Gurgaon Jazz Quartet', genre: 'Jazz',
  },
  {
    id: '10', slug: 'rooftop-dinner-june-10',
    title: 'Rooftop Dinner Under Stars',
    type: 'special-dining', date: '2026-06-10', time: '8:00 PM',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85',
    description: 'Five-course dinner. Open sky. No ceiling required.',
    cabanaCount: 6, price: 3200,
  },
  {
    id: '11', slug: 'folk-fusion-june-13',
    title: 'Folk Fusion — Raavi & Band',
    type: 'live-music', date: '2026-06-13', time: '8:00 PM',
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=700&q=85',
    description: 'Where Rajasthani folk meets electric guitar.',
    cabanaCount: 14, price: 900, artist: 'Raavi & Band', genre: 'Folk Fusion',
  },
  {
    id: '12', slug: 'couples-dining-june-14',
    title: "Valentine's in June — Couples Dinner",
    type: 'special-dining', date: '2026-06-14', time: '7:30 PM',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=85',
    description: 'A surprise 4-course menu curated for two.',
    cabanaCount: 3, price: 2800,
  },
  {
    id: '13', slug: 'open-terrace-brunch-june-21',
    title: 'Open Terrace Brunch',
    type: 'special-dining', date: '2026-06-21', time: '11:30 AM',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=700&q=85',
    description: 'Sunday slow dining. All morning. No rush.',
    cabanaCount: 18, price: null,
  },
  {
    id: '14', slug: 'bollywood-retro-june-27',
    title: 'Bollywood Retro Night',
    type: 'live-music', date: '2026-06-27', time: '8:30 PM',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=85',
    description: 'Hits from the 90s and 2000s performed live. Bring nostalgia.',
    cabanaCount: 7, price: 1100, artist: 'Ritu & The Rewind Band', genre: 'Bollywood Retro',
  },
  {
    id: '15', slug: 'private-anniversary-july-02',
    title: 'Private Anniversary Dinner',
    type: 'private-event', date: '2026-07-02', time: '7:30 PM',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&q=85',
    description: 'Entire garden section reserved. Full setup included.',
    cabanaCount: 0, price: null,
  },
  {
    id: '16', slug: 'indie-collective-july-05',
    title: 'Indie Collective Vol. 3',
    type: 'live-music', date: '2026-07-05', time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700&q=85',
    description: 'Four indie acts. One unforgettable garden evening.',
    cabanaCount: 10, price: 800, artist: 'Various', genre: 'Indie',
  },
];

export const birthdayPackages = [
  {
    id: 'silver', name: 'Silver Package', price: 2500, perPerson: false,
    features: ['Outdoor Garden Table', 'Balloon Decor', 'Welcome Drink', 'Personalised Cake (1 kg)', 'Complimentary Dessert Platter'],
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80'
  },
  {
    id: 'gold', name: 'Gold Package', price: 5000, perPerson: false,
    features: ['Private Cabana', 'Fairy Light Decor + Flowers', 'Welcome Cocktails for All', 'Custom Cake (2 kg)', 'Dedicated Server', 'Photo Frame Gift'],
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80',
    popular: true
  },
  {
    id: 'platinum', name: 'Platinum Package', price: 9000, perPerson: false,
    features: ['Exclusive Cabana Zone (2 cabanas)', 'Full Floral + LED Decor', 'Welcome Champagne', 'Live Music (1 hr)', 'Custom 3-Tier Cake', 'Professional Photography (1 hr)', 'Personalised Menu Cards'],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80'
  }
];
