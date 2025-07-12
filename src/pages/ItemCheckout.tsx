import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

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

const getAllItems = () => {
  const userItems = JSON.parse(localStorage.getItem('userItems') || '[]');
  return [...userItems, ...allItems];
};

export default function ItemCheckout() {
  const { user } = useAuth();
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<typeof allItems[0] | null>(null);
  const [userPoints, setUserPoints] = useState<number>(() => {
    return user?.user_metadata?.points || 100;
  });
  const [swapped, setSwapped] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const found = getAllItems().find(i => i.id === Number(itemId));
    setItem(found || null);
  }, [itemId]);

  const handleCheckout = () => {
    if (!item) return;
    if (swapped) return;
    if (userPoints < item.points) {
      setMessage('Not enough points to swap for this item.');
      return;
    }
    const newPoints = userPoints - item.points;
    setUserPoints(newPoints);
    // TODO: Update points in Supabase user metadata
    setSwapped(true);
    setMessage('Swap successful! The item is now yours.');
  };

  if (!item) {
    return <div className="min-h-screen flex items-center justify-center">Item not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-lg w-full p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img src={item.image} alt={item.title} className="w-48 h-64 object-cover rounded" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            <Badge className="mb-2">{item.condition}</Badge>
            <div className="mb-2 text-muted-foreground">Category: {item.category}</div>
            <div className="mb-2 text-muted-foreground">Size: {item.size}</div>
            <div className="mb-2 text-muted-foreground">By {item.user}</div>
            <div className="mb-4 text-primary font-semibold">Your Points: {userPoints}</div>
            {message && <div className={`mb-4 ${swapped ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
            <Button onClick={handleCheckout} disabled={swapped || userPoints < item.points} className="mb-4 w-full">
              {swapped ? 'Swapped!' : `Swap for ${item.points} pts`}
            </Button>
            <Link to="/browse" className="block mt-4 text-primary underline">Back to Browse</Link>
          </div>
        </div>
      </Card>
    </div>
  );
} 