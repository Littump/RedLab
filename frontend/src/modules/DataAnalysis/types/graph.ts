export type TNode = {
  id: string;
  x: number;
  y: number;
  is_anomal: number | null;
};

export interface ITable {
  name_x: string;
  name_y: string;
  points: TNode[];
  id: number;
}
