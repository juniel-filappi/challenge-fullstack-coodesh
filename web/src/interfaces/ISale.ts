export interface ISale {
  id: string;
  type: {
    id: string;
    type: string;
    description: string;
  };
  date: string;
  product: string;
  value: string;
  salesman: string;
}
