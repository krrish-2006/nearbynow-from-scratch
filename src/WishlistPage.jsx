import ProductCard from "./ProductCard";

function WishlistPage({ wishlistProducts, onRemoveFromWishlist }) {
  if (wishlistProducts.length === 0) {
    return <p>Your wishlist is empty</p>;
  }

  return (
    <section className="wishlist-page">
      <h2>Your Wishlist</h2>

      <div className="products-grid">
        {wishlistProducts.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
            <button onClick={() => onRemoveFromWishlist(product._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WishlistPage;
