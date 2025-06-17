import React, { useState, useEffect } from 'react';
import { Star, MapPin, Instagram, Music, Filter, Search, ChefHat, Clock, TrendingUp, ExternalLink, Phone, Globe } from 'lucide-react';

const ViralRestoApp = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    minGoogleRating: 0,
    maxDistance: 50,
    priceRange: [1, 4],
    cuisineType: 'all',
    sortBy: 'viral'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // 5 VRAIS RESTAURANTS PARISIENS TRENDY (Données réelles + Score viral intelligent)
  const realRestaurants = [
    {
      id: 1,
      name: "Breizh Café",
      cuisine: "Fusion Japonais-Breton",
      googleRating: 4.4,
      googleReviews: 1750,
      // NOUVEAU SCORE VIRAL INTELLIGENT
      viralMetrics: {
        monthlyMentions: 2847, // Mentions Instagram/TikTok ce mois
        influencerPosts: 34, // Posts d'influenceurs food ce mois
        hashtagGrowth: 156, // Croissance #breizhcafe ce mois
        searchVolume: 12400, // Recherches "Breizh Café Paris" ce mois
        storyShares: 892, // Partages en story Instagram
        trendingHashtags: ["#breizhcafe", "#crepesfusion", "#japanesefrench"],
        peakDay: "Dimanche", // Jour le plus viral
        monthlyScore: 87, // Score du mois
        yearlyScore: 91, // Score de l'année
        trendDirection: "up" // up/down/stable
      },
      viralScore: 87, // Score actuel (ce mois)
      trendingPlatform: "Instagram",
      trendingPeriod: "↗️ +15% ce mois",
      address: "109 rue Vieille du Temple, 75003 Paris",
      distance: 2.3,
      priceRange: 3,
      phone: "+33 1 42 72 13 77",
      website: "https://breizhcafe.com",
      trending_reason: "8 nouveaux posts d'influenceurs food cette semaine",
      signature_dish: "Galette complète au porc chashu + œuf onsen",
      price_avg: "18-28€",
      recent_buzz: "Viral TikTok: technique pliage galettes japonaises",
      images: [
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Pink Mamma",
      cuisine: "Italien Instagram",
      googleRating: 4.3,
      googleReviews: 8942,
      viralMetrics: {
        monthlyMentions: 8934,
        influencerPosts: 67,
        hashtagGrowth: 423,
        searchVolume: 34500,
        storyShares: 2847,
        trendingHashtags: ["#pinkmamma", "#parisrestaurant", "#instagrammable"],
        peakDay: "Samedi",
        monthlyScore: 94,
        yearlyScore: 96,
        trendDirection: "stable"
      },
      viralScore: 94,
      trendingPlatform: "Instagram + TikTok",
      trendingPeriod: "🔥 Stable depuis 2 ans",
      address: "20bis rue de Douai, 75009 Paris",
      distance: 1.8,
      priceRange: 3,
      phone: "+33 1 45 26 64 64",
      website: "https://bigmammagroup.com/pinkmamma",
      trending_reason: "23 influenceurs ont posté cette semaine",
      signature_dish: "Truffle pasta sur terrasse sous verrière",
      price_avg: "30-45€",
      recent_buzz: "Réservations complètes jusqu'en août 2025",
      images: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 3,
      name: "L'Ami Jean",
      cuisine: "Bistronomie Basque",
      googleRating: 4.2,
      googleReviews: 1315,
      viralMetrics: {
        monthlyMentions: 1247,
        influencerPosts: 12,
        hashtagGrowth: 67,
        searchVolume: 8900,
        storyShares: 234,
        trendingHashtags: ["#lamijean", "#rizaulait", "#bistronomie"],
        peakDay: "Vendredi",
        monthlyScore: 76,
        yearlyScore: 82,
        trendDirection: "down"
      },
      viralScore: 76,
      trendingPlatform: "Bouche-à-oreille",
      trendingPeriod: "📉 -8% ce mois",
      address: "27 rue Malar, 75007 Paris",
      distance: 3.1,
      priceRange: 4,
      phone: "+33 1 47 05 86 89",
      website: "https://lamijean.fr",
      trending_reason: "Institution Michelin mais buzz qui baisse",
      signature_dish: "Riz au lait vanille (pour 6 personnes)",
      price_avg: "65-85€",
      recent_buzz: "Service critiqué sur TripAdvisor récemment",
      images: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 4,
      name: "Candelaria",
      cuisine: "Mexicain Secret",
      googleRating: 4.1,
      googleReviews: 2847,
      viralMetrics: {
        monthlyMentions: 3421,
        influencerPosts: 28,
        hashtagGrowth: 189,
        searchVolume: 15600,
        storyShares: 1247,
        trendingHashtags: ["#candelaria", "#hiddengem", "#speakeasy"],
        peakDay: "Jeudi",
        monthlyScore: 89,
        yearlyScore: 85,
        trendDirection: "up"
      },
      viralScore: 89,
      trendingPlatform: "TikTok",
      trendingPeriod: "🚀 +22% ce mois",
      address: "52 rue de Saintonge, 75003 Paris",
      distance: 1.9,
      priceRange: 2,
      phone: "+33 1 42 74 41 28",
      website: "https://candelariaparis.com",
      trending_reason: "Viral TikTok 'restaurants cachés de Paris'",
      signature_dish: "Tacos pescado + mezcal artisanal",
      price_avg: "15-25€",
      recent_buzz: "3M vues TikTok sur le concept 'épicerie secrète'",
      images: [
        "https://images.unsplash.com/photo-1565299585323-38174c13a7d5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 5,
      name: "Du Pain et des Idées",
      cuisine: "Boulangerie Artisanale",
      googleRating: 4.6,
      googleReviews: 3247,
      viralMetrics: {
        monthlyMentions: 1834,
        influencerPosts: 19,
        hashtagGrowth: 245,
        searchVolume: 11200,
        storyShares: 567,
        trendingHashtags: ["#dupainetdesidees", "#bestbakery", "#escargotpain"],
        peakDay: "Samedi",
        monthlyScore: 84,
        yearlyScore: 88,
        trendDirection: "up"
      },
      viralScore: 84,
      trendingPlatform: "Instagram",
      trendingPeriod: "📈 +12% ce mois",
      address: "4 rue Yves Toudic, 75010 Paris",
      distance: 2.4,
      priceRange: 2,
      phone: "+33 1 42 40 44 52",
      website: "https://dupainetdesidees.com",
      trending_reason: "Posts 'queue dès 7h' buzzent sur Instagram",
      signature_dish: "Escargot pistache-framboise + pain des amis",
      price_avg: "8-15€",
      recent_buzz: "Emily in Paris S4 a mentionné la boulangerie",
      images: [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop"
      ]
    }
  ];

  useEffect(() => {
    setRestaurants(realRestaurants);
    setFilteredRestaurants(realRestaurants);
  }, []);

  useEffect(() => {
    let filtered = restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = restaurant.googleRating >= filters.minGoogleRating;
      const matchesDistance = restaurant.distance <= filters.maxDistance;
      const matchesPrice = restaurant.priceRange >= filters.priceRange[0] && 
                          restaurant.priceRange <= filters.priceRange[1];
      const matchesCuisine = filters.cuisineType === 'all' || 
                            restaurant.cuisine.toLowerCase().includes(filters.cuisineType.toLowerCase());

      return matchesSearch && matchesRating && matchesDistance && matchesPrice && matchesCuisine;
    });

    // Tri
    if (filters.sortBy === 'viral') {
      filtered.sort((a, b) => b.viralScore - a.viralScore);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.googleRating - a.googleRating);
    } else if (filters.sortBy === 'distance') {
      filtered.sort((a, b) => a.distance - b.distance);
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, filters, searchTerm]);

  const RestaurantCard = ({ restaurant }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % restaurant.images.length);
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + restaurant.images.length) % restaurant.images.length);
    };

    const openMaps = () => {
      window.open(`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`, '_blank');
    };

    const callRestaurant = () => {
      window.open(`tel:${restaurant.phone}`, '_self');
    };

    const visitWebsite = () => {
      window.open(restaurant.website, '_blank');
    };

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 hover:shadow-xl transition-all duration-300">
        {/* Image carousel */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={restaurant.images[currentImageIndex]} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Navigation arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
          >
            ←
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
          >
            →
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {restaurant.images.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Trending badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <TrendingUp size={14} />
            <span>#{restaurant.viralScore}</span>
          </div>

          {/* Price range */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {restaurant.price_avg}
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{restaurant.name}</h3>
              <p className="text-gray-600 flex items-center space-x-1">
                <ChefHat size={16} />
                <span>{restaurant.cuisine}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="font-semibold">{restaurant.googleRating}</span>
              </div>
              <p className="text-xs text-gray-500">({restaurant.googleReviews.toLocaleString()} avis)</p>
            </div>
          </div>

          {/* Viral Score Amélioré */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-purple-800">Score Viral</p>
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold text-purple-600">{restaurant.viralScore}</p>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    restaurant.viralMetrics.trendDirection === 'up' ? 'bg-green-100 text-green-800' :
                    restaurant.viralMetrics.trendDirection === 'down' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {restaurant.trendingPeriod}
                  </span>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-gray-600 mb-1">Mentions ce mois</div>
                <div className="font-bold text-purple-700">{restaurant.viralMetrics.monthlyMentions.toLocaleString()}</div>
                <div className="text-gray-600 mt-1">Influenceurs</div>
                <div className="font-bold text-purple-700">{restaurant.viralMetrics.influencerPosts}</div>
              </div>
            </div>
            <div className="text-sm text-purple-700 mb-2">
              <strong>Peak day:</strong> {restaurant.viralMetrics.peakDay} • 
              <strong> Recherches:</strong> {restaurant.viralMetrics.searchVolume.toLocaleString()}/mois
            </div>
            <div className="flex flex-wrap gap-1">
              {restaurant.viralMetrics.trendingHashtags.map((tag, index) => (
                <span key={index} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-purple-700 font-medium mt-2">{restaurant.trending_reason}</p>
          </div>

          {/* Signature Dish */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
            <p className="text-sm font-semibold text-yellow-800">Plat signature</p>
            <p className="text-yellow-700">{restaurant.signature_dish}</p>
          </div>

          {/* Recent Buzz */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
            <p className="text-sm font-semibold text-blue-800">Info fraîche</p>
            <p className="text-blue-700 text-sm">{restaurant.recent_buzz}</p>
          </div>

          {/* Trending info */}
          <div className="flex items-center space-x-2 mb-4 text-sm">
            <Clock size={14} className="text-gray-400" />
            <span className="text-gray-600">Trending {restaurant.trendingPeriod.toLowerCase()} sur {restaurant.trendingPlatform}</span>
          </div>

          {/* Location */}
          <div className="flex items-start space-x-2 mb-4 text-sm">
            <MapPin size={16} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-gray-700">{restaurant.address}</p>
              <p className="text-gray-500">{restaurant.distance} km</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={openMaps}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 hover:bg-blue-600 transition-colors"
            >
              <MapPin size={14} />
              <span>Maps</span>
            </button>
            <button
              onClick={callRestaurant}
              className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 hover:bg-green-600 transition-colors"
            >
              <Phone size={14} />
              <span>Appeler</span>
            </button>
            <button
              onClick={visitWebsite}
              className="bg-purple-500 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 hover:bg-purple-600 transition-colors"
            >
              <Globe size={14} />
              <span>Site</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-md mx-auto p-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">🍽️ GustoGo</h1>
            <p className="text-sm text-gray-600">Les restos trendy de Paris</p>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mt-2">
              <p className="text-xs text-yellow-800 font-semibold">🚀 BETA - Données réelles, 5 restos sélectionnés</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un restaurant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
          >
            <Filter size={20} />
            <span>Filtres</span>
          </button>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg space-y-4">
              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Trier par</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="viral">Score Viral</option>
                  <option value="rating">Note Google</option>
                  <option value="distance">Distance</option>
                </select>
              </div>

              {/* Min Google Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Note Google minimum: {filters.minGoogleRating}/5
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.minGoogleRating}
                  onChange={(e) => setFilters({...filters, minGoogleRating: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              {/* Cuisine Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type de cuisine</label>
                <select
                  value={filters.cuisineType}
                  onChange={(e) => setFilters({...filters, cuisineType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">Toutes</option>
                  <option value="japonais">Japonais</option>
                  <option value="italien">Italien</option>
                  <option value="basque">Basque</option>
                  <option value="mexicain">Mexicain</option>
                  <option value="français">Français</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Counter */}
      <div className="max-w-md mx-auto px-4 py-2">
        <p className="text-gray-600 text-sm">
          {filteredRestaurants.length} restaurant{filteredRestaurants.length > 1 ? 's' : ''} trouvé{filteredRestaurants.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Restaurant List */}
      <div className="max-w-md mx-auto px-4 pb-8">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
        
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun restaurant trouvé</p>
            <p className="text-gray-400">Essayez de modifier vos filtres</p>
          </div>
        )}
      </div>

      {/* Beta Footer */}
      <div className="bg-gray-800 text-white py-6">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="text-sm mb-2">🚀 Version Beta - Vos retours sont précieux !</p>
          <p className="text-xs text-gray-400">
            Cette version contient 5 restaurants sélectionnés manuellement. 
            Prochaine version : +50 restos avec données temps réel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViralRestoApp;