import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./HomePage";
import WishlistPage from "./WishlistPage";
import { Routes, Route, Link } from "react-router-dom";
import ProductDetailsPage from "./ProductDetailsPage";

function App() {
  const [searchText, setSearchText] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
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

  function handleAddToWishlist(product) {
    const alreadyExists = wishlistProducts.some(
      (wishlistProduct) => wishlistProduct._id === product._id,
    );

    if (!alreadyExists) {
      setWishlistProducts([...wishlistProducts, product]);
    }
  }

  function handleRemoveFromWishlist(productId) {
    const updatedWishlist = wishlistProducts.filter(
      (product) => product._id !== productId,
    );

    setWishlistProducts(updatedWishlist);
  }

  function handleIsAccountMenuOpen() {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  }

  return (
    <>
      <header className="app-header">
        <h1 className="logo">NearbyNow</h1>
        <div className="account-menu">
          <button onClick={handleIsAccountMenuOpen} className="account-button">
            Account
          </button>
          {isAccountMenuOpen && (
            <div className="account-dropdown">
              <p className="account-dropdown-title">Your Account</p>
              <p className="account-menu-item">Profile</p>
              <Link className="account-menu-item" to="/wishlist">
                Wishlist
              </Link>
            </div>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                filteredProducts={filteredProducts}
                loading={loading}
                error={error}
                searchText={searchText}
                setSearchText={setSearchText}
                availabilityFilter={availabilityFilter}
                setAvailabilityFilter={setAvailabilityFilter}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlistProducts={wishlistProducts}
                onRemoveFromWishlist={handleRemoveFromWishlist}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetailsPage onAddToWishlist={handleAddToWishlist} />
            }
          />
        </Routes>
      </main>
    </>
  );

}

export default App;
