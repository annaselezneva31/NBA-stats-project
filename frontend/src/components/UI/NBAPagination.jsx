import React from "react";
import Pagination from "react-bootstrap/Pagination";

import { usePagination } from "../../hooks/usePagination.jsx";

const NBAPagination = ({ totalPages, page, changePage }) => {
  const pagesArray = usePagination(totalPages);
  return (
    <Pagination>
      {pagesArray.map((p) => {
        return (
          <Pagination.Item
            key={p}
            active={p === page}
            onClick={() => changePage(p)}
          >
            {p}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default NBAPagination;
