import SearchProducts from "./components/search-products";
import SearchTranscantionByPaymentType from "./components/search-transactions-by-payment-type";
import SearchTranscantionByProducts from "./components/search-transactions-by-products";

function App() {
  return (
    <body className="w-full h-screen">
      <main className="max-w-4xl mx-auto flex flex-col gap-16 items-center py-12 px-3 lg:px-0">
        <h1 className="text-4xl font-semibold">Luceed API test</h1>

        <SearchProducts />

        <SearchTranscantionByPaymentType />

        <SearchTranscantionByProducts />
      </main>
    </body>
  );
}

export default App;
