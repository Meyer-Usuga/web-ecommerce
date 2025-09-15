export interface FilterValue {
  label: string;
  value: string;
}
export interface ActiveFilters {
  [key: string]: string[];
}
export interface Filters {
  sizes: FilterValue[];
  colors: FilterValue[];
  collections: FilterValue[];
  special: FilterValue[];
  categories: FilterValue[];
  availability: FilterValue[];
  prices: FilterValue[];
  ratings: FilterValue[];
}
