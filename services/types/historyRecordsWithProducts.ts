import { Products } from "./products";
import { Users } from "./users";

export type HistoryRecordsWithInformations = {
  id: number;
  user_id: number;
  product_id: number;
  description: string | null;
  status_id: number;
  date_loan: Date | null;
  date_return: Date | null;
  loan_duration: number;
  products: Pick<Products, "name"> | null;
  users?: Pick<Users, "name" | "registration"> | null;
  created_at?: Date | null;
  date_refused: Date | null;
};