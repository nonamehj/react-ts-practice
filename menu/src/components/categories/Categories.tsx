interface Category {
  categories: string[];
  filterItems: (category: string) => void;
}

const Categories = ({ categories, filterItems }: Category) => {
  return (
    <div className="btn-container">
      {categories.map((category) => {
        return (
          <button
            key={category}
            className="filter-btn"
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
export default Categories;
