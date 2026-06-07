import ProductList from "./ProductList";
import SearchAndFilters from "./SearchAndFilters";



function HomePage({
  filteredProducts,
  loading,
  error,
  searchText,
  setSearchText,
  availabilityFilter,
  setAvailabilityFilter,
}) {
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <SearchAndFilters
        searchText={searchText}
        setSearchText={setSearchText}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
      />

      <ProductList
        filteredProducts={filteredProducts}
      />
    </>
  );
}
export default HomePage;
