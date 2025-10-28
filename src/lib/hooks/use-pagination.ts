"use client";

import { useMemo, useState } from "react";

export const usePagination = <T,>(
  items: T[],
  pageSize = 6,
  initialPage = 1,
) => {
  const [page, setPage] = useState(initialPage);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return {
    page,
    pageCount,
    setPage,
    items: paginatedItems,
  };
};
