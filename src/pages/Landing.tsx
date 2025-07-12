import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Users, Award, Star, Heart, TrendingUp, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LiquidEffects, { LiquidBackground } from '@/components/LiquidEffects';
import ParallaxLayers from '@/components/ParallaxLayers';
import VantaGlobeBackground from '@/components/VantaGlobeBackground';
import { useAuth } from '@/contexts/AuthContext';

const getStoredProfile = () => {
  const stored = localStorage.getItem('userProfile');
  if (stored) return JSON.parse(stored);
  return null;
};

export default function Landing() {
  const { user } = useAuth();
  const userProfile = getStoredProfile();
  const [featuredItems] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "/jacket.jpg",
      category: "Jackets",
      size: "M",
      condition: "Excellent",
      points: 45,
      likes: 23,
      user: "Sarah M."
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      image: "/summerdress.jpg",
      category: "Dresses",
      size: "S",
      condition: "Like New",
      points: 35,
      likes: 41,
      user: "Emma K."
    },
    {
      id: 3,
      title: "Designer Leather Boots",
      image: "/ankleboots.jpg",
      category: "Shoes",
      size: "8",
      condition: "Good",
      points: 60,
      likes: 17,
      user: "Alex R."
    },
    {
      id: 4,
      title: "Cozy Knit Sweater",
      image: "/sweater.jpg",
      category: "Sweaters",
      size: "L",
      condition: "Excellent",
      points: 30,
      likes: 29,
      user: "Maya L."
    }
  ]);

  const categories = [
    { name: "Tops", icon: "👕", count: "2.4k items" },
    { name: "Dresses", icon: "👗", count: "1.8k items" },
    { name: "Bottoms", icon: "👖", count: "2.1k items" },
    { name: "Shoes", icon: "👠", count: "1.5k items" },
    { name: "Accessories", icon: "👜", count: "900 items" },
    { name: "Outerwear", icon: "🧥", count: "1.2k items" }
  ];

  const features = [
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      title: "Sustainable Fashion",
      description: "Give your clothes a second life and reduce fashion waste."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Driven",
      description: "Connect with like-minded fashion lovers in your area."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Points System",
      description: "Earn points by listing items and redeem them for new clothes."
    }
  ];

  // Split text for 3D character animation
  const heroText = "ReWear the Future";
  const heroChars = heroText.split('');

  return (
    <>
      <VantaGlobeBackground />
      <div className="min-h-screen relative z-[1]">
        {/* Hero Section */}
        <section className="elegant-section">
          <div className="elegant-container text-center">
            {user && userProfile && (
              <div className="mb-6 text-2xl font-semibold text-primary animate-fade-in-up">
                Welcome back, {userProfile.name}!
              </div>
            )}
            <div className="hero-title">
              <h1 className="font-extralight tracking-tight mb-8 hero-3d-text">
                {heroChars.map((char, index) => (
                  <span key={index} className="inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
            </div>
            <div className="hero-subtitle">
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto font-light leading-relaxed">
                Join thousands of fashion lovers swapping, sharing, and shopping sustainably. 
                Turn your wardrobe into a community treasure.
              </p>
            </div>
            <div className="hero-buttons">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/browse">
                  <Button size="lg" className="pascale-button text-lg">
                    Start Browsing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="text-lg pascale-button bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Join ReWear
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="elegant-section">
          <div className="elegant-container">
            <h2 className="text-center mb-16 font-light tracking-tight">Shop by Category</h2>
            <div className="categories-carousel">
              <div className="categories-track">
                {[...categories, ...categories].map((category, index) => (
                  <Link key={`${category.name}-${index}`} to={`/category/${category.name.toLowerCase()}`}>
                    <div className="category-card">
                      <span className="category-icon">{category.icon}</span>
                      <h3 className="category-title">{category.name}</h3>
                      <p className="category-count">{category.count}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="carousel-nav">
                {categories.map((_, index) => (
                  <button key={index} className="carousel-dot" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Items */}
        <section className="elegant-section">
          <div className="elegant-container">
            <div className="flex justify-between items-center mb-16">
              <h2 className="font-light tracking-tight">Featured Items</h2>
              <Link to="/browse">
                <Button variant="outline" className="pascale-button bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="elegant-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 stagger-animation">
              {featuredItems.map((item) => (
                <Link key={item.id} to={`/item/${item.id}`}>
                  <Card className="pascale-card cursor-pointer overflow-hidden group">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute top-4 right-4 flex items-center space-x-1 pascale-glass rounded-full px-3 py-2">
                        <Heart className="h-3 w-3" />
                        <span className="text-xs font-light">{item.likes}</span>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground border-0 font-light">{item.condition}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-light text-sm tracking-wide">{item.title}</h3>
                        <div className="flex items-center space-x-1 text-accent-foreground">
                          <ShoppingBag className="h-3 w-3" />
                          <span className="text-sm font-light">{item.points}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground font-light">
                        <span>Size {item.size} • {item.category}</span>
                        <span>by {item.user}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="elegant-section">
          <div className="elegant-container">
            <div className="text-center mb-16">
              <h2 className="font-light tracking-tight mb-6">How ReWear Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                Simple, sustainable, and social. Join our community and start your sustainable fashion journey today.
              </p>
            </div>
            <div className="elegant-grid grid-cols-1 md:grid-cols-3 stagger-animation">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-6">
                    <div className="p-6 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700 group-hover:scale-110 animate-scale-breathe">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-light mb-4 tracking-wide">{feature.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="elegant-section">
          <div className="elegant-container">
            <div className="elegant-grid grid-cols-1 md:grid-cols-4 text-center stagger-animation">
              <div className="animate-elegant-float animate-glow">
                <div className="text-4xl font-extralight mb-2">10K+</div>
                <div className="text-sm font-light opacity-90">Active Users</div>
              </div>
              <div className="animate-elegant-float animate-glow" style={{ animationDelay: '1s' }}>
                <div className="text-4xl font-extralight mb-2">50K+</div>
                <div className="text-sm font-light opacity-90">Items Listed</div>
              </div>
              <div className="animate-elegant-float animate-glow" style={{ animationDelay: '2s' }}>
                <div className="text-4xl font-extralight mb-2">95%</div>
                <div className="text-sm font-light opacity-90">Satisfaction Rate</div>
              </div>
              <div className="animate-elegant-float animate-glow" style={{ animationDelay: '3s' }}>
                <div className="text-4xl font-extralight mb-2">24/7</div>
                <div className="text-sm font-light opacity-90">Community Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="elegant-section">
          <div className="elegant-container text-center">
            <div className="animate-scale-in">
              <h2 className="font-light tracking-tight mb-6">Ready to Start Your Sustainable Fashion Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Join thousands of fashion lovers who are already making a difference. 
                Start swapping, sharing, and shopping sustainably today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/register">
                  <Button size="lg" className="pascale-button text-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button size="lg" variant="outline" className="text-lg pascale-button bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Explore Items
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
