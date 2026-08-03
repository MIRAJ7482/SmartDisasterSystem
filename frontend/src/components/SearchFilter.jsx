function SearchFilter({
  search,
  setSearch,
  severityFilter,
  setSeverityFilter,
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <div className="row">

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="🔍 Search by Location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={severityFilter}
              onChange={(e) =>
                setSeverityFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SearchFilter;