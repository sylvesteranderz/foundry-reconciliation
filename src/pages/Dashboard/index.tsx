import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PerformanceInsightLineChart } from '@/components/charts/new-line-chart';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Calendar,
  ArrowUpRight,
  Eye
} from 'lucide-react';

// Types
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'pending' | 'completed' | 'error' | 'reconciled';
  category: string;
}

// Dummy Data
const DUMMY_TRANSACTIONS: Transaction[] = [
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

const CHART_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  currentYear: [12500, 15000, 18000, 22000, 19000, 25000, 28000, 26000, 30000, 32000, 35000],
  previousYear: [10000, 12000, 14000, 16000, 15000, 18000, 20000, 19000, 22000, 24000, 26000],
};

const Dashboard = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');

  // Calculate Metrics
  const metrics = useMemo(() => {
    const total = DUMMY_TRANSACTIONS.length;
    const pending = DUMMY_TRANSACTIONS.filter(t => t.status === 'pending').length;
    const completed = DUMMY_TRANSACTIONS.filter(t => t.status === 'completed' || t.status === 'reconciled').length;
    const errors = DUMMY_TRANSACTIONS.filter(t => t.status === 'error').length;
    
    const totalAmount = DUMMY_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
    const pendingAmount = DUMMY_TRANSACTIONS.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
    
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
  }, []);

  // Filter Transactions
  const filteredTransactions = useMemo(() => {
    return DUMMY_TRANSACTIONS.filter(transaction => {
      const matchesSearch = 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      
      const matchesDate = !dateFilter || transaction.date === dateFilter;
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, statusFilter, dateFilter]);

  // Get Status Badge
  const getStatusBadge = (status: Transaction['status']) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'Pending', className: '' },
      completed: { variant: 'default' as const, label: 'Completed', className: '' },
      error: { variant: 'destructive' as const, label: 'Error', className: '' },
      reconciled: { variant: 'outline' as const, label: 'Reconciled', className: 'bg-green-50 text-green-700 border-green-200' },
    };
    
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  // Format Currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format Date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-full p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Financial Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Overview of transaction reconciliation and financial metrics
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.totalAmount)}</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+12.5%</span> from last month
              </p>
              <div className="text-xs text-slate-500 mt-2">
                {metrics.total} total transactions
              </div>
            </CardContent>
          </Card>

          {/* Pending Reconciliations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reconciliation</CardTitle>
              <Clock className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.pending}</div>
              <p className="text-xs text-slate-500 mt-1">
                {formatCurrency(metrics.pendingAmount)} awaiting review
              </p>
              <div className="text-xs text-slate-500 mt-2">
                Requires attention
              </div>
            </CardContent>
          </Card>

          {/* Completed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.completed}</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span className="text-green-500">{metrics.completedPercentage}%</span> completion rate
              </p>
              <div className="text-xs text-slate-500 mt-2">
                Successfully processed
              </div>
            </CardContent>
          </Card>

          {/* Errors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Errors</CardTitle>
              <AlertCircle className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{metrics.errors}</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-red-500" />
                <span className="text-red-500">{metrics.errorPercentage}%</span> error rate
              </p>
              <div className="text-xs text-slate-500 mt-2">
                Need immediate attention
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Trends</CardTitle>
            <CardDescription>
              Monthly transaction volume comparison (Current vs Previous Year)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <PerformanceInsightLineChart
                labels={CHART_DATA.labels}
                data1={CHART_DATA.currentYear}
                data2={CHART_DATA.previousYear}
                tension={0.4}
                hideGrid={false}
              />
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#619B7D]"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Current Year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C6D9CF]"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Previous Year</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Table Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              View and manage your transaction reconciliation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by description, ID, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="reconciled">Reconciled</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative w-full md:w-[180px]">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-9"
                />
              </div>

              {(searchTerm || statusFilter !== 'all' || dateFilter) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setDateFilter('');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-slate-500 mb-4">
              Showing {filteredTransactions.length} of {DUMMY_TRANSACTIONS.length} transactions
            </div>

            {/* Transactions Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[140px]">Category</TableHead>
                    <TableHead className="text-right w-[120px]">Amount</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="text-right w-[140px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                        No transactions found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                        <TableCell className="text-sm">{formatDate(transaction.date)}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {transaction.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {transaction.status === 'pending' ? (
                              <Button size="sm" variant="default" className="h-8">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Reconcile
                              </Button>
                            ) : transaction.status === 'error' ? (
                              <Button size="sm" variant="destructive" className="h-8">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Resolve
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="h-8">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

