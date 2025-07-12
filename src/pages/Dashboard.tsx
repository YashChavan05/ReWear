
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, MessageCircle, Plus, Settings, Star, Calendar, MapPin, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

// At the top, add a function to get/set user profile from localStorage
const getStoredProfile = () => {
  const stored = localStorage.getItem('userProfile');
  if (stored) return JSON.parse(stored);
  return null;
};
const setStoredProfile = (profile: any) => {
  localStorage.setItem('userProfile', JSON.stringify(profile));
};

export default function Dashboard() {
  const { user: authUser, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !authUser) {
      navigate('/login');
    }
  }, [authUser, loading, navigate]);

  const [userProfile, setUserProfile] = useState(() => {
    const stored = getStoredProfile();
    return stored || {
      name: authUser?.user_metadata?.name || "Alex Johnson",
      email: authUser?.email || "alex.johnson@email.com",
      avatar: authUser?.user_metadata?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: authUser?.user_metadata?.location || "San Francisco, CA",
      bio: authUser?.user_metadata?.bio || "Sustainable fashion enthusiast and regular swapper. Love finding unique vintage pieces!",
      joinedDate: authUser?.user_metadata?.joinedDate || "2023-06-15",
      totalPoints: authUser?.user_metadata?.points || 250,
      totalListings: authUser?.user_metadata?.totalListings || 12,
      completedSwaps: authUser?.user_metadata?.completedSwaps || 8,
      rating: authUser?.user_metadata?.rating || 4.9,
      totalRatings: authUser?.user_metadata?.totalRatings || 27
    };
  });
  // Controlled state for edit profile dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editLocation, setEditLocation] = useState(userProfile.location);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [myListings] = useState([
    {
      id: 1,
      title: "Vintage Band T-Shirt",
      image: "/cottontee.jpg",
      category: "Tops",
      size: "M",
      condition: "Good",
      points: 25,
      status: "active",
      views: 42,
      likes: 8,
      postedDate: "2024-01-10"
    },
    {
      id: 2,
      title: "Designer Jeans",
      image: "/highwaistheans.jpg",
      category: "Bottoms",
      size: "32",
      condition: "Excellent",
      points: 45,
      status: "pending",
      views: 67,
      likes: 15,
      postedDate: "2024-01-08"
    },
    {
      id: 3,
      title: "Wool Winter Coat",
      image: "/jacket.jpg",
      category: "Outerwear",
      size: "L",
      condition: "Like New",
      points: 75,
      status: "swapped",
      views: 89,
      likes: 23,
      postedDate: "2024-01-05"
    }
  ]);

  const [swapRequests] = useState([
    {
      id: 1,
      type: "received",
      itemTitle: "Vintage Band T-Shirt",
      otherUser: {
        name: "Sarah M.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c2e9e5e7?w=100&h=100&fit=crop&crop=face",
        rating: 4.8
      },
      message: "Hi! I love this vintage tee. I have a similar style denim jacket that might interest you. Would you be open to a swap?",
      status: "pending",
      date: "2024-01-12"
    },
    {
      id: 2,
      type: "sent",
      itemTitle: "Floral Summer Dress",
      otherUser: {
        name: "Emma K.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.9
      },
      message: "I'm interested in swapping my designer boots for your dress. They're in excellent condition!",
      status: "accepted",
      date: "2024-01-10"
    }
  ]);

  const [favorites] = useState([
    {
      id: 4,
      title: "Vintage Leather Jacket",
      image: "/jacket.jpg",
      category: "Outerwear",
      points: 85,
      condition: "Excellent",
      user: "Riley S."
    },
    {
      id: 5,
      title: "Silk Blouse",
      image: "/silkblouse.jpg",
      category: "Tops",
      points: 35,
      condition: "Like New",
      user: "Maya L."
    }
  ]);

  const [pointsHistory] = useState([
    { id: 1, type: "earned", amount: +50, description: "Listed: Wool Winter Coat", date: "2024-01-05" },
    { id: 2, type: "earned", amount: +25, description: "Completed swap with Sarah M.", date: "2024-01-03" },
    { id: 3, type: "spent", amount: -30, description: "Redeemed: Vintage Scarf", date: "2024-01-01" },
    { id: 4, type: "earned", amount: +15, description: "Profile completion bonus", date: "2023-12-28" }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'swapped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Get user-listed items from localStorage
  const getUserListings = () => {
    return JSON.parse(localStorage.getItem('userItems') || '[]');
  };
  const userListings = getUserListings();
  const listingsToShow = userListings.length > 0 ? userListings : myListings;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                      <p className="text-muted-foreground">{userProfile.email}</p>
                    </div>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => {
                          setEditName(userProfile.name);
                          setEditLocation(userProfile.location);
                          setEditBio(userProfile.bio);
                          setEditAvatar(userProfile.avatar);
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex flex-col items-center space-y-2">
                            <img src={editAvatar} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border" />
                            <input type="file" accept="image/*" onChange={handleAvatarChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="edit-profile-name" value={editName} onChange={e => setEditName(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="edit-profile-location" value={editLocation} onChange={e => setEditLocation(e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="edit-profile-bio" value={editBio} onChange={e => setEditBio(e.target.value)} rows={3} />
                          </div>
                          <Button className="w-full" onClick={() => {
                            const updated = { ...userProfile, name: editName, location: editLocation, bio: editBio, avatar: editAvatar };
                            setUserProfile(updated);
                            setStoredProfile(updated);
                            setEditOpen(false);
                          }}>
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="font-medium">{userProfile.rating}</span>
                    <span className="text-muted-foreground">({userProfile.totalRatings} reviews)</span>
                    <span className="text-muted-foreground">•</span>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{userProfile.location}</span>
                  </div>

                  <p className="text-muted-foreground mb-6">{userProfile.bio}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-foreground">{userProfile.totalPoints}</div>
                      <div className="text-sm text-muted-foreground">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userProfile.totalListings}</div>
                      <div className="text-sm text-muted-foreground">Listed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{userProfile.completedSwaps}</div>
                      <div className="text-sm text-muted-foreground">Swapped</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">
                        {new Date().getFullYear() - new Date(userProfile.joinedDate).getFullYear()}y
                      </div>
                      <div className="text-sm text-muted-foreground">Member</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="swaps">Swap Requests</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="points">Points History</TabsTrigger>
          </TabsList>

          {/* My Listings */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Listings</h2>
              <Link to="/add-item">
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listingsToShow.map((item: any) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <img src={item.images ? item.images[0] || item.image : item.image} alt={item.title} className="w-full h-64 object-cover" />
                    <Badge className="absolute top-3 left-3">{item.condition}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Size: {item.size}</span>
                      <span>{item.points} pts</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Category: {item.category}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Swap Requests */}
          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-bold">Swap Requests</h2>
            
            <div className="space-y-4">
              {swapRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={request.otherUser.avatar} />
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{request.otherUser.name}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-current text-yellow-400" />
                                <span className="text-sm">{request.otherUser.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {request.type === 'received' ? 'wants to swap' : 'you requested'} "{request.itemTitle}"
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                              {request.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(request.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{request.message}</p>
                        {request.status === 'pending' && request.type === 'received' && (
                          <div className="flex space-x-2">
                            <Button size="sm" className="btn-primary">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-6">
            <h2 className="text-2xl font-bold">Favorite Items</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <Link key={item.id} to={`/item/${item.id}`}>
                  <Card className="overflow-hidden card-hover cursor-pointer">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4 fill-current text-red-500" />
                        </Button>
                      </div>
                      <Badge className="absolute top-3 left-3">{item.condition}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center space-x-1 text-accent-foreground">
                          <ShoppingBag className="h-4 w-4" />
                          <span className="font-medium">{item.points}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.category} • by {item.user}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Points History */}
          <TabsContent value="points" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Points History</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-foreground">{userProfile.totalPoints} points</div>
                <div className="text-sm text-muted-foreground">Current balance</div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pointsHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          transaction.type === 'earned' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                        transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
