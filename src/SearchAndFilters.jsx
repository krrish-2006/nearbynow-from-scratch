
function SearchAndFilters({
  searchText,
  setSearchText,
  availabilityFilter,
  setAvailabilityFilter,
}) {
  return (
    <section className="search-section">
      <input
        className="search-input"
        type="text"
        value={searchText}
        placeholder="Search products nearby"
        onChange={(event) => setSearchText(event.target.value)}
      />
      <div className="filter-buttons">
        <button
          onClick={() => setAvailabilityFilter("all")}
          className={
            availabilityFilter === "all"
              ? "filter-button active-filter"
              : "filter-button"
          }
        >
          All
        </button>
        <button
          onClick={() => setAvailabilityFilter("inStock")}
          className={
            availabilityFilter === "inStock"
              ? "filter-button active-filter"
              : "filter-button"
          }
        >
          In Stock
        </button>
      </div>
    </section>
  );
}

export default SearchAndFilters;