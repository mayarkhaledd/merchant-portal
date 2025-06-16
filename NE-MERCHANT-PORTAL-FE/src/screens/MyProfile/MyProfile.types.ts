export interface MyProfileState {
  isFilterOpen: boolean;
  setIsFilterOpen: (state: boolean) => void;
  currentPage: number;
  setCurrentPage: (state: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (state: number) => void;
  totalListSize: number;
  setTotalListSize: (state: number) => void;
}
