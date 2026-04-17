const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Products data
const products = [
  { id: 1, name: 'Verdant Prism I', price: 850, description: 'Hand-blown sculptural glass object with emerald tonal reflections', image: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&w=900&q=80', category: 'Objects' },
  { id: 2, name: 'The Emerald Chronos', price: 4200, description: 'Limited-edition timepiece with polished steel and deep green dial', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80', category: 'Horology' },
  { id: 3, name: 'Flora Silk Throw', price: 620, description: 'Soft heritage weave textile crafted for layered interior styling', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=900&q=80', category: 'Textiles' },
  { id: 4, name: 'Sculptural Form No. 04', price: 420, description: 'Ceramic collectible form in matte finish for gallery-inspired spaces', image: 'https://images.unsplash.com/photo-1515549832467-8783363e19b6?auto=format&fit=crop&w=900&q=80', category: 'Ceramics' }
];

const apiRouter = express.Router();

// ==================== API ENDPOINTS ====================

// Get all products
apiRouter.get('/products', (req, res) => {
  console.log('📤 API Call: GET /products');
  res.json(products);
});

// Get single product by ID
apiRouter.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  console.log('📤 API Call: GET /products/:id =>', req.params.id);
  res.json(product);
});

// Get products by category
apiRouter.get('/products/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => p.category.toLowerCase() === req.params.category.toLowerCase());
  console.log('📤 API Call: GET /products/category/:category =>', req.params.category);
  res.json(categoryProducts);
});

// Health check
apiRouter.get('/health', (req, res) => {
  console.log('📤 API Call: GET /health');
  res.json({ status: 'API is running!' });
});

// Accept both /api/* and /* paths in serverless/runtime routing.
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'E-Commerce API Server' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
