import { Categories } from "./categories";
import { Products } from "./products";

export type ProductWithCategory = Products & {
  categories: Pick<Categories, "name">;
};