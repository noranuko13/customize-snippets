export interface FormulaOption {
  key: string;
  nameKey: string;
  calc: (numbers: number[]) => number;
}
