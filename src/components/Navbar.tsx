
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, User, Search, ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Input } from '@/components/ui/input';
import { ParallaxLayer } from './ParallaxLayers';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Get user points from user metadata or default to 250
  const userPoints = user?.user_metadata?.points || 250;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    console.log('handleLogout called');
    if (isLoggingOut) return; // Prevent multiple clicks
    
    setIsLoggingOut(true);
    console.log('Starting logout process...');
    try {
      console.log('Calling signOut from auth context...');
      await signOut();
      console.log('signOut completed, navigating to home...');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if there's an error
      navigate('/');
    } finally {
      setIsLoggingOut(false);
      console.log('Logout process finished');
    }
  };



  const navLinks = [
    { name: 'Browse', href: '/browse' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="pascale-glass border-b border-border/30 sticky top-0 z-50 backdrop-blur-2xl animated-bg bg-3d-layers liquid-bg">
      <ParallaxLayer depth={50} baseX={10} baseY={5}>
        <div className="parallax-lines" />
      </ParallaxLayer>
      <div className="elegant-container relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Leaf className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-700 animate-rotate-slow" />
            <span className="text-2xl font-extralight tracking-tight text-primary group-hover:scale-105 transition-transform duration-700 animate-elegant-float">ReWear</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for clothes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pascale-input pl-12 w-full"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-light tracking-wide transition-all duration-500 hover:text-primary ${
                  location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link to="/add-item">
                  <Button size="sm" className="pascale-button">
                    <Plus className="h-4 w-4 mr-2" />
                    List Item
                  </Button>
                </Link>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 pascale-glass px-4 py-2 rounded-full animate-scale-breathe">
                    <ShoppingBag className="h-4 w-4 text-primary animate-bounce-gentle" />
                    <span className="text-sm font-light">{userPoints} pts</span>
                  </div>
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="pascale-button bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout} 
                    disabled={isLoggingOut}
                    className="font-light hover:text-primary transition-colors duration-500"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-light hover:text-primary transition-colors duration-500">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="pascale-button">Sign Up</Button>
                </Link>
              </div>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for clothes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pascale-input pl-12 w-full"
            />
          </form>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden pascale-glass border-t border-border/30 animate-fade-in-up wave-bg bg-3d-sphere liquid-bg">
          <div className="elegant-container py-6 space-y-4 relative z-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-3 text-base font-light text-muted-foreground hover:text-primary transition-colors duration-500"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <div className="flex items-center space-x-2 py-3">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  <span className="text-sm font-light">{userPoints} points</span>
                </div>
                <Link
                  to="/add-item"
                  className="block py-3 text-base font-light text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  List New Item
                </Link>
                <Link
                  to="/dashboard"
                  className="block py-3 text-base font-light text-muted-foreground hover:text-primary transition-colors duration-500"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className="block w-full text-left py-3 text-base font-light text-muted-foreground hover:text-primary transition-colors duration-500 disabled:opacity-50"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-3 text-base font-light text-muted-foreground hover:text-primary transition-colors duration-500"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-3 text-base font-light text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
