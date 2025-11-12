# Dashboard Quick Start Guide

Get the Financial Dashboard up and running in 5 minutes! 🚀

## Option 1: View Dashboard Immediately (Fastest)

If you just want to see the dashboard in action:

1. **Update your App.tsx** or create a new route file:

```tsx
// src/App.tsx
import Dashboard from './pages/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
```

2. **Start your dev server:**

```bash
npm run dev
```

3. **Open your browser** and navigate to `http://localhost:5173`

That's it! The dashboard should now be visible with dummy data.

---

## Option 2: Add to Existing Routes (Recommended)

If you already have routing set up:

### Step 1: Import the Dashboard

```tsx
import Dashboard from '@/pages/Dashboard';
```

### Step 2: Add to your routes

```tsx
// In your routing configuration
<Route path="/dashboard" element={<Dashboard />} />
```

### Step 3: Navigate to the dashboard

Visit `/dashboard` in your application.

---

## Option 3: With Sidebar Layout

To use the dashboard with your existing sidebar:

```tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layout/main.layout';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
```

---

## Complete Example (Copy & Paste Ready)

Here's a complete working example you can copy directly:

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/main.layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## Verify It's Working

You should see:

✅ **4 Metric Cards** at the top:
- Total Transactions
- Pending Reconciliation
- Completed
- Errors

✅ **A Line Chart** showing transaction trends

✅ **A Table** with 15 sample transactions

✅ **Filter Controls** above the table:
- Search bar
- Status dropdown
- Date picker

---

## Next Steps

### Connect to Your Backend

Replace the dummy data in `src/pages/Dashboard/index.tsx`:

```tsx
// Instead of DUMMY_TRANSACTIONS, fetch from your API:
const [transactions, setTransactions] = useState([]);

useEffect(() => {
  fetch('/api/transactions')
    .then(res => res.json())
    .then(data => setTransactions(data));
}, []);
```

### Customize the Design

All styling uses Tailwind CSS. Update colors in the component:

```tsx
// Change primary color from green to blue:
className="bg-[#619B7D]"  // Green (current)
className="bg-blue-600"    // Blue (example)
```

### Add More Features

Check out the full README for:
- Pagination
- Export to CSV
- Advanced filtering
- Real-time updates

---

## Troubleshooting

### "Cannot find module '@/pages/Dashboard'"

Make sure your `tsconfig.json` has path mapping:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Icons not showing

Install Lucide React (should already be in dependencies):

```bash
npm install lucide-react
```

### Chart not rendering

The dashboard uses `react-chartjs-2` and `chart.js` which should already be installed. If not:

```bash
npm install react-chartjs-2 chart.js
```

---

## File Structure

```
src/pages/Dashboard/
├── index.tsx              # Main dashboard component
├── types.ts               # TypeScript type definitions
├── utils.ts               # Helper functions
├── constants.ts           # Dummy data and constants
├── README.md             # Full documentation
├── QUICKSTART.md         # This file
└── example-routing.tsx    # Routing examples
```

---

## Need Help?

- Check the full **README.md** for detailed documentation
- Look at **example-routing.tsx** for routing examples
- Review **types.ts** for data structure requirements

---

## Summary

✨ **To get started:**

1. Import: `import Dashboard from '@/pages/Dashboard';`
2. Use: `<Dashboard />` or add to routes
3. View: Navigate to the dashboard route

That's it! You're ready to go! 🎉

