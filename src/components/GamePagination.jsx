import PropTypes from "prop-types";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { buildPageItems } from "../utils/pagination";

const GamePagination = ({
   currentPage,
   totalPages,
   totalCount,
   pageSize,
   onPageChange,
   hasNextPage,
   resourceName = "games",
}) => {
   const safeTotal = Math.max(1, totalPages);
   const pageItems = buildPageItems(currentPage, safeTotal);
   const isFirst = currentPage <= 1;
   const isLast = currentPage >= safeTotal || !hasNextPage;

   const handlePageClick = (page) => {
      if (page < 1 || page > safeTotal || page === currentPage) {
         return;
      }
      onPageChange(page);
   };

   const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
   const endIndex = totalCount === 0 ? 0 : Math.min(currentPage * pageSize, totalCount);

   return (
      <nav
         className="mt-6 flex w-full flex-col items-center gap-3 pb-4"
         aria-label="Pagination"
      >
         <p className="text-center text-xs text-muted sm:text-sm">
            {totalCount > 0 ? (
               <>
                  Showing{" "}
                  <span className="font-semibold text-text">{startIndex.toLocaleString()}</span>
                  –
                  <span className="font-semibold text-text">{endIndex.toLocaleString()}</span>
                  {" of "}
                  <span className="font-semibold text-text">{totalCount.toLocaleString()}</span>
                  {` ${resourceName} · `}
               </>
            ) : null}
            Page{" "}
            <span className="font-semibold text-text">{currentPage}</span>
            {" of "}
            <span className="font-semibold text-text">{safeTotal}</span>
         </p>

         <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            <button
               type="button"
               onClick={() => handlePageClick(1)}
               disabled={isFirst}
               className="zog-pagination-btn zog-pagination-icon"
               aria-label="First page"
               title="First page"
            >
               <FaAnglesLeft className="h-4 w-4" aria-hidden />
               <span className="hidden sm:inline">First</span>
            </button>

            <button
               type="button"
               onClick={() => handlePageClick(currentPage - 1)}
               disabled={isFirst}
               className="zog-pagination-btn zog-pagination-icon"
               aria-label="Previous page"
               title="Previous page"
            >
               <IoChevronBack className="h-5 w-5" aria-hidden />
               <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="mx-1 flex flex-wrap items-center justify-center gap-1 sm:mx-2 sm:gap-1.5">
               {pageItems.map((item, idx) =>
                  item === "ellipsis" ? (
                     <span
                        key={`ellipsis-${idx}`}
                        className="flex h-9 min-w-[2.25rem] items-center justify-center px-1 text-sm text-muted"
                        aria-hidden
                     >
                        …
                     </span>
                  ) : (
                     <button
                        key={item}
                        type="button"
                        onClick={() => handlePageClick(item)}
                        aria-label={`Page ${item}`}
                        aria-current={item === currentPage ? "page" : undefined}
                        className={`zog-pagination-num ${item === currentPage ? "zog-pagination-num-active" : ""}`}
                     >
                        {item}
                     </button>
                  )
               )}
            </div>

            <button
               type="button"
               onClick={() => handlePageClick(currentPage + 1)}
               disabled={isLast}
               className="zog-pagination-btn zog-pagination-icon"
               aria-label="Next page"
               title="Next page"
            >
               <span className="hidden sm:inline">Next</span>
               <IoChevronForward className="h-5 w-5" aria-hidden />
            </button>

            <button
               type="button"
               onClick={() => handlePageClick(safeTotal)}
               disabled={isLast}
               className="zog-pagination-btn zog-pagination-icon"
               aria-label="Last page"
               title="Last page"
            >
               <span className="hidden sm:inline">Last</span>
               <FaAnglesRight className="h-4 w-4" aria-hidden />
            </button>
         </div>
      </nav>
   );
};

GamePagination.propTypes = {
   currentPage: PropTypes.number.isRequired,
   totalPages: PropTypes.number.isRequired,
   totalCount: PropTypes.number.isRequired,
   pageSize: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
   hasNextPage: PropTypes.bool.isRequired,
   resourceName: PropTypes.string,
};

export default GamePagination;
