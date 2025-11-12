/**
 * Utility functions for the Financial Dashboard
 */

import { Transaction, DashboardMetrics, TransactionStatus, StatusBadgeConfig } from './types';

/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format a date string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Calculate dashboard metrics from transactions
 */
export const calculateMetrics = (transactions: Transaction[]): DashboardMetrics => {
  const total = transactions.length;
  const pending = transactions.filter(t => t.status === 'pending').length;
  const completed = transactions.filter(
    t => t.status === 'completed' || t.status === 'reconciled'
  ).length;
  const errors = transactions.filter(t => t.status === 'error').length;
  
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    total,
    pending,
    completed,
    errors,
    totalAmount,
    pendingAmount,
    completedPercentage: total > 0 ? ((completed / total) * 100).toFixed(1) : '0',
    errorPercentage: total > 0 ? ((errors / total) * 100).toFixed(1) : '0',
  };
};

/**
 * Filter transactions based on search, status, and date
 */
export const filterTransactions = (
  transactions: Transaction[],
  searchTerm: string,
  statusFilter: string,
  dateFilter: string
): Transaction[] => {
  return transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    const matchesDate = !dateFilter || transaction.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });
};

/**
 * Get badge configuration for a transaction status
 */
export const getStatusBadgeConfig = (status: TransactionStatus): StatusBadgeConfig => {
  const statusMap: Record<TransactionStatus, StatusBadgeConfig> = {
    pending: { variant: 'secondary', label: 'Pending' },
    completed: { variant: 'default', label: 'Completed' },
    error: { variant: 'destructive', label: 'Error' },
    reconciled: {
      variant: 'outline',
      label: 'Reconciled',
      className: 'bg-green-50 text-green-700 border-green-200'
    },
  };
  
  return statusMap[status];
};

/**
 * Generate mock transaction data for testing
 */
export const generateMockTransactions = (count: number = 15): Transaction[] => {
  const statuses: TransactionStatus[] = ['pending', 'completed', 'error', 'reconciled'];
  const categories = ['Operations', 'Revenue', 'Technology', 'Marketing', 'Expenses', 'Payroll'];
  const descriptions = [
    'Office Supplies Purchase',
    'Client Payment',
    'Software Subscription',
    'Marketing Campaign',
    'Failed Payment Retry',
    'Vendor Payment',
    'Employee Reimbursement',
    'Cloud Services',
    'Client Invoice',
    'Office Rent Payment',
    'Utility Bills',
    'Consulting Services',
    'Equipment Purchase',
    'Insurance Premium',
    'Travel Expenses',
  ];

  const transactions: Transaction[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    transactions.push({
      id: `TXN${String(i + 1).padStart(3, '0')}`,
      date: date.toISOString().split('T')[0],
      description: descriptions[i % descriptions.length],
      amount: Math.random() * 15000 + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }

  return transactions;
};

/**
 * Export transactions to CSV
 */
export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions.csv'): void => {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Amount', 'Status'];
  const rows = transactions.map(t => [
    t.id,
    t.date,
    t.description,
    t.category,
    t.amount.toString(),
    t.status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Get percentage change between two values
 */
export const getPercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Format percentage with sign
 */
export const formatPercentage = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

