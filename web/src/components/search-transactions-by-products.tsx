import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { GetTransactionsByProduct } from "../lib/luceed-api";
import { useMutation } from "@tanstack/react-query";

export default function SearchTranscantionByProducts() {
  const [paymentType, setPaymentType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const parentRef = useRef(null);
  useEffect(() => {
    if (parentRef.current) autoAnimate(parentRef.current);
  }, [parentRef]);

  const transactionsMutation = useMutation({
    mutationFn: GetTransactionsByProduct,
  });

  const handleClickSearch = () => {
    transactionsMutation.mutate({
      dateFrom: dateFrom,
      dateTo: dateTo,
      paymentType: paymentType,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Transactions calculation by products</h2>
      <div className="flex flex-row gap-4 w-full items-end justify-between flex-wrap">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Payment type</span>
          <select
            className="rounded-sm border border-gray-300 py-2 px-3"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="" disabled selected>
              Select an option...
            </option>
            <option value="4986-1">Gotovina</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Date from</span>
          <input
            type="date"
            className="rounded-sm border border-gray-300 py-2 px-3"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">Date to</span>
          <input
            type="date"
            className="rounded-sm border border-gray-300 py-2 px-3"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        <button
          onClick={handleClickSearch}
          className="border border-gray-300 py-1 px-8 rounded-sm bg-gray-100 hover:bg-blue-500 hover:text-white transition-colors duration-150  "
        >
          Search
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full max-h-[500px] overflow-y-auto" ref={parentRef}>
        {transactionsMutation.isPending && <div>Loading...</div>}
        {transactionsMutation.isError && <div>Error while loading...</div>}
        {transactionsMutation.isSuccess &&
          transactionsMutation.data.result[0].obracun_artikli.length === 0 && <div>No results</div>}
        {transactionsMutation.data?.result[0].obracun_artikli?.map((transaction) => {
          console.log(transaction);
          return (
            <div key={transaction.vrste_placanja_uid}>
              <p>
                ID: {transaction.vrste_placanja_uid} - Naziv: {transaction.naziv} - Iznos:{" "}
                {transaction.iznos}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
