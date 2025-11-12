/**
 * Example: How to integrate the Dashboard into your React Router setup
 * 
 * This file demonstrates different ways to add the Dashboard to your routing.
 * Choose the approach that best fits your application structure.
 */

import { createBrowserRouter, RouterProvider, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '@/layout/main.layout';
import Dashboard from '@/pages/Dashboard';

// ========================================
// OPTION 1: Using createBrowserRouter (Recommended for React Router v6.4+)
// ========================================

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'reconciliation',
        element: <Dashboard />, // Or use Dashboard as default reconciliation view
      },
      // Add other routes here
      // {
      //   path: 'transactions',
      //   element: <TransactionsPage />,
      // },
      // {
      //   path: 'reports',
      //   element: <ReportsPage />,
      // },
    ],
  },
]);

// Usage in main App.tsx or main.tsx:
// function App() {
//   return <RouterProvider router={router} />;
// }

// ========================================
// OPTION 2: Using Routes component (Classic approach)
// ========================================

export function AppWithRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reconciliation" element={<Dashboard />} />
        {/* Add other routes */}
      </Route>
    </Routes>
  );
}

// Usage in main App.tsx:
// import { BrowserRouter } from 'react-router-dom';
// 
// function App() {
//   return (
//     <BrowserRouter>
//       <AppWithRoutes />
//     </BrowserRouter>
//   );
// }

// ========================================
// OPTION 3: Standalone Dashboard (No Layout)
// ========================================

export function StandaloneDashboardRoute() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

// ========================================
// OPTION 4: With Protected Routes (Authentication)
// ========================================

// Example protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = true; // Replace with your auth logic
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export function ProtectedDashboardRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

// ========================================
// OPTION 5: With Navigation Guards and Data Loaders
// ========================================

async function dashboardLoader() {
  // Fetch data before rendering
  const response = await fetch('/api/transactions');
  return response.json();
}

export const advancedRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: dashboardLoader, // Load data before rendering
      },
    ],
  },
]);

// ========================================
// COMPLETE APP EXAMPLE
// ========================================

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';

export function CompleteAppExample() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="foundry-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Dashboard Routes */}
            <Route index element={<Dashboard />} /> {/* Default route */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reconciliation" element={<Dashboard />} />
            
            {/* Add other pages */}
            {/* <Route path="transactions" element={<TransactionsPage />} /> */}
            {/* <Route path="settings" element={<SettingsPage />} /> */}
            
            {/* 404 Not Found */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// ========================================
// NAVIGATION HELPER
// ========================================

// Add to your sidebar or navigation component
export const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard', // lucide-react icon name
  },
  {
    title: 'Reconciliation',
    href: '/reconciliation',
    icon: 'FileCheck',
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: 'Receipt',
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: 'BarChart3',
  },
];

// Usage in Sidebar component:
// import { useNavigate, useLocation } from 'react-router-dom';
// import { navigationItems } from '@/pages/Dashboard/example-routing';
//
// function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//
//   return (
//     <nav>
//       {navigationItems.map((item) => (
//         <button
//           key={item.href}
//           onClick={() => navigate(item.href)}
//           className={location.pathname === item.href ? 'active' : ''}
//         >
//           {item.title}
//         </button>
//       ))}
//     </nav>
//   );
// }

