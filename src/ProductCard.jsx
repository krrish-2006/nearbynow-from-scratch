function ProductCard({ product, onSelectProduct }) {
  return (
    <article className="product-card" onClick={() => onSelectProduct(product)}>
      <img className="product-image" src={product.image} alt="Happy tshirt" />
      <p className="shop-name">{product.shopName}</p>
      <p className="product-name">{product.name}</p>
      <p className="product-price">{product.price}</p>
      <p className="product-stock">{product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}</p>
    </article>
  );
}

export default ProductCard;