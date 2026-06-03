import "./App.css";
import { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails"
import SearchAndFilters from "./SearchAndFilters";
import ProductList from "./ProductList";


function App() {
  const [searchText, setSearchText] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
    const [interested, setInterested] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
  setError("Unable to load products. Please try again.");
  setLoading(false);
      });
  }, []);


  const normalizedSearchText = searchText.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(normalizedSearchText) ||
      product.shopName.toLowerCase().includes(normalizedSearchText);
    const matchesAvailability =
      availabilityFilter === "all" || product.stock > 0;

    return matchesSearch && matchesAvailability;
  });

  function handleInterested(){
    setInterested(interested+1);
  }

  return (
    <>
      {!selectedProduct && (
        <header className="app-header">
          <h1 className="logo">NearbyNow</h1>
          <h2 className="interested-counter">Interested: {interested}</h2>
        </header>
      )}
      {!selectedProduct && (
        <SearchAndFilters
          searchText={searchText}
          setSearchText={setSearchText}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
        />
      )}
      <main>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onInterested={handleInterested}
          />
        )}

        {!selectedProduct && !loading && !error && (
          <ProductList
            onSelectProduct={setSelectedProduct}
            filteredProducts={filteredProducts}
          />
        )}
      </main>
    </>
  );
}

export default App;
