import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";

function ProductDetailsPage({ onAddToWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ProductDetails
      product={product}
      onClose={() => navigate("/")}
      onAddToWishlist={onAddToWishlist}
    />
  );
}

export default ProductDetailsPage;
