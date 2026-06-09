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

  useEffect(() => {
    fetch("http://localhost:5000/wishlist")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        return response.json();
      })
      .then((data) => {
        setWishlistProducts(data);
      })
      .catch((error) => {
        console.log("Unable to load wishlist", error);
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

  async function handleAddToWishlist(product) {
    const response = await fetch("http://localhost:5000/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product._id,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to add product to wishlist");
    }

    setWishlistProducts([...wishlistProducts, product]);
  }

  async function handleRemoveFromWishlist(productId) {
    const response = await fetch(
      `http://localhost:5000/wishlist/${productId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Unable to remove product from wishlist");
    }

    setWishlistProducts((currentWishlist) =>
      currentWishlist.filter((product) => product._id !== productId),
    );
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
