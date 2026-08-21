function FilterBar({
  search,
  setSearch,
  severityFilter,
  setSeverityFilter,
  disasterTypeFilter,
  setDisasterTypeFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  disasterTypes = [],
}) {
  const handleReset = () => {
    setSearch("");
    setSeverityFilter("All");
    setDisasterTypeFilter("All");
    setStatusFilter("All");
    setSortBy("newest");
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <div className="row g-3">

          {/* Search */}

          <div className="col-lg-3 col-md-6">

            <label className="form-label fw-semibold">
              🔎 Search Location
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Search location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Severity */}

          <div className="col-lg-2 col-md-6">

            <label className="form-label fw-semibold">
              ⚠️ Severity
            </label>

            <select
              className="form-select"
              value={severityFilter}
              onChange={(e) =>
                setSeverityFilter(e.target.value)
              }
            >

              <option value="All">
                All Severity
              </option>

              <option value="High">
                🔴 High
              </option>

              <option value="Medium">
                🟡 Medium
              </option>

              <option value="Low">
                🟢 Low
              </option>

            </select>

          </div>


          {/* Disaster Type */}

          <div className="col-lg-2 col-md-6">

            <label className="form-label fw-semibold">
              🌪️ Disaster Type
            </label>

            <select
              className="form-select"
              value={disasterTypeFilter}
              onChange={(e) =>
                setDisasterTypeFilter(e.target.value)
              }
            >

              <option value="All">
                All Types
              </option>

              {disasterTypes.map((type) => (

                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>

              ))}

            </select>

          </div>


          {/* Status */}

          <div className="col-lg-2 col-md-6">

            <label className="form-label fw-semibold">
              📌 Status
            </label>

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                🟡 Pending
              </option>

              <option value="Under Review">
                🔵 Under Review
              </option>

              <option value="Resolved">
                🟢 Resolved
              </option>

            </select>

          </div>


          {/* Sorting */}

          <div className="col-lg-2 col-md-6">

            <label className="form-label fw-semibold">
              ↕️ Sort By
            </label>

            <select
              className="form-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >

              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="high">
                High → Low Severity
              </option>

              <option value="low">
                Low → High Severity
              </option>

            </select>

          </div>

        </div>


        {/* Reset */}

        <div className="mt-3 text-end">

          <button
            className="btn btn-outline-secondary"
            onClick={handleReset}
          >
            🔄 Reset Filters
          </button>

        </div>

      </div>

    </div>
  );
}

export default FilterBar;