
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, Share2, Flag, MessageCircle, Star, MapPin, Calendar, ShoppingBag, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swapMessage, setSwapMessage] = useState('');

  // Mock item data - in real app this would be fetched from API
  const item = {
    id: parseInt(id || '1'),
    title: "Vintage Denim Jacket",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&h=800&fit=crop"
    ],
    category: "Jackets",
    size: "M",
    condition: "Excellent",
    points: 45,
    likes: 23,
    description: `Beautiful vintage denim jacket in excellent condition. This classic piece features:

• Premium denim construction
• Vintage wash and fading
• Functional chest and waist pockets
• Classic button closure
• Timeless style that never goes out of fashion

Perfect for layering or wearing on its own. Has been well cared for and shows minimal signs of wear. From a smoke-free, pet-free home.

Measurements:
- Chest: 42"
- Length: 24"
- Sleeve: 25"

Happy to answer any questions or provide additional photos!`,
    tags: ["vintage", "denim", "classic", "sustainable"],
    location: "San Francisco, CA",
    postedDate: "2024-01-15",
    status: "available",
    user: {
      name: "Sarah Martinez",
      rating: 4.8,
      totalRatings: 127,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c2e9e5e7?w=100&h=100&fit=crop&crop=face",
      joinedDate: "2023-03-15",
      location: "San Francisco, CA",
      bio: "Fashion lover and sustainability advocate. I believe in giving clothes a second life!",
      totalListings: 23,
      completedSwaps: 18
    }
  };

  const relatedItems = [
    {
      id: 2,
      title: "Classic Denim Shirt",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
      points: 35,
      condition: "Good"
    },
    {
      id: 3,
      title: "Vintage Leather Jacket",
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=300&h=400&fit=crop",
      points: 65,
      condition: "Excellent"
    },
    {
      id: 4,
      title: "Denim Overalls",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=400&fit=crop",
      points: 40,
      condition: "Like New"
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Item removed from your favorites list" : "Item added to your favorites list"
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Item link copied to clipboard"
    });
  };

  const handleSwapRequest = () => {
    console.log('Swap request:', { itemId: item.id, message: swapMessage });
    toast({
      title: "Swap request sent!",
      description: "Sarah will be notified of your swap request"
    });
    setSwapMessage('');
  };

  const handleRedeemWithPoints = () => {
    const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
    if (userPoints >= item.points) {
      localStorage.setItem('userPoints', (userPoints - item.points).toString());
      toast({
        title: "Item redeemed!",
        description: `You've successfully redeemed this item for ${item.points} points`
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Insufficient points",
        description: `You need ${item.points - userPoints} more points to redeem this item`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant={isLiked ? "default" : "secondary"}
                  onClick={handleLike}
                  className="bg-white/90 hover:bg-white dark:bg-black/90 dark:hover:bg-black"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleShare}
                  className="bg-white/90 hover:bg-white dark:bg-black/90 dark:hover:bg-black"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {item.images.length > 1 && (
              <div className="flex space-x-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <span className="capitalize">{item.category}</span>
                    <span>•</span>
                    <span>Size {item.size}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Listed Jan 15</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-2xl font-bold text-accent-foreground">
                    <ShoppingBag className="h-6 w-6" />
                    <span>{item.points} points</span>
                  </div>
                  <Badge className="mt-2">{item.condition}</Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </div>

            {/* User Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={item.user.avatar} />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.user.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span>{item.user.rating} ({item.user.totalRatings} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.user.location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{item.user.bio}</p>
                  </div>
                  <Link to={`/profile/${item.user.name}`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full btn-primary" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Request Swap
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Item Swap</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Send a message to {item.user.name} about swapping this item.
                    </p>
                    <Textarea
                      placeholder="Hi! I'm interested in swapping this item. I have..."
                      value={swapMessage}
                      onChange={(e) => setSwapMessage(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleSwapRequest} className="w-full">
                      Send Swap Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={handleRedeemWithPoints}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Redeem with Points ({item.points} pts)
              </Button>
            </div>

            {/* Report Button */}
            <div className="pt-4 border-t">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Flag className="h-4 w-4 mr-2" />
                Report this listing
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {item.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Items */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map((relatedItem) => (
              <Link key={relatedItem.id} to={`/item/${relatedItem.id}`}>
                <Card className="overflow-hidden card-hover cursor-pointer">
                  <div className="relative">
                    <img
                      src={relatedItem.image}
                      alt={relatedItem.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3">{relatedItem.condition}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm">{relatedItem.title}</h3>
                      <div className="flex items-center space-x-1 text-accent-foreground">
                        <ShoppingBag className="h-3 w-3" />
                        <span className="text-sm font-medium">{relatedItem.points}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
