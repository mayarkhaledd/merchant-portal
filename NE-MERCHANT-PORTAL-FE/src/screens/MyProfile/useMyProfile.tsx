import { useState } from "react";

export function useMyProfile() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);

  return {
    isFilterOpen,
    setIsFilterOpen,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalListSize,
    setTotalListSize,
  };
}
