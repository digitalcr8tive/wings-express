export const flavors = {
  wet: ['Honey Hot', 'Honey Mustard', 'Buffalo', 'Honey BBQ', 'Garlic', 'Hot Lemon Pepper', 'Lemon Pepper'],
  dry: ['Cajun', 'Ranch', 'Homestyle', 'Cajun Ranch', 'Lemon Pepper']
};

export const sides = ['Fries', 'Roll', 'Fried Pickles', '5 Fried Mozzarella Sticks'];
export const drinks = ['Soft Drink', 'Water'];

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'combos' | 'wings' | 'fish' | 'sides' | 'drinks' | 'catering';
  configurable?: boolean;
  maxFlavors?: number;
  chooseSide?: boolean;
  chooseDrink?: boolean;
  catering?: boolean;
};

export const menu: MenuItem[] = [
  { id: 'combo-6', name: '6 pc Wing Combo', price: 12, description: '1 flavor, side, drink, ranch and a roll', category: 'combos', configurable: true, maxFlavors: 1, chooseSide: true, chooseDrink: true },
  { id: 'combo-8', name: '8 pc Wing Combo', price: 14, description: '1 flavor, side, drink, ranch and a roll', category: 'combos', configurable: true, maxFlavors: 1, chooseSide: true, chooseDrink: true },
  { id: 'combo-10', name: '10 pc Wing Combo', price: 16, description: '1 flavor, side, drink, ranch and a roll', category: 'combos', configurable: true, maxFlavors: 1, chooseSide: true, chooseDrink: true },
  { id: 'combo-20', name: '20 pc Wing Combo', price: 27, description: 'Up to 2 flavors, side, drink, 2 ranch and 2 rolls', category: 'combos', configurable: true, maxFlavors: 2, chooseSide: true, chooseDrink: true },
  { id: 'wings-6', name: '6 pc Wings', price: 10, description: '1 flavor, ranch and a roll', category: 'wings', configurable: true, maxFlavors: 1 },
  { id: 'wings-10', name: '10 pc Wings', price: 13, description: '1 flavor, ranch and a roll', category: 'wings', configurable: true, maxFlavors: 1 },
  { id: 'wings-20', name: '20 pc Wings', price: 25, description: 'Up to 2 flavors, 2 ranch and 2 rolls', category: 'wings', configurable: true, maxFlavors: 2 },
  { id: 'wings-35', name: '35 pc Wings', price: 42, description: 'Up to 3 flavors, 4 ranch and 4 rolls', category: 'wings', configurable: true, maxFlavors: 3 },
  { id: 'fish-2', name: '2 pc Fish Dinner', price: 16, description: '2 sides, 2 pieces of bread and hushpuppies', category: 'fish', configurable: true, maxFlavors: 2, chooseSide: true },
  { id: 'fish-3', name: '3 pc Fish Dinner', price: 18, description: '2 sides, 2 pieces of bread and hushpuppies', category: 'fish', configurable: true, maxFlavors: 2, chooseSide: true },
  { id: 'fish-4', name: '4 pc Fish Dinner', price: 20, description: '2 sides, 2 pieces of bread and hushpuppies', category: 'fish', configurable: true, maxFlavors: 2, chooseSide: true },
  { id: 'tenders', name: 'Chicken Tender Dinner', price: 15, description: '3 flavored tenders, side, ranch and a roll. Add tenders for $2 each.', category: 'fish', configurable: true, maxFlavors: 2, chooseSide: true },
  { id: 'fries-small', name: 'Fries, small', price: 4, description: 'Fresh side order', category: 'sides' },
  { id: 'fries-large', name: 'Fries, large', price: 7, description: 'Fresh side order', category: 'sides' },
  { id: 'pickles-small', name: 'Fried Pickles, small', price: 4, description: 'Crispy fried pickles', category: 'sides' },
  { id: 'pickles-large', name: 'Fried Pickles, large', price: 7, description: 'Crispy fried pickles', category: 'sides' },
  { id: 'mozz-5', name: '5 Fried Mozzarella Sticks', price: 7, description: 'Crispy mozzarella sticks', category: 'sides' },
  { id: 'mozz-7', name: '7 Fried Mozzarella Sticks', price: 12, description: 'Crispy mozzarella sticks', category: 'sides' },
  { id: 'rolls', name: 'Extra Rolls / Bread', price: 1, description: '2 rolls or extra bread', category: 'sides' },
  { id: 'ranch', name: 'Extra Ranch', price: 1, description: 'Side of ranch', category: 'sides' },
  { id: 'sauce', name: 'Extra Sauce', price: 1, description: 'Choose a flavor', category: 'sides', configurable: true, maxFlavors: 1 },
  { id: 'soft-drink', name: 'Soft Drink', price: 1, description: 'Cold soft drink', category: 'drinks' },
  { id: 'water', name: 'Water', price: 1, description: 'Bottled water', category: 'drinks' },
  { id: 'catering-50', name: '50 pc Wing Platter', price: 60, description: 'Up to 4 flavors, 6 ranch and 6 rolls', category: 'catering', catering: true },
  { id: 'catering-75', name: '75 pc Wing Platter', price: 85, description: 'Up to 5 flavors, 9 ranch and 9 rolls', category: 'catering', catering: true },
  { id: 'catering-100', name: '100 pc Wing Platter', price: 115, description: 'Up to 5 flavors, 9 ranch and 9 rolls', category: 'catering', catering: true }
];

export const categories = [
  { id: 'combos', label: 'Wing Combos' },
  { id: 'wings', label: 'Wings Only' },
  { id: 'fish', label: 'Fish & Chicken' },
  { id: 'sides', label: 'Sides & Drinks' },
  { id: 'catering', label: 'Catering' }
];
