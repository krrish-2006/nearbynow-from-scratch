import ProductCard from "./ProductCard";

function WishlistPage({ wishlistProducts }) {
  if (wishlistProducts.length === 0) {
    return <p>Your wishlist is empty</p>;
  }

  return (
    <section className="wishlist-page">
      <h2>Your Wishlist</h2>

      <div className="products-grid">
        {wishlistProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default WishlistPage;
