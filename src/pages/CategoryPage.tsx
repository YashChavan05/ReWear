import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Images chosen to match item names/types as closely as possible
const allItems = [
  // Tops
  {
    id: 1,
    title: 'Silk Blouse',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop', // silk blouse
    category: 'tops',
    size: 'S',
    condition: 'Like New',
    points: 35,
    user: 'Maya L.'
  },
  {
    id: 2,
    title: 'Striped Cotton Tee',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop', // striped tee
    category: 'tops',
    size: 'M',
    condition: 'Excellent',
    points: 20,
    user: 'Alex R.'
  },
  {
    id: 3,
    title: 'Oversized Hoodie',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop', // hoodie
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
    image: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?w=400&h=500&fit=crop', // floral dress
    category: 'dresses',
    size: 'S',
    condition: 'Like New',
    points: 40,
    user: 'Emma K.'
  },
  {
    id: 5,
    title: 'Red Evening Gown',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=500&fit=crop', // red gown
    category: 'dresses',
    size: 'M',
    condition: 'Excellent',
    points: 60,
    user: 'Sarah M.'
  },
  {
    id: 6,
    title: 'Casual Shirt Dress',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=500&fit=crop', // shirt dress
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
    image: 'https://images.unsplash.com/photo-1514995669114-d1c1b7a83a48?w=400&h=500&fit=crop', // jeans
    category: 'bottoms',
    size: 'M',
    condition: 'Excellent',
    points: 35,
    user: 'Riley S.'
  },
  {
    id: 8,
    title: 'Black Leggings',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop', // leggings
    category: 'bottoms',
    size: 'S',
    condition: 'Like New',
    points: 18,
    user: 'Taylor W.'
  },
  {
    id: 9,
    title: 'Plaid Skirt',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop', // plaid skirt
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
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=500&fit=crop', // white sneakers
    category: 'shoes',
    size: '8',
    condition: 'Good',
    points: 28,
    user: 'Jordan T.'
  },
  {
    id: 11,
    title: 'Leather Ankle Boots',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=500&fit=crop', // ankle boots
    category: 'shoes',
    size: '7',
    condition: 'Excellent',
    points: 50,
    user: 'Alex R.'
  },
  {
    id: 12,
    title: 'Strappy Sandals',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=500&fit=crop', // sandals
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
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=500&fit=crop', // leather belt
    category: 'accessories',
    size: '-',
    condition: 'Excellent',
    points: 15,
    user: 'Sarah M.'
  },
  {
    id: 14,
    title: 'Silk Scarf',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=500&fit=crop', // silk scarf
    category: 'accessories',
    size: '-',
    condition: 'Like New',
    points: 12,
    user: 'Maya L.'
  },
  {
    id: 15,
    title: 'Statement Earrings',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=500&fit=crop', // earrings
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
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop', // denim jacket
    category: 'outerwear',
    size: 'M',
    condition: 'Excellent',
    points: 45,
    user: 'Sarah M.'
  },
  {
    id: 17,
    title: 'Cozy Knit Sweater',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop', // knit sweater
    category: 'outerwear',
    size: 'L',
    condition: 'Excellent',
    points: 30,
    user: 'Maya L.'
  },
  {
    id: 18,
    title: 'Black Blazer',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=500&fit=crop', // black blazer
    category: 'outerwear',
    size: 'M',
    condition: 'Like New',
    points: 55,
    user: 'Riley S.'
  }
];

const categoryNames: Record<string, string> = {
  tops: 'Tops',
  dresses: 'Dresses',
  bottoms: 'Bottoms',
  shoes: 'Shoes',
  accessories: 'Accessories',
  outerwear: 'Outerwear',
};

const getAllItems = () => {
  const userItems = JSON.parse(localStorage.getItem('userItems') || '[]');
  return [...userItems, ...allItems];
};

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [items, setItems] = useState<typeof allItems>([]);

  useEffect(() => {
    setItems(getAllItems().filter(item => item.category.toLowerCase() === categorySlug));
  }, [categorySlug]);

  const categoryTitle = categoryNames[categorySlug || ''] || 'Category';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground">No items found in this category.</p>
        ) : (
          <div className="elegant-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map(item => (
              <Link key={item.id} to={`/checkout/${item.id}`}>
                <Card className="pascale-card cursor-pointer overflow-hidden group">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground border-0 font-light">{item.condition}</Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
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
        <div className="mt-8">
          <Link to="/browse">
            <Button variant="outline">Back to Browse</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 