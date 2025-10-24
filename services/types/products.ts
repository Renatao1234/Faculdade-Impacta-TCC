export type Products = {
  id: number;
  name: string;
  description: string | null
  category_id: number;
  available_amount: number;
  amount_rented: number;
  amount_damaged: number;
  status_id: number;
  position_id: number;
};