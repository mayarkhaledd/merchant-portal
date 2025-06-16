import { useState } from "react";

export const useSettings = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListSize, setTotalListSize] = useState(0);

  return {
    setPopupType,
    setIsPopupOpen,
    isPopupOpen,
    popupType,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalListSize,
    setTotalListSize,
  };
};
