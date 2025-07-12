
import { useState } from 'react';
import { Search, MoreHorizontal, Check, X, Eye, Trash2, Flag, Users, ShoppingBag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Admin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app this would come from API
  const [stats] = useState({
    totalUsers: 1247,
    activeListings: 456,
    pendingReviews: 23,
    reportedItems: 8
  });

  const [users] = useState([
    {
      id: 1,
      name: "Sarah Martinez",
      email: "sarah.m@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c2e9e5e7?w=100&h=100&fit=crop&crop=face",
      joinDate: "2023-03-15",
      totalListings: 23,
      completedSwaps: 18,
      rating: 4.8,
      status: "active",
      lastActive: "2024-01-15"
    },
    {
      id: 2,
      name: "Alex Johnson",
      email: "alex.j@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      joinDate: "2023-06-22",
      totalListings: 12,
      completedSwaps: 8,
      rating: 4.9,
      status: "active",
      lastActive: "2024-01-14"
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      joinDate: "2023-08-05",
      totalListings: 35,
      completedSwaps: 29,
      rating: 4.7,
      status: "suspended",
      lastActive: "2024-01-10"
    }
  ]);

  const [listings] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop",
      category: "Jackets",
      condition: "Excellent",
      points: 45,
      status: "pending",
      user: {
        name: "Sarah M.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c2e9e5e7?w=50&h=50&fit=crop&crop=face"
      },
      postedDate: "2024-01-15",
      views: 42,
      reports: 0
    },
    {
      id: 2,
      title: "Designer Handbag",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
      category: "Accessories",
      condition: "Like New",
      points: 85,
      status: "approved",
      user: {
        name: "Emma K.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
      },
      postedDate: "2024-01-12",
      views: 127,
      reports: 2
    },
    {
      id: 3,
      title: "Summer Floral Dress",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop",
      category: "Dresses",
      condition: "Good",
      points: 35,
      status: "rejected",
      user: {
        name: "Maya L.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face"
      },
      postedDate: "2024-01-10",
      views: 23,
      reports: 0
    }
  ]);

  const [swaps] = useState([
    {
      id: 1,
      item1: {
        title: "Vintage Band T-Shirt",
        user: "Alex J.",
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f8b22?w=100&h=100&fit=crop"
      },
      item2: {
        title: "Denim Jacket",
        user: "Sarah M.",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop"
      },
      status: "pending",
      initiatedDate: "2024-01-12",
      completedDate: null
    },
    {
      id: 2,
      item1: {
        title: "Designer Boots",
        user: "Emma K.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop"
      },
      item2: {
        title: "Silk Blouse",
        user: "Maya L.",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop"
      },
      status: "completed",
      initiatedDate: "2024-01-08",
      completedDate: "2024-01-10"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'suspended':
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user ${userId}`);
    // In real app, make API call
  };

  const handleListingAction = (listingId: number, action: string) => {
    console.log(`${action} listing ${listingId}`);
    // In real app, make API call
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, listings, and platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold">{stats.activeListings}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold">{stats.pendingReviews}</p>
                </div>
                <Eye className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reported Items</p>
                  <p className="text-2xl font-bold">{stats.reportedItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="listings">Manage Listings</TabsTrigger>
            <TabsTrigger value="swaps">Manage Swaps</TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{user.totalListings} listings</div>
                              <div className="text-muted-foreground">{user.completedSwaps} swaps</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">{user.rating}</span>
                              <span className="text-muted-foreground text-sm">★</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {new Date(user.lastActive).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, 'view')}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, 'suspend')}>
                                  <X className="h-4 w-4 mr-2" />
                                  {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction(user.id, 'delete')}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listings Management */}
          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Management</CardTitle>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search listings..."
                      className="pl-10"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Listings</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {listings.map((listing) => (
                        <TableRow key={listing.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                              <div>
                                <div className="font-medium">{listing.title}</div>
                                <div className="text-sm text-muted-foreground">{listing.condition}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={listing.user.avatar} />
                                <AvatarFallback>{listing.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{listing.user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{listing.category}</TableCell>
                          <TableCell>{listing.points} pts</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(listing.status)}>
                              {listing.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {listing.reports > 0 ? (
                              <div className="flex items-center space-x-1 text-destructive">
                                <Flag className="h-4 w-4" />
                                <span>{listing.reports}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">None</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {listing.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleListingAction(listing.id, 'approve')}
                                    className="text-green-600 hover:text-green-600"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleListingAction(listing.id, 'reject')}
                                    className="text-red-600 hover:text-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleListingAction(listing.id, 'delete')}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Swaps Management */}
          <TabsContent value="swaps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Swap Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps.map((swap) => (
                    <div key={swap.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <img
                              src={swap.item1.image}
                              alt={swap.item1.title}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div>
                              <div className="font-medium text-sm">{swap.item1.title}</div>
                              <div className="text-sm text-muted-foreground">{swap.item1.user}</div>
                            </div>
                          </div>
                          <div className="text-muted-foreground">⟷</div>
                          <div className="flex items-center space-x-2">
                            <img
                              src={swap.item2.image}
                              alt={swap.item2.title}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div>
                              <div className="font-medium text-sm">{swap.item2.title}</div>
                              <div className="text-sm text-muted-foreground">{swap.item2.user}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(swap.status)}>
                            {swap.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {new Date(swap.initiatedDate).toLocaleDateString()}
                          </div>
                        </div>
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
