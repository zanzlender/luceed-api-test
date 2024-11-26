import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useDebounceValue } from "usehooks-ts";
import { GetProducts } from "../lib/luceed-api";

export default function SearchProducts() {
  const [name, setName] = useState("");
  const [debouncedName] = useDebounceValue(name, 500);

  const queryProducts = useQuery({
    queryKey: ["articles", debouncedName],
    queryFn: () => GetProducts({ name: debouncedName, skip: 0, limit: 10 }),
    enabled: debouncedName !== "",
  });

  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) autoAnimate(parentRef.current);
  }, [parentRef]);

  const handleClickSearch = () => {
    queryProducts.refetch();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Search products by name</h2>
      <div className="flex flex-row gap-4 w-full items-center justify-between">
        <input
          className="w-full px-2 py-1 rounded-sm border border-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button
          className="border border-gray-300 py-1 px-8 rounded-sm bg-gray-100 hover:bg-blue-500 hover:text-white transition-colors duration-150  "
          onClick={handleClickSearch}
        >
          Search
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full max-h-[500px] overflow-y-auto" ref={parentRef}>
        {queryProducts.isLoading && <div>Loading...</div>}
        {queryProducts.isError && <div>Error while loading...</div>}
        {queryProducts.isFetched && queryProducts.data?.result[0].artikli.length === 0 && (
          <div>No results</div>
        )}
        {queryProducts.data?.result[0].artikli?.map((product) => {
          return (
            <div key={product.id}>
              <p>
                ID: {product.id} - Naziv: {product.naziv}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
