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
    name: 'Laptop',
    price: 999.99,
    description: 'High performance laptop for work and gaming',
    image: 'http://localhost:5000/images/laptop.svg',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 699.99,
    description: 'Latest model smartphone with great camera',
    image: 'http://localhost:5000/images/smartphone.svg',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Headphones',
    price: 199.99,
    description: 'Wireless headphones with noise cancellation',
    image: 'http://localhost:5000/images/headphones.svg',
    category: 'Audio'
  },
  {
    id: 4,
    name: 'Tablet',
    price: 449.99,
    description: 'Portable tablet for reading and media',
    image: 'http://localhost:5000/images/tablet.svg',
    category: 'Electronics'
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
