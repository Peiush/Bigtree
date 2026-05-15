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
}

export const menuItems: MenuItem[] = [
  {
    id: '1', name: 'Crispy Corn Chaat', description: 'Golden fried corn tossed with chaat masala, fresh herbs and tangy tamarind',
    price: 249, category: 'starters', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80',
    tags: ['veg', 'bestseller']
  },
  {
    id: '2', name: 'Tandoori Mushroom Tikka', description: 'Smoky char-grilled mushrooms marinated in spiced yoghurt, mint chutney',
    price: 299, category: 'starters', isVeg: true, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80',
  },
  {
    id: '3', name: 'Chicken Malai Seekh', description: 'Minced chicken with cream cheese, herbs, grilled in tandoor to perfection',
    price: 349, category: 'starters', isVeg: false, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400&q=80',
  },
  {
    id: '4', name: 'Dal Makhani', description: 'Slow-cooked black lentils in rich tomato butter sauce, overnight simmered',
    price: 349, category: 'mains', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
  },
  {
    id: '5', name: 'Butter Chicken', description: 'Classic Punjabi murgh makhani in velvety tomato-cashew gravy',
    price: 399, category: 'mains', isVeg: false, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80',
  },
  {
    id: '6', name: 'Big Tree Wood-Fired Pizza', description: 'Thin crust pizza with truffle oil, mozzarella, wild mushrooms and arugula',
    price: 449, category: 'mains', isVeg: true, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
  },
  {
    id: '7', name: 'Grilled Lamb Chops', description: 'French-trimmed lamb chops marinated in rosemary and garlic, served with mint jus',
    price: 799, category: 'mains', isVeg: false, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
  },
  {
    id: '8', name: 'Chocolate Fondant', description: 'Warm Belgian chocolate lava cake with vanilla ice cream and berry coulis',
    price: 299, category: 'desserts', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80',
  },
  {
    id: '9', name: 'Kulfi Falooda', description: 'Traditional Indian frozen dessert with rose syrup, basil seeds and vermicelli',
    price: 199, category: 'desserts', isVeg: true,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80',
  },
  {
    id: '10', name: 'Mango Mojito', description: 'Fresh Alphonso mango, mint, lime and soda — the taste of an Indian summer',
    price: 199, category: 'beverages', isVeg: true, isBestseller: true,
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80',
  },
  {
    id: '11', name: 'Forest Iced Tea', description: 'Cold brew green tea infused with lemongrass, ginger and honey',
    price: 179, category: 'beverages', isVeg: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
  },
  {
    id: '12', name: 'Vegan Buddha Bowl', description: 'Quinoa, roasted vegetables, avocado, chickpeas and tahini dressing',
    price: 449, category: 'vegan', isVeg: true, isChefPick: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  },
];

export const categories = [
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'mains', label: 'Mains', icon: '🍽' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'beverages', label: 'Beverages', icon: '🍹' },
  { id: 'vegan', label: 'Vegan Special', icon: '🌱' },
];
