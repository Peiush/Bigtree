export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'beverages' | 'vegan';
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isChefPick?: boolean;
  tags?: string[];
  // Detail fields
  ingredients: string[];
  allergens: string[];
  serves: number;
  prepTime: string;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra-hot';
  calories?: number;
  story?: string;
}

export const menuItems: MenuItem[] = [
  {
    id: '1', name: 'Crispy Corn Chaat', description: 'Golden fried corn tossed with chaat masala, fresh herbs and tangy tamarind',
    price: 249, category: 'starters', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80',
    tags: ['veg', 'bestseller'],
    ingredients: ['Sweet corn kernels', 'Chaat masala', 'Tamarind chutney', 'Green chutney', 'Red onion', 'Fresh coriander', 'Pomegranate seeds', 'Sev', 'Lime juice', 'Rock salt'],
    allergens: ['Gluten (sev)'],
    serves: 2, prepTime: '15 min', spiceLevel: 'medium', calories: 310,
    story: 'A street-food classic reimagined — we fry the corn to a perfect golden crisp before tossing it tableside so every bite crackles.',
  },
  {
    id: '2', name: 'Tandoori Mushroom Tikka', description: 'Smoky char-grilled mushrooms marinated in spiced yoghurt, mint chutney',
    price: 299, category: 'starters', isVeg: true, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80',
    ingredients: ['Button mushrooms', 'Hung curd', 'Kashmiri red chilli', 'Ginger-garlic paste', 'Garam masala', 'Carom seeds', 'Mustard oil', 'Kasuri methi', 'Lime', 'Chaat masala'],
    allergens: ['Dairy (yoghurt)'],
    serves: 2, prepTime: '20 min', spiceLevel: 'medium', calories: 265,
    story: 'Chef Raghav marinates the mushrooms overnight so every pore absorbs the spiced yoghurt before they hit the 450 °C tandoor.',
  },
  {
    id: '3', name: 'Chicken Malai Seekh', description: 'Minced chicken with cream cheese, herbs, grilled in tandoor to perfection',
    price: 349, category: 'starters', isVeg: false, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&q=80',
    ingredients: ['Minced chicken', 'Cream cheese', 'Fresh coriander', 'Green chilli', 'Ginger', 'White pepper', 'Cardamom', 'Mace', 'Cashew paste', 'Garam masala'],
    allergens: ['Dairy', 'Tree nuts (cashew)'],
    serves: 2, prepTime: '25 min', spiceLevel: 'mild', calories: 420,
    story: 'The melt-in-mouth texture comes from freshly made cream cheese folded into the mince — a recipe borrowed from Old Delhi kebab houses.',
  },
  {
    id: '4', name: 'Dal Makhani', description: 'Slow-cooked black lentils in rich tomato butter sauce, overnight simmered',
    price: 349, category: 'mains', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
    ingredients: ['Whole black urad dal', 'Rajma', 'Butter', 'Fresh cream', 'Tomato purée', 'Ginger', 'Garlic', 'Kashmiri chilli', 'Cumin', 'Garam masala', 'Kasuri methi'],
    allergens: ['Dairy'],
    serves: 2, prepTime: '12 hr slow cook', spiceLevel: 'mild', calories: 480,
    story: 'Our dal simmers on a wood-fire overnight — never less than 12 hours — finished with hand-churned butter from our dairy partner in Karnal.',
  },
  {
    id: '5', name: 'Butter Chicken', description: 'Classic Punjabi murgh makhani in velvety tomato-cashew gravy',
    price: 399, category: 'mains', isVeg: false, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80',
    ingredients: ['Tandoori chicken', 'Tomato', 'Cashew paste', 'Butter', 'Fresh cream', 'Cardamom', 'Cloves', 'Kashmiri chilli', 'Honey', 'Fenugreek leaves', 'Ginger-garlic paste'],
    allergens: ['Dairy', 'Tree nuts (cashew)'],
    serves: 2, prepTime: '35 min', spiceLevel: 'mild', calories: 560,
    story: 'We grill the chicken in the tandoor first, then let it finish inside the makhani gravy so it soaks up every layer of flavour.',
  },
  {
    id: '6', name: 'Big Tree Wood-Fired Pizza', description: 'Thin crust pizza with truffle oil, mozzarella, wild mushrooms and arugula',
    price: 449, category: 'mains', isVeg: true, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    ingredients: ['Wood-fired dough', 'Fresh mozzarella', 'Wild mushroom medley', 'White truffle oil', 'Rocket/arugula', 'Shaved parmesan', 'Garlic confit', 'Cracked black pepper', 'Maldon sea salt'],
    allergens: ['Gluten', 'Dairy'],
    serves: 2, prepTime: '18 min', spiceLevel: 'mild', calories: 620,
    story: 'Baked at 480 °C in our oak-wood oven for 90 seconds — the same technique used in Naples. Truffle oil is drizzled cold, after baking, to preserve its aroma.',
  },
  {
    id: '7', name: 'Grilled Lamb Chops', description: 'French-trimmed lamb chops marinated in rosemary and garlic, served with mint jus',
    price: 799, category: 'mains', isVeg: false, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
    ingredients: ['Lamb rack chops', 'Fresh rosemary', 'Garlic', 'Dijon mustard', 'Olive oil', 'Thyme', 'Shallots', 'Lamb jus', 'Fresh mint', 'Cracked pepper', 'Fleur de sel'],
    allergens: ['Mustard'],
    serves: 2, prepTime: '30 min', spiceLevel: 'mild', calories: 740,
    story: 'Sourced from free-range Rajasthan black-belly lambs, the chops rest for 8 minutes after grilling so they arrive at the table perfectly pink inside.',
  },
  {
    id: '8', name: 'Chocolate Fondant', description: 'Warm Belgian chocolate lava cake with vanilla ice cream and berry coulis',
    price: 299, category: 'desserts', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80',
    ingredients: ['70 % Belgian dark chocolate', 'Butter', 'Eggs', 'Caster sugar', 'Plain flour', 'Vanilla bean ice cream', 'Mixed berry coulis', 'Powdered sugar'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    serves: 1, prepTime: '12 min', spiceLevel: undefined, calories: 520,
    story: 'Baked to order in individual ramekins — the centre stays liquid only when pulled at exactly 11 minutes. We time it to the second.',
  },
  {
    id: '9', name: 'Kulfi Falooda', description: 'Traditional Indian frozen dessert with rose syrup, basil seeds and vermicelli',
    price: 199, category: 'desserts', isVeg: true,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80',
    ingredients: ['Full-fat milk kulfi', 'Rose syrup', 'Basil seeds (sabja)', 'Rooh Afza', 'Rice vermicelli', 'Pistachios', 'Almonds', 'Rose water', 'Chilled milk'],
    allergens: ['Dairy', 'Tree nuts', 'Gluten'],
    serves: 1, prepTime: '8 min (+ overnight freeze)', spiceLevel: undefined, calories: 380,
    story: 'Our kulfi is set in traditional conical moulds and frozen for 18 hours. Each falooda is assembled fresh so the vermicelli stays perfectly springy.',
  },
  {
    id: '10', name: 'Mango Mojito', description: 'Fresh Alphonso mango, mint, lime and soda — the taste of an Indian summer',
    price: 199, category: 'beverages', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80',
    ingredients: ['Fresh Alphonso mango pulp', 'Mint leaves', 'Lime juice', 'Sugar syrup', 'Sparkling water', 'Crushed ice', 'Lime wedge', 'Mint sprig'],
    allergens: [],
    serves: 1, prepTime: '5 min', spiceLevel: undefined, calories: 180,
    story: 'We source Ratnagiri Alphonsos during peak season (April–June) and freeze the pulp at its peak so you taste summer in every sip, year-round.',
  },
  {
    id: '11', name: 'Forest Iced Tea', description: 'Cold brew green tea infused with lemongrass, ginger and honey',
    price: 179, category: 'beverages', isVeg: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    ingredients: ['Cold-brew green tea', 'Lemongrass', 'Fresh ginger', 'Raw honey', 'Lime juice', 'Sparkling water', 'Cucumber slices', 'Ice'],
    allergens: [],
    serves: 1, prepTime: '8 min (+ 8 hr cold brew)', spiceLevel: undefined, calories: 95,
    story: 'Brewed cold for 8 hours to extract the sweetness of the leaf without any bitterness. The lemongrass is bruised, never boiled, keeping its floral oils intact.',
  },
  {
    id: '12', name: 'Vegan Buddha Bowl', description: 'Quinoa, roasted vegetables, avocado, chickpeas and tahini dressing',
    price: 449, category: 'vegan', isVeg: true, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    ingredients: ['Tri-colour quinoa', 'Roasted chickpeas', 'Avocado', 'Roasted sweet potato', 'Edamame', 'Purple cabbage', 'Cucumber', 'Cherry tomatoes', 'Tahini dressing', 'Toasted sesame seeds', 'Lemon zest'],
    allergens: ['Sesame (tahini)'],
    serves: 1, prepTime: '20 min', spiceLevel: 'mild', calories: 510,
    story: 'Every ingredient is sourced within 200 km of Gurgaon. The tahini is stone-ground in-house each morning for the freshest possible dressing.',
  },
];

export const categories = [
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'mains', label: 'Mains', icon: '🍽' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'beverages', label: 'Beverages', icon: '🍹' },
  { id: 'vegan', label: 'Vegan Special', icon: '🌱' },
];
