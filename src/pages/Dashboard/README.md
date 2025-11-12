# Financial Dashboard

A comprehensive financial dashboard page for transaction reconciliation built with React and TypeScript.

## Features

✅ **Key Performance Indicators (KPIs)**
- Total Transactions with amount
- Pending Reconciliations count
- Completed transactions percentage
- Error tracking and monitoring

✅ **Interactive Chart**
- Transaction trends visualization
- Year-over-year comparison
- Responsive and interactive

✅ **Transaction Management Table**
- Sortable and filterable data
- Search by description, ID, or category
- Status filtering (All, Pending, Completed, Reconciled, Error)
- Date filtering
- Action buttons for reconciliation and viewing details

✅ **Responsive Design**
- Mobile-first approach
- Adapts to all screen sizes
- Clean and modern UI

## Usage

### Basic Integration

To use the Dashboard in your application, import it and add it to your routes:

```tsx
import Dashboard from '@/pages/Dashboard';

// In your route configuration
<Route path="/dashboard" element={<Dashboard />} />
```

### With Main Layout (Sidebar + Content)

If you want to use it within your existing layout with sidebar:

```tsx
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layout/main.layout';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Other routes */}
      </Route>
    </Routes>
  );
}
```

### Standalone Usage

You can also use it as a standalone page without the layout:

```tsx
import Dashboard from '@/pages/Dashboard';

function App() {
  return <Dashboard />;
}
```

## Components Used

The Dashboard uses the following existing components from your project:

- **UI Components**
  - `Card` - For metric displays and section containers
  - `Table` - For transaction listing
  - `Input` - For search and date filters
  - `Button` - For actions and filters
  - `Badge` - For status indicators
  - `Select` - For status dropdown filter

- **Chart Component**
  - `PerformanceInsightLineChart` - For transaction trends

- **Icons**
  - Lucide React icons for visual elements

## Data Structure

### Transaction Type

```typescript
interface Transaction {
  id: string;
  date: string; // ISO format: 'YYYY-MM-DD'
  description: string;
  amount: number;
  status: 'pending' | 'completed' | 'error' | 'reconciled';
  category: string;
}
```

## Connecting to Backend

Currently, the Dashboard uses dummy data. To connect to your backend:

### 1. Create an API service

```typescript
// src/services/transactionService.ts
export const fetchTransactions = async () => {
  const response = await fetch('/api/transactions');
  return response.json();
};
```

### 2. Update the Dashboard component

Replace the `DUMMY_TRANSACTIONS` constant with a data fetching hook:

```typescript
import { useEffect, useState } from 'react';
import { fetchTransactions } from '@/services/transactionService';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Rest of the component...
};
```

### 3. Using React Query (Recommended)

For better data management, use React Query (already in your dependencies):

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '@/services/transactionService';

const Dashboard = () => {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  // Rest of the component...
};
```

## Customization

### Styling

The Dashboard uses Tailwind CSS and inherits dark mode support from your theme provider. Customize colors by modifying the Tailwind classes.

### Metrics Calculation

Metrics are automatically calculated from transaction data. To add new metrics, update the `metrics` useMemo hook:

```typescript
const metrics = useMemo(() => {
  // Add your custom calculations here
  const customMetric = transactions.filter(/* your logic */).length;
  
  return {
    // existing metrics...
    customMetric,
  };
}, [transactions]);
```

### Chart Data

Update the `CHART_DATA` to use real data from your backend:

```typescript
const chartData = useMemo(() => {
  // Transform your transaction data into chart format
  return {
    labels: monthLabels,
    currentYear: monthlyTotals,
    previousYear: previousYearTotals,
  };
}, [transactions]);
```

## Features to Implement

Suggested enhancements for production use:

- [ ] Pagination for the transaction table
- [ ] Export to CSV/Excel functionality
- [ ] Advanced filtering (date range, amount range)
- [ ] Sorting by columns (date, amount, status)
- [ ] Transaction detail modal
- [ ] Bulk actions (reconcile multiple transactions)
- [ ] Real-time updates via WebSocket
- [ ] Loading states and skeletons
- [ ] Error handling and error boundaries
- [ ] Print/PDF export functionality

## Dependencies

All required dependencies are already in your project:

- React & React DOM
- Lucide React (icons)
- Recharts (for future chart enhancements)
- Chart.js & react-chartjs-2 (current charts)
- Tailwind CSS
- Radix UI components (via shadcn/ui)

## Performance Considerations

- Uses `useMemo` for expensive calculations
- Filters are optimized with memoization
- Virtual scrolling can be added for large datasets
- Consider pagination for 1000+ transactions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## License

Part of the Foundry Reconciliation project.

