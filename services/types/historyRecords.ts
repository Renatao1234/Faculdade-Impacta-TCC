
export type HistoryRecords = {
  id: number;
  user_id: number;
  product_id: number;
  description: string | null;
  status_id: number;
  date_loan: Date | null;
  date_return: Date | null;
  loan_duration: number;
  date_refused: Date | null;
};