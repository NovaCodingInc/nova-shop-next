import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { SetStateAction } from "react";
import styles from "../../styles/components/productList/productList.module.scss";

function Pagination({
  page,
  setPage,
  total,
}: {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  total: number;
}) {
  function nextHandler(e: any) {
    e.preventDefault();
    if (page < total) setPage((prev) => prev + 1);
  }
  function prevHandler(e: any) {
    e.preventDefault();
    if (page > 1) setPage((prev) => prev - 1);
  }

  return (
    <div className={styles.pagination} >
      <button onClick={() => setPage(total)} disabled={page >= total}>
        صفحه آخر
      </button>
      <button onClick={nextHandler} disabled={page >= total}>
        <ChevronRightIcon className="w-7 h-7" />
      </button>
      <button onClick={prevHandler} disabled={page <= 1}>
        <ChevronLeftIcon className="w-7 h-7" />
      </button>
      <button onClick={() => setPage(1)}  disabled={page <= 1}>
        صفحه نخست
      </button>
    </div>
  );
}

export default Pagination;
