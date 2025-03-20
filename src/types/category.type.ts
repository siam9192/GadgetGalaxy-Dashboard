export type TAddCategory = {
  id: number;
  name: string;
  hierarchyStr: string;
};
export interface IChoseCategory {
  id: number;
  name: string;
  hierarchyStr: string;
}

export type TEditCategory = TAddCategory & { isDeleted?: boolean };
