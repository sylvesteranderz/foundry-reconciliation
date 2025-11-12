/**
 * Constants for the Financial Dashboard
 */

import { Transaction } from './types';

/**
 * Dummy transactions for demo purposes
 */
export const DUMMY_TRANSACTIONS: Transaction[] = [
  { id: 'TXN001', date: '2025-11-12', description: 'Office Supplies Purchase', amount: 450.00, status: 'completed', category: 'Operations' },
  { id: 'TXN002', date: '2025-11-12', description: 'Client Payment - ABC Corp', amount: 15000.00, status: 'reconciled', category: 'Revenue' },
  { id: 'TXN003', date: '2025-11-11', description: 'Software Subscription', amount: 299.99, status: 'pending', category: 'Technology' },
  { id: 'TXN004', date: '2025-11-11', description: 'Marketing Campaign', amount: 2500.00, status: 'completed', category: 'Marketing' },
  { id: 'TXN005', date: '2025-11-10', description: 'Failed Payment Retry', amount: 890.00, status: 'error', category: 'Operations' },
  { id: 'TXN006', date: '2025-11-10', description: 'Vendor Payment - XYZ Ltd', amount: 3200.00, status: 'reconciled', category: 'Expenses' },
  { id: 'TXN007', date: '2025-11-09', description: 'Employee Reimbursement', amount: 156.50, status: 'pending', category: 'Payroll' },
  { id: 'TXN008', date: '2025-11-09', description: 'Cloud Services AWS', amount: 1850.00, status: 'completed', category: 'Technology' },
  { id: 'TXN009', date: '2025-11-08', description: 'Client Invoice #1234', amount: 8750.00, status: 'reconciled', category: 'Revenue' },
  { id: 'TXN010', date: '2025-11-08', description: 'Office Rent Payment', amount: 5000.00, status: 'completed', category: 'Operations' },
  { id: 'TXN011', date: '2025-11-07', description: 'Utility Bills', amount: 320.00, status: 'pending', category: 'Operations' },
  { id: 'TXN012', date: '2025-11-07', description: 'Consulting Services', amount: 4500.00, status: 'error', category: 'Professional Services' },
  { id: 'TXN013', date: '2025-11-06', description: 'Equipment Purchase', amount: 12000.00, status: 'reconciled', category: 'Capital' },
  { id: 'TXN014', date: '2025-11-06', description: 'Insurance Premium', amount: 1200.00, status: 'completed', category: 'Operations' },
  { id: 'TXN015', date: '2025-11-05', description: 'Travel Expenses', amount: 876.25, status: 'pending', category: 'Operations' },
];

/**
 * Chart data for transaction trends
 */
export const CHART_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  currentYear: [12500, 15000, 18000, 22000, 19000, 25000, 28000, 26000, 30000, 32000, 35000],
  previousYear: [10000, 12000, 14000, 16000, 15000, 18000, 20000, 19000, 22000, 24000, 26000],
};

/**
 * Status filter options
 */
export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'reconciled', label: 'Reconciled' },
  { value: 'error', label: 'Error' },
];

/**
 * Transaction categories
 */
export const CATEGORIES = [
  'Operations',
  'Revenue',
  'Technology',
  'Marketing',
  'Expenses',
  'Payroll',
  'Professional Services',
  'Capital',
];

/**
 * Chart colors
 */
export const CHART_COLORS = {
  primary: '#619B7D',
  secondary: '#C6D9CF',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
};

/**
 * Default page size for pagination
 */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * Maximum number of transactions to display without pagination
 */
export const MAX_TRANSACTIONS_WITHOUT_PAGINATION = 50;

