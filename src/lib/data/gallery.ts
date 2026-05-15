export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'cabanas' | 'food' | 'music' | 'fairy-lights' | 'events';
}

export const galleryItems: GalleryItem[] = [
  // Food & Drinks (14)
  { id: '1',  src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=85', alt: 'Outdoor dining fairy lights', category: 'food' },
  { id: '2',  src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85', alt: 'Beautiful food plating', category: 'food' },
  { id: '3',  src: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=700&q=85', alt: 'Signature dish presentation', category: 'food' },
  { id: '4',  src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&q=85', alt: 'Chef special dessert', category: 'food' },
  { id: '5',  src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=85', alt: 'Evening cocktails', category: 'food' },
  { id: '6',  src: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=700&q=85', alt: 'Pasta dish', category: 'food' },
  { id: '7',  src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=700&q=85', alt: 'Fresh salad bowl', category: 'food' },
  { id: '8',  src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=85', alt: 'Wine and cocktails', category: 'food' },
  { id: '9',  src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=700&q=85', alt: 'Avocado toast brunch', category: 'food' },
  { id: '10', src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=85', alt: 'Grilled chicken plate', category: 'food' },
  { id: '11', src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=700&q=85', alt: 'Pancake stack', category: 'food' },
  { id: '12', src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=85', alt: 'Pasta carbonara', category: 'food' },
  { id: '13', src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&q=85', alt: 'Artisan pizza', category: 'food' },
  { id: '14', src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=700&q=85', alt: 'Chocolate lava cake', category: 'food' },

  // Cabanas (5)
  { id: '15', src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=700&q=85', alt: 'Private cabana dining', category: 'cabanas' },
  { id: '16', src: 'https://images.unsplash.com/photo-1484659619207-9165d119dafe?w=700&q=85', alt: 'Outdoor seating area', category: 'cabanas' },
  { id: '17', src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&q=85', alt: 'Private dining experience', category: 'cabanas' },
  { id: '18', src: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=700&q=85', alt: 'Romantic table setting', category: 'cabanas' },
  { id: '19', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85&sat=-30', alt: 'Candle-lit cabana', category: 'cabanas' },

  // Live Music (4)
  { id: '20', src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=700&q=85', alt: 'Live music performance', category: 'music' },
  { id: '21', src: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=700&q=85', alt: 'Jazz night at the cafe', category: 'music' },
  { id: '22', src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700&q=85', alt: 'Live band performance', category: 'music' },
  { id: '23', src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&q=85', alt: 'Concert night outdoor', category: 'music' },

  // Nights & Fairy Lights (6)
  { id: '24', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=85', alt: 'Restaurant interior evening', category: 'fairy-lights' },
  { id: '25', src: 'https://images.unsplash.com/photo-1493799817216-4b57e08d7710?w=700&q=85', alt: 'Fairy lights in trees', category: 'fairy-lights' },
  { id: '26', src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=700&q=85', alt: 'Outdoor night ambiance', category: 'fairy-lights' },
  { id: '27', src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=700&q=85', alt: 'Glowing patio lights', category: 'fairy-lights' },
  { id: '28', src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=700&q=85', alt: 'Golden hour terrace', category: 'fairy-lights' },
  { id: '29', src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=85', alt: 'Night scene DJ', category: 'fairy-lights' },

  // Events & Celebrations (4)
  { id: '30', src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&q=85', alt: 'Birthday celebration setup', category: 'events' },
  { id: '31', src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=85', alt: 'Corporate event setup', category: 'events' },
  { id: '32', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=85', alt: 'Party decorations', category: 'events' },
  { id: '33', src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=700&q=85', alt: 'Anniversary celebration', category: 'events' },
];

export const galleryCategories = [
  { id: 'all',          label: 'All' },
  { id: 'cabanas',      label: 'Cabanas' },
  { id: 'food',         label: 'Food & Drinks' },
  { id: 'music',        label: 'Live Music' },
  { id: 'fairy-lights', label: 'Nights & Fairy Lights' },
  { id: 'events',       label: 'Events & Celebrations' },
];
