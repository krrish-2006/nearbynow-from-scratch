import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./HomePage";
import WishlistPage from "./WishlistPage";
import { Routes, Route, Link } from "react-router-dom";
import ProductDetailsPage from "./ProductDetailsPage";
import GoogleLoginButton from "./GoogleLoginButton";
import { Navigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";

function App() {
  const [searchText, setSearchText] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
fetch(`${import.meta.env.VITE_API_URL}/products`)
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
    if (!user) return;
fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
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
  }, [user]);

  const normalizedSearchText = searchText.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(normalizedSearchText) ||
      product.shopName.toLowerCase().includes(normalizedSearchText);
    const matchesAvailability =
      availabilityFilter === "all" || product.stock > 0;

    return matchesSearch && matchesAvailability;
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
    }
  }, []);

    async function handleAddToWishlist(product) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
      method: "POST",
      headers: {"Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  `${import.meta.env.VITE_API_URL}/wishlist/${productId}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
          <p>{user?.name}</p>
          {isAccountMenuOpen && (
            <div className="account-dropdown">
              <p className="account-dropdown-title">Your Account</p>
              <Link className="account-menu-item" to="/profile">
                Profile
              </Link>
              
              <Link className="account-menu-item" to="/wishlist">
                Wishlist
              </Link>
              <button
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem("user");
                    localStorage.removeItem("token");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <HomePage
                  filteredProducts={filteredProducts}
                  loading={loading}
                  error={error}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  availabilityFilter={availabilityFilter}
                  setAvailabilityFilter={setAvailabilityFilter}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/wishlist"
            element={
              user ? (
                <WishlistPage
                  wishlistProducts={wishlistProducts}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/products/:id"
            element={
              user ? (
                <ProductDetailsPage onAddToWishlist={handleAddToWishlist} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <GoogleLoginButton onLoginSuccess={setUser} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? <ProfilePage user={user} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
