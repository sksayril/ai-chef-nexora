import React, { useState } from 'react';
import { ChefHat, ArrowRight, Plus, Trash2, CookingPot, Loader2, Flame, Leaf, Soup, UtensilsCrossed, Coffee, Clock, Sandwich, Sparkles, ThermometerSun } from 'lucide-react';
import { generateRecipe } from './lib/gemini';
import { motion } from 'framer-motion';

const cuisineTypes = [
  {
    name: 'Indian',
    description: 'Rich, spicy, and aromatic flavors',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
    color: 'from-orange-500 to-red-600',
    styles: [
      { name: 'Punjabi', description: 'Rich, creamy curries and tandoor specialties' },
      { name: 'Bengali', description: 'Fish curries and sweet delicacies' },
      { name: 'Gujarati', description: 'Vegetarian dishes with unique sweet and spicy blend' }
    ]
  },
  {
    name: 'Japanese',
    description: 'Elegant and balanced flavors',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&q=80&w=800',
    color: 'from-pink-500 to-purple-600',
    styles: [
      { name: 'Sushi', description: 'Fresh seafood and vinegared rice' },
      { name: 'Ramen', description: 'Hearty noodle soups' },
      { name: 'Tempura', description: 'Crispy battered dishes' }
    ]
  },
  {
    name: 'American',
    description: 'Comfort food classics',
    icon: Sandwich,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=800',
    color: 'from-blue-500 to-teal-600',
    styles: [
      { name: 'Southern', description: 'Hearty, soul-warming dishes' },
      { name: 'BBQ', description: 'Smoky grilled meats and sides' },
      { name: 'Tex-Mex', description: 'Mexican-American fusion' }
    ]
  }
];

const stepImages = [
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=800',
  // 'https://images.unsplash.com/photo-1601041973354-4f95b4d50aaa?auto=format&fit=crop&q=80&w=800',
  // 'https://images.unsplash.com/photo-1532980400722-070bee1692e1?auto=format&fit=crop&q=80&w=800',
  // 'https://images.unsplash.com/photo-1518843985006-65411fd7979?auto=format&fit=crop&q=80&w=800'
];

const RecipeDetail = ({ recipe, stepImages, onCreateAnother }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h2>
        <div className="flex justify-center space-x-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span>Total Time: {recipe.totalTime || '45 mins'}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Ingredients
          </h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <UtensilsCrossed className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span>{ingredient}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Cooking Tips
          </h3>
          <ul className="space-y-3">
            {recipe.tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <Coffee className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Cooking Instructions
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {recipe.steps.map((step, index) => (
            <div key={index} className="flex space-x-4">
              <div className="w-1/2 rounded-lg overflow-hidden shadow-md">
                <img
                  src={stepImages[index % stepImages.length]}
                  alt={`Step ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="w-1/2">
                <div className="mb-2">
                  <span className="text-lg font-semibold text-purple-600">
                    Step {index + 1}
                  </span>
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCreateAnother}
        className="mx-auto block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Create Another Recipe
      </motion.button>
    </motion.div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [preferences, setPreferences] = useState({ spicy: false, sweet: false });
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetStarted = () => setView('cuisine');

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    setView('style');
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setView('preferences');
  };

  const handlePreferencesSubmit = () => {
    setView('ingredients');
  };

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const recipeData = await generateRecipe(
        ingredients,
        `${selectedCuisine.name} ${selectedStyle.name} ${preferences.spicy ? 'spicy' : ''} ${preferences.sweet ? 'sweet' : ''}`
      );
      setRecipe(recipeData);
      setView('recipe');
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setIngredients([]);
    setSelectedCuisine(null);
    setSelectedStyle(null);
    setPreferences({ spicy: false, sweet: false });
    setView('cuisine');
  };

  const renderLandingPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 leading-tight">
                Culinary AI Chef
              </h1>
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                Transform your kitchen with AI-powered culinary magic. Discover personalized recipes, get expert tips, and unleash your inner chef.
              </p>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full text-xl font-semibold flex items-center gap-3 hover:shadow-xl transition-all"
            >
              Get Started
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <ChefHat className="w-96 h-96 text-purple-500 opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <img 
              src="/cutinerylogo1.png" 
              alt="Culinary AI Chef" 
              className="relative z-10 rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { 
              Icon: Sparkles, 
              title: "AI-Powered", 
              description: "Smart recipe suggestions based on your ingredients"
            },
            { 
              Icon: Clock, 
              title: "Quick & Easy", 
              description: "Get instant recipes with detailed instructions"
            },
            { 
              Icon: ThermometerSun, 
              title: "Professional Tips", 
              description: "Expert cooking advice for perfect results"
            }
          ].map(({ Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <Icon className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );


  const renderCuisineSelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Choose Your Cuisine</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {cuisineTypes.map((cuisine) => (
          <motion.div
            key={cuisine.name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCuisineSelect(cuisine)}
            className={`relative overflow-hidden rounded-xl cursor-pointer shadow-lg`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.color} opacity-90 z-10`} />
            <img
              src={cuisine.image}
              alt={cuisine.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 p-6 h-full flex flex-col justify-between text-white">
              <div className="flex items-center gap-3 mb-4">
                <cuisine.icon className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{cuisine.name}</h3>
              </div>
              <p className="text-sm opacity-90">{cuisine.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStyleSelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Choose Your {selectedCuisine.name} Style
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {selectedCuisine.styles.map((style: any, index: number) => (
          <motion.div
            key={style.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleStyleSelect(style)}
            className={`relative overflow-hidden rounded-xl cursor-pointer shadow-lg transform transition-all duration-300 
              ${
                index === 0 
                  ? 'bg-gradient-to-br from-red-500 to-orange-500' 
                  : index === 1 
                  ? 'bg-gradient-to-br from-blue-500 to-green-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 opacity-50 bg-cover bg-center" 
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-${
                  index === 0 
                    ? '1512070923590-3cc4c1a96638' 
                    : index === 1 
                    ? '1519915028495-4b0dbfa3248f' 
                    : '1604579315890-207dbc10d1a5'
                }?auto=format&fit=crop&q=80&w=800')`,
              }}
            />
  
            {/* Content */}
            <div className="relative z-10 p-8 h-64 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">
                  {style.name}
                </h3>
                <p className="text-lg opacity-90 drop-shadow-md">
                  {style.description}
                </p>
              </div>
  
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
  
              {/* Select Indicator */}
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-40 transition-all">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderPreferences = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Customize Your Preferences</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Spicy</h3>
            <p className="text-gray-600">Add some heat to your dish</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.spicy}
              onChange={(e) => setPreferences({ ...preferences, spicy: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Sweet</h3>
            <p className="text-gray-600">Include sweet elements</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.sweet}
              onChange={(e) => setPreferences({ ...preferences, sweet: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePreferencesSubmit}
        className="w-full bg-purple-600 text-white py-4 rounded-xl text-xl font-semibold hover:bg-purple-700 transition-colors"
      >
        Continue
      </motion.button>
    </motion.div>
  );

  const renderIngredientInput = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Add Your Ingredients</h2>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter an ingredient..."
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addIngredient}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {ingredients.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-2">Your Ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full"
                >
                  <span className="text-purple-800">{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(index)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateRecipe}
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Your Recipe...
            </>
          ) : (
            <>
              <CookingPot className="w-5 h-5" />
              Generate Recipe
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      {view === 'landing' && renderLandingPage()}
      {view === 'cuisine' && renderCuisineSelection()}
      {view === 'style' && renderStyleSelection()}
      {view === 'preferences' && renderPreferences()}
      {view === 'ingredients' && renderIngredientInput()}
      {view === 'recipe' && (
        <RecipeDetail 
          recipe={recipe} 
          stepImages={stepImages} 
          onCreateAnother={handleCreateAnother}
        />
      )}
    </div>
  );
}

export default App;