# 🛍️ MERN E-Commerce Store

A simple, beginner-friendly MERN stack e-commerce website built to understand how APIs work and how frontend-backend communication happens.

## 📁 Project Structure

```
learn/
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        ├── components/
        │   ├── Navbar.js
        │   ├── Footer.js
        │   └── ProductCard.js
        ├── pages/
        │   ├── Home.js
        │   ├── Products.js
        │   ├── ProductDetail.js
        │   └── Cart.js
        └── services/
            └── api.js
```

## 🚀 How to Run

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected output:**
```
added X packages
```

### 2. Start Backend Server

```bash
npm run dev
```

**You should see:**
```
✅ Server running on http://localhost:5000
📝 API Documentation:
   - GET /api/products - Get all products
   - GET /api/products/:id - Get product by ID
   - GET /api/products/category/:category - Get products by category
   - GET /api/health - Check if server is running
```

> Keep this terminal open! The backend must be running for the frontend to work.

### 3. Install Frontend Dependencies (In a new terminal)

```bash
cd frontend
npm install
```

**Expected output:**
```
added X packages
```

**⚠️ IMPORTANT:** When prompted about version conflicts, choose the option to accept/continue.

### 4. Start Frontend Server

```bash
npm start
```

**You should see:**
```
Compiled successfully!
You can now view ecommerce-frontend in the browser.
  Local:            http://localhost:3000
```

The app will automatically open in your browser!

## 📡 API Endpoints Explained

### GET /api/products
Fetches all products from the database.

**Frontend Code Using It:**
```javascript
// In src/services/api.js
const data = await getAllProducts();
```

**What happens:**
1. Frontend sends request to backend
2. Backend reads products array
3. Returns JSON array of all products
4. Frontend receives and displays them

---

### GET /api/products/:id
Fetches a single product by ID.

**Frontend Code Using It:**
```javascript
// In src/pages/ProductDetail.js
const data = await getProductById(parseInt(id));
```

**Example:** `/api/products/1` returns the Laptop product

---

### GET /api/products/category/:category
Filters products by category.

**Frontend Code Using It:**
```javascript
// In src/pages/Products.js when filtering
```

**Example:** `/api/products/category/Electronics` returns only Electronics items

---

## 🎯 Features & How They Work

### ✅ Browse All Products
- **Page:** `/products`
- **API Call:** `GET /api/products`
- **What happens:** 
  1. Page loads, shows loading animation
  2. Sends API request to backend
  3. Backend returns all products
  4. Frontend displays them in a grid

### ✅ View Product Details
- **Page:** `/products/:id` (e.g., `/products/1`)
- **API Call:** `GET /api/products/:id`
- **What happens:**
  1. Click "View Details" on any product
  2. Makes API call with that product's ID
  3. Backend finds and returns that specific product
  4. Shows all details (name, price, description, image)

### ✅ Filter by Category
- **Page:** `/products`
- **How it works:**
  1. Click category buttons at the top
  2. Frontend filters existing products locally
  3. No API call (optimization!)

### ✅ Add to Cart
- **How it works:**
  1. Click "Add to Cart" button
  2. Product saved to browser's localStorage
  3. Cart count updates in Navbar
  4. Similar to backend database, but offline

### ✅ View Cart
- **Page:** `/cart`
- **How it works:**
  1. Reads products from localStorage
  2. Calculates total price
  3. Lets you update quantities
  4. Shows order summary

## 🔍 How to See API Calls in Action

### Method 1: Browser Console
1. Open browser DevTools: Press `F12`
2. Go to "Console" tab
3. When you click buttons, you'll see:
   ```
   📤 API Call: GET /api/products
   📥 Response: [...]
   ```

### Method 2: Network Tab
1. Open DevTools: Press `F12`
2. Go to "Network" tab
3. Perform actions (browse products, view details)
4. You'll see requests like:
   - `products` → GET request
   - View the "Response" to see JSON data

### Method 3: Backend Terminal
The backend console shows every request:
```
GET /api/products - Retrieved all products
GET /api/products/:id - Retrieved product 1
```

## 💾 Data Storage Explained

### Backend (Temporary)
- Products stored in `server.js` array
- Sent to frontend via API
- **Resets** when server restarts

### Frontend (Cart)
- Cart data stored in browser's `localStorage`
- Persists even after closing the browser
- Can be cleared with DevTools or `localStorage.clear()`

## 🎨 Styling with Tailwind CSS

This project uses **Tailwind CSS** for styling. Check out the components:

```javascript
// Example from ProductCard.js
<div className="card p-4">
  <img className="w-full h-40 object-cover rounded-lg mb-4" />
  <button className="flex-1 btn-primary">View Details</button>
</div>
```

**Key Tailwind Classes Used:**
- `container` - Centers content
- `grid md:grid-cols-2` - Responsive grid
- `flex` - Flexbox layout
- `text-xl` - Font sizes
- `hover:text-blue-600` - Hover effects
- `mb-4` - Margins
- `rounded-lg` - Border radius

## ❓ Common Issues & Solutions

### "Cannot GET /api/products"
- ❌ Backend is not running
- ✅ Solution: Run `npm run dev` in backend folder

### "CORS error"
- ❌ CORS not enabled in backend
- ✅ Already fixed! Check `server.js` has `app.use(cors())`

### Cart data disappears
- ✅ This is normal! localStorage only persists in the same browser
- Try using the same browser or clear cache

### Changes not showing
- ❌ Need to restart servers
- ✅ Kill terminals with Ctrl+C and restart

## 📚 Learning Resources

To understand what's happening, focus on:

1. **Backend (`server.js`)**
   - How Express creates API endpoints
   - How data is sent as JSON

2. **Frontend (`src/services/api.js`)**
   - How axios makes HTTP requests
   - How to handle responses

3. **Pages (`src/pages/*.js`)**
   - How React components use the API
   - State management with `useState`
   - Effects with `useEffect`

4. **Styling**
   - How Tailwind CSS classes work
   - Responsive design with `md:` prefix

## 🎓 Next Steps to Level Up

Once you understand this:

1. **Add a backend database** (use MongoDB instead of array)
2. **Add user authentication** (login/signup)
3. **Add payment processing** (Stripe/PayPal)
4. **Deploy** (Heroku for backend, Vercel for frontend)
5. **Add state management** (Redux for cart)

## 📝 API Quick Reference

| Method | Endpoint | Returns |
|--------|----------|---------|
| GET | `/api/products` | All products |
| GET | `/api/products/:id` | Single product |
| GET | `/api/products/category/:category` | Products by category |
| GET | `/api/health` | Server status |

## 🤝 Troubleshooting

**Still having issues?**
1. Check both servers are running (2 terminals needed)
2. Open browser console (F12) for error messages
3. Check backend terminal for API logs
4. Make sure ports 3000 (frontend) and 5000 (backend) are free

Happy Learning! 🚀
