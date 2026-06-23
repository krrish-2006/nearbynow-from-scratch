
function ProductDetails({ product, onClose, onAddToWishlist }) {
  return (
    <section className="product-details">
      <button className="details-back-button" onClick={() => onClose()}>
        Back
      </button>
      <img className="details-image" src={product.image} alt={product.name} />
      <p className="details-shopname">{product.shopName}</p>
      <p className="details-name">{product.name}</p>
      <p className="details-price">{product.price}</p>
      <p className="details-stock">
        {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
      </p>
      <p className="details-seller-contact">
        {`Contact Seller : ${product.sellerContact}`}
      </p>
      <p className="details-address">{`Shop Address : ${product.shopAddress}`}</p>
      <a
        className="details-map-link"
        href={product.mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open in Google Maps
      </a>
      <button
        onClick={() => onAddToWishlist(product)}
        className="interested-button"
      >
        Add to Wishlist
      </button>
    </section>
  );
}

export default ProductDetails;