
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function AddItem() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    points: 25,
    brand: '',
    color: '',
    isAvailable: true
  });
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const categories = [
    'Tops',
    'Bottoms',
    'Dresses',
    'Jackets & Outerwear',
    'Shoes',
    'Accessories',
    'Activewear',
    'Formal Wear',
    'Sleepwear',
    'Swimwear'
  ];

  const conditions = [
    { value: 'like-new', label: 'Like New', description: 'Barely worn, no visible signs of wear' },
    { value: 'excellent', label: 'Excellent', description: 'Minimal signs of wear, excellent condition' },
    { value: 'good', label: 'Good', description: 'Normal wear, good condition overall' },
    { value: 'fair', label: 'Fair', description: 'Visible wear but still functional' }
  ];

  const sizes = {
    'Tops': ['XS', 'S', 'M', 'L', 'XL', 'XXL', '0', '2', '4', '6', '8', '10', '12', '14', '16'],
    'Bottoms': ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40'],
    'Dresses': ['XS', 'S', 'M', 'L', 'XL', 'XXL', '0', '2', '4', '6', '8', '10', '12', '14', '16'],
    'Shoes': ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    'default': ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.size) {
      newErrors.size = 'Size is required';
    }

    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }

    if (formData.points < 5 || formData.points > 200) {
      newErrors.points = 'Points must be between 5 and 200';
    }

    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags(prev => [...prev, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      // Get existing user items from localStorage
      const userItems = JSON.parse(localStorage.getItem('userItems') || '[]');
      // Assign a unique id (max existing id + 1 or 1000 if none)
      const allIds = userItems.map((item: any) => item.id);
      const newId = allIds.length ? Math.max(...allIds) + 1 : 1000;
      const newItem = {
        id: newId,
        title: formData.title,
        description: formData.description,
        category: formData.category.toLowerCase(),
        size: formData.size,
        condition: formData.condition,
        points: formData.points,
        brand: formData.brand,
        color: formData.color,
        isAvailable: formData.isAvailable,
        images,
        tags,
        user: 'You',
      };
      userItems.push(newItem);
      localStorage.setItem('userItems', JSON.stringify(userItems));
      
      // Add points to user balance
      const currentPoints = parseInt(localStorage.getItem('userPoints') || '250');
      localStorage.setItem('userPoints', (currentPoints + 10).toString()); // Bonus for listing
      
      toast({
        title: "Item listed successfully!",
        description: `Your ${formData.title} has been listed. You earned 10 bonus points!`
      });
      
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const getSizesForCategory = (category: string) => {
    return sizes[category as keyof typeof sizes] || sizes.default;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">List a New Item</h1>
          <p className="text-muted-foreground">
            Share your preloved fashion with the community and earn points
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground text-center">
                      Add Photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              {errors.images && <p className="text-sm text-destructive">{errors.images}</p>}
              <p className="text-sm text-muted-foreground">
                Add up to 5 photos. The first photo will be your main image.
              </p>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand (Optional)</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Levi's, H&M, Zara"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value, size: '' })}
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size *</Label>
                  <Select 
                    value={formData.size} 
                    onValueChange={(value) => setFormData({ ...formData, size: value })}
                    disabled={!formData.category}
                  >
                    <SelectTrigger className={errors.size ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSizesForCategory(formData.category).map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.size && <p className="text-sm text-destructive">{errors.size}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select 
                    value={formData.condition} 
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                  >
                    <SelectTrigger className={errors.condition ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          <div>
                            <div className="font-medium">{condition.label}</div>
                            <div className="text-sm text-muted-foreground">{condition.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && <p className="text-sm text-destructive">{errors.condition}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color (Optional)</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Blue, Black, Multi-color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail. Include measurements, materials, care instructions, and any flaws..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`min-h-32 ${errors.description ? 'border-destructive' : ''}`}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                <p className="text-sm text-muted-foreground">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    #{tag}
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add tags (e.g., vintage, casual, summer)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Add relevant tags to help others find your item
              </p>
            </CardContent>
          </Card>

          {/* Pricing & Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="points">Points Value *</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="points"
                    type="number"
                    min="5"
                    max="200"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                    className={`w-32 ${errors.points ? 'border-destructive' : ''}`}
                  />
                  <span className="text-muted-foreground">points</span>
                </div>
                {errors.points && <p className="text-sm text-destructive">{errors.points}</p>}
                <p className="text-sm text-muted-foreground">
                  Set a fair point value based on the item's condition and original price
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData({ ...formData, isAvailable: checked })}
                />
                <Label htmlFor="available">Item is available for swap</Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 btn-primary" 
              disabled={isLoading}
            >
              {isLoading ? 'Listing Item...' : 'List Item'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
