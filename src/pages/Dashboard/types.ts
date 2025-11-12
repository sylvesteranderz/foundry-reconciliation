/**
 * Type definitions for the Financial Dashboard
 */

export type TransactionStatus = 'pending' | 'completed' | 'error' | 'reconciled';

export interface Transaction {
  id: string;
  date: string; // ISO format: 'YYYY-MM-DD'
  description: string;
  amount: number;
  status: TransactionStatus;
  category: string;
}

export interface DashboardMetrics {
  total: number;
  pending: number;
  completed: number;
  errors: number;
  totalAmount: number;
  pendingAmount: number;
  completedPercentage: string;
  errorPercentage: string;
}

export interface ChartData {
  labels: string[];
  currentYear: number[];
  previousYear: number[];
}

export interface FilterState {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
}

export interface StatusBadgeConfig {
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  label: string;
  className?: string;
}

export type StatusBadgeMap = Record<TransactionStatus, StatusBadgeConfig>;

