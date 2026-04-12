import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Products data
const products = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop', image: '/images/laptop.svg', category: 'Electronics' },
  { id: 2, name: 'Smartphone', price: 699.99, description: 'Latest smartphone', image: '/images/smartphone.svg', category: 'Electronics' },
  { id: 3, name: 'Headphones', price: 199.99, description: 'Wireless headphones', image: '/images/headphones.svg', category: 'Audio' },
  { id: 4, name: 'Tablet', price: 449.99, description: 'Portable tablet', image: '/images/tablet.svg', category: 'Electronics' }
];

// ==================== API ENDPOINTS ====================

// Get all products
app.get('/products', (req, res) => {
  console.log('📤 API Call: GET /products');
  res.json(products);
});

// Get single product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  console.log('📤 API Call: GET /products/:id =>', req.params.id);
  res.json(product);
});

// Get products by category
app.get('/products/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => p.category.toLowerCase() === req.params.category.toLowerCase());
  console.log('📤 API Call: GET /products/category/:category =>', req.params.category);
  res.json(categoryProducts);
});

// Health check
app.get('/health', (req, res) => {
  console.log('📤 API Call: GET /health');
  res.json({ status: 'API is running!' });
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'E-Commerce API Server' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
