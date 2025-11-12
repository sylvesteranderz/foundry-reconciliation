import { mutateFn } from '@/services/mutation.api';
import { onUpdateAuthSlice } from '@/store/features/auth.slice';
import { RootState } from '@/store/store';
import { variables } from '@/utils/env';
import { isEmpty, lowerCase } from 'lodash';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

const useSubscription = () => {
  const { organization } = useSelector((state: RootState) => state.auth);
  const firstTwoWords = organization?.name?.split(' ')?.slice(0, 1)?.join(' ');
  const dispatch = useDispatch();

  const { data, isLoading, refetch, isFetching, error } = useQuery<
    Array<ISubscription>
  >({
    queryKey: ['list', 'subscriptions', organization?.id, firstTwoWords],
    queryFn: () =>
      mutateFn({
        url: variables('control-tower').BASE_URL + `/crm/list/subscriptions`,
        data: {
          filters: [['Subscription', 'party', 'like', `%${firstTwoWords}%`]],
        },
      }),
    onSuccess(data: any) {
      const subscriptions = data?.data || [];
      const active_sub = subscriptions.find(
        (i: any) => lowerCase(i?.status) === 'active'
      );
      const is_active = !isEmpty(active_sub);
      dispatch(onUpdateAuthSlice({ isSubscribed: is_active }));
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
    enabled: !!firstTwoWords,
    retry: 0,
  });

  const { data: subscriptions } = Object.assign(
    { data: [] as Array<ISubscription> },
    data
  );

  return { subscriptions, isLoading, refetch, isFetching, error };
};

export interface ISubscription {
  name: string;
  creation: Date;
  modified: Date;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  party_type: string;
  party: string;
  company: string;
  status: string;
  start_date: Date;
  end_date: Date;
  cancelation_date: null;
  trial_period_start: null;
  trial_period_end: null;
  follow_calendar_months: number;
  generate_new_invoices_past_due_date: number;
  current_invoice_start: Date;
  current_invoice_end: Date;
  days_until_due: number;
  cancel_at_period_end: number;
  generate_invoice_at_period_start: number;
  sales_tax_template: null;
  purchase_tax_template: null;
  apply_additional_discount: string;
  additional_discount_percentage: number;
  additional_discount_amount: number;
  submit_invoice: number;
  cost_center: string;
  _user_tags: null;
  _comments: null;
  _assign: null;
  _liked_by: null;
  customer: null;
  subscription_plan: string;
  pricing_tier: string;
  custom_pricing_tier: string;
}

export interface IPosProfile {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  company: string;
  customer: null;
  country: string;
  disabled: number;
  warehouse: string;
  campaign: null;
  company_address: null;
  hide_images: number;
  hide_unavailable_items: number;
  auto_add_item_to_cart: number;
  validate_stock_on_save: number;
  update_stock: number;
  ignore_pricing_rule: number;
  allow_rate_change: number;
  allow_discount_change: number;
  print_format: null;
  letter_head: null;
  tc_name: null;
  select_print_heading: null;
  selling_price_list: string;
  currency: string;
  write_off_account: string;
  write_off_cost_center: string;
  write_off_limit: number;
  account_for_change_amount: null;
  disable_rounded_total: number;
  income_account: null;
  expense_account: null;
  taxes_and_charges: null;
  tax_category: null;
  apply_discount_on: string;
  cost_center: null;
  doctype: string;
  customer_groups: Array<any>;
  payments: {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    default: number;
    allow_in_returns: number;
    mode_of_payment: string;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
  }[];
  applicable_for_users: {
    name?: string;
    owner?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
    __islocal?: number;
    __unsaved?: number;
    docstatus?: number;
    idx?: number;
    default?: number;
    user?: string;
    parent?: string;
    parentfield?: string;
    parenttype?: string;
    doctype?: string;
    __unedited?: boolean;
  }[];
  item_groups: Array<any>;
  taxes: Array<ITax>;
}

interface ITax {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  charge_type: string;
  row_id: null | string;
  account_head: string;
  description: string;
  included_in_print_rate: number;
  included_in_paid_amount: number;
  cost_center: string;
  branch: null | string;
  rate: number;
  account_currency: string;
  tax_amount: number;
  total: number;
  tax_amount_after_discount_amount: number;
  base_tax_amount: number;
  base_total: number;
  base_tax_amount_after_discount_amount: number;
  item_wise_tax_detail: null | any;
  dont_recompute_tax: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

type Assignee = {
  name: string;
  email: string;
  roles: Array<string>;
};

export type IWorkflow = {
  _id: string;
  orgId: string;
  name: string;
  products: string[];
  description: string;
  createdAt: string;
  states: string[];
  stages: Array<{
    assignee: Assignee;
    next?: Assignee;
    index: number;
    action: string;
    isFinal: boolean;
    assigneeType: string;
    nextType: string;
    _id: string;
  }>;
  enabled: boolean;
};

// Generated by https://quicktype.io

export interface ICompany {
  name: string;
  owner: string;
  creation: Date;
  modified: Date;
  modified_by: string;
  docstatus: number;
  idx: number;
  company_name: string;
  abbr: string;
  default_currency: string;
  country: string;
  is_group: number;
  default_holiday_list: null;
  default_letter_head: null;
  tax_id: null;
  domain: null;
  date_of_establishment: null;
  parent_company: null;
  company_logo: null;
  date_of_incorporation: null;
  phone_no: null;
  email: null;
  company_description: null;
  date_of_commencement: null;
  fax: null;
  website: null;
  create_chart_of_accounts_based_on: string;
  existing_company: null;
  chart_of_accounts: string;
  default_buying_terms: null;
  sales_monthly_history: string;
  monthly_sales_target: number;
  total_monthly_sales: number;
  default_selling_terms: null;
  default_warehouse_for_sales_return: null;
  credit_limit: number;
  default_expense_claim_payable_account: null;
  default_employee_advance_account: string;
  default_payroll_payable_account: string;
  transactions_annual_history: string;
  default_bank_account: null;
  default_cash_account: string;
  default_receivable_account: string;
  round_off_account: string;
  round_off_cost_center: string;
  write_off_account: string;
  exchange_gain_loss_account: string;
  unrealized_exchange_gain_loss_account: null;
  unrealized_profit_loss_account: null;
  allow_account_creation_against_child_company: number;
  default_payable_account: string;
  default_expense_account: string;
  default_income_account: string;
  default_deferred_revenue_account: null;
  default_deferred_expense_account: null;
  default_discount_account: null;
  payment_terms: null;
  cost_center: string;
  default_finance_book: null;
  enable_perpetual_inventory: number;
  enable_provisional_accounting_for_non_stock_items: number;
  default_inventory_account: string;
  stock_adjustment_account: string;
  default_in_transit_warehouse: null;
  stock_received_but_not_billed: string;
  default_provisional_account: null;
  expenses_included_in_valuation: string;
  accumulated_depreciation_account: string;
  depreciation_expense_account: string;
  series_for_depreciation_entry: null;
  expenses_included_in_asset_valuation: string;
  disposal_account: string;
  depreciation_cost_center: string;
  capital_work_in_progress_account: string;
  asset_received_but_not_billed: string;
  exception_budget_approver_role: null;
  registration_details: null;
  lft: number;
  rgt: number;
  old_parent: string;
  doctype: string;
}

// Generated by https://quicktype.io

export interface IItemImage {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  organizationId: string;
  itemCode: string;
  imageUrl: string;
}
export default useSubscription;
