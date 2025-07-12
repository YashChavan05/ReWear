
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Using local images from public folder
const allItems = [
  // Tops
  {
    id: 1,
    title: 'Silk Blouse',
    image: '/silkblouse.jpg',
    category: 'tops',
    size: 'S',
    condition: 'Like New',
    points: 35,
    user: 'Maya L.'
  },
  {
    id: 2,
    title: 'Striped Cotton Tee',
    image: '/cottontee.jpg',
    category: 'tops',
    size: 'M',
    condition: 'Excellent',
    points: 20,
    user: 'Alex R.'
  },
  {
    id: 3,
    title: 'Oversized Hoodie',
    image: '/hoodie.jpg',
    category: 'tops',
    size: 'L',
    condition: 'Good',
    points: 25,
    user: 'Jordan T.'
  },
  // Dresses
  {
    id: 4,
    title: 'Floral Summer Dress',
    image: '/summerdress.jpg',
    category: 'dresses',
    size: 'S',
    condition: 'Like New',
    points: 40,
    user: 'Emma K.'
  },
  {
    id: 5,
    title: 'Red Evening Gown',
    image: '/redgown.jpg',
    category: 'dresses',
    size: 'M',
    condition: 'Excellent',
    points: 60,
    user: 'Sarah M.'
  },
  {
    id: 6,
    title: 'Casual Shirt Dress',
    image: '/casualdress.jpg',
    category: 'dresses',
    size: 'L',
    condition: 'Good',
    points: 30,
    user: 'Olivia P.'
  },
  // Bottoms
  {
    id: 7,
    title: 'High-Waisted Jeans',
    image: '/highwaistheans.jpg',
    category: 'bottoms',
    size: 'M',
    condition: 'Excellent',
    points: 35,
    user: 'Riley S.'
  },
  {
    id: 8,
    title: 'Black Leggings',
    image: '/blackleggings.jpg',
    category: 'bottoms',
    size: 'S',
    condition: 'Like New',
    points: 18,
    user: 'Taylor W.'
  },
  {
    id: 9,
    title: 'Plaid Skirt',
    image: '/skirt.jpg',
    category: 'bottoms',
    size: 'M',
    condition: 'Good',
    points: 22,
    user: 'Morgan F.'
  },
  // Shoes
  {
    id: 10,
    title: 'Classic White Sneakers',
    image: '/sneakers.jpg',
    category: 'shoes',
    size: '8',
    condition: 'Good',
    points: 28,
    user: 'Jordan T.'
  },
  {
    id: 11,
    title: 'Leather Ankle Boots',
    image: '/ankleboots.jpg',
    category: 'shoes',
    size: '7',
    condition: 'Excellent',
    points: 50,
    user: 'Alex R.'
  },
  {
    id: 12,
    title: 'Strappy Sandals',
    image: '/sandals.jpg',
    category: 'shoes',
    size: '6',
    condition: 'Like New',
    points: 24,
    user: 'Emma K.'
  },
  // Accessories
  {
    id: 13,
    title: 'Vintage Leather Belt',
    image: '/belts.jpg',
    category: 'accessories',
    size: '-',
    condition: 'Excellent',
    points: 15,
    user: 'Sarah M.'
  },
  {
    id: 14,
    title: 'Silk Scarf',
    image: '/scarf.jpg',
    category: 'accessories',
    size: '-',
    condition: 'Like New',
    points: 12,
    user: 'Maya L.'
  },
  {
    id: 15,
    title: 'Statement Earrings',
    image: '/earrings.jpg',
    category: 'accessories',
    size: '-',
    condition: 'Good',
    points: 10,
    user: 'Olivia P.'
  },
  // Outerwear
  {
    id: 16,
    title: 'Vintage Denim Jacket',
    image: '/jacket.jpg',
    category: 'outerwear',
    size: 'M',
    condition: 'Excellent',
    points: 45,
    user: 'Sarah M.'
  },
  {
    id: 17,
    title: 'Cozy Knit Sweater',
    image: '/sweater.jpg',
    category: 'outerwear',
    size: 'L',
    condition: 'Excellent',
    points: 30,
    user: 'Maya L.'
  },
  {
    id: 18,
    title: 'Black Blazer',
    image: '/blackblazer.jpg',
    category: 'outerwear',
    size: 'M',
    condition: 'Like New',
    points: 55,
    user: 'Riley S.'
  }
];

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'tops', label: 'Tops' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'outerwear', label: 'Outerwear' },
];
const sizes = ['XS', 'S', 'M', 'L', 'XL', '7', '8', '9'];
const conditions = ['Like New', 'Excellent', 'Good'];

const getAllItems = () => {
  const userItems = JSON.parse(localStorage.getItem('userItems') || '[]');
  return [...userItems, ...allItems];
};

export default function Browse() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [filteredItems, setFilteredItems] = useState(getAllItems());

  useEffect(() => {
    let filtered = getAllItems();
    if (search) filtered = filtered.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    if (category) filtered = filtered.filter(item => item.category === category);
    if (size) filtered = filtered.filter(item => item.size === size);
    if (condition) filtered = filtered.filter(item => item.condition === condition);
    setFilteredItems(filtered);
  }, [search, category, size, condition]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse All Items</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="md:w-64 space-y-6">
            <div>
              <label className="block mb-2 font-medium">Search</label>
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items..." />
            </div>
            <div>
              <label className="block mb-2 font-medium">Category</label>
              <select className="w-full border rounded p-2" value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Size</label>
              <select className="w-full border rounded p-2" value={size} onChange={e => setSize(e.target.value)}>
                <option value="">All Sizes</option>
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Condition</label>
              <select className="w-full border rounded p-2" value={condition} onChange={e => setCondition(e.target.value)}>
                <option value="">All Conditions</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {/* Items Grid */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="text-center text-muted-foreground py-24">No items found. Try adjusting your filters.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map(item => (
                  <Link key={item.id} to={`/checkout/${item.id}`}>
                    <Card className="overflow-hidden card-hover cursor-pointer">
                      <div className="relative">
                        <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                        <Badge className="absolute top-3 left-3">{item.condition}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Size: {item.size}</span>
                          <span>{item.points} pts</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">By {item.user}</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
