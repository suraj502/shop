const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files (images)

// Sample Products Database (in-memory for simplicity)
const products = [
  {
    id: 1,
    name: 'Verdant Prism I',
    price: 850,
    description: 'Hand-blown sculptural glass object with emerald tonal reflections',
    image: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&w=900&q=80',
    category: 'Objects'
  },
  {
    id: 2,
    name: 'The Emerald Chronos',
    price: 4200,
    description: 'Limited-edition timepiece with polished steel and deep green dial',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
    category: 'Horology'
  },
  {
    id: 3,
    name: 'Flora Silk Throw',
    price: 620,
    description: 'Soft heritage weave textile crafted for layered interior styling',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=900&q=80',
    category: 'Textiles'
  },
  {
    id: 4,
    name: 'Sculptural Form No. 04',
    price: 420,
    description: 'Ceramic collectible form in matte finish for gallery-inspired spaces',
    image: 'https://images.unsplash.com/photo-1515549832467-8783363e19b6?auto=format&fit=crop&w=900&q=80',
    category: 'Ceramics'
  }
];

// ==================== API ROUTES ====================

// GET all products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Retrieved all products');
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    console.log(`GET /api/products/:id - Product ${req.params.id} not found`);
    return res.status(404).json({ message: 'Product not found' });
  }
  
  console.log(`GET /api/products/:id - Retrieved product ${req.params.id}`);
  res.json(product);
});

// GET products by category
app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  
  console.log(`GET /api/products/category/:category - Retrieved ${filteredProducts.length} products from category: ${category}`);
  res.json(filteredProducts);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   - GET /api/products - Get all products`);
  console.log(`   - GET /api/products/:id - Get product by ID`);
  console.log(`   - GET /api/products/category/:category - Get products by category`);
  console.log(`   - GET /api/health - Check if server is running`);
});
