import ProductCard from "./ProductCard";

function ProductList({ filteredProducts }) {
  return (
    <section className="products-list">
      <h2 className="products-nearby">Products Nearby</h2>
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-products-message">No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ProductList;
