import React from "react";

const TableForm = ({ handleInputChange, handleSubmit, tableData }) => {
  return (
    <div className="container pt-4 pb-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="form-group">
              <label htmlFor="rows">Grid size</label>
              <input
                type="number"
                id="grid-size"
                name="gridSize"
                value={tableData["gridSize"]}
                className="form-control"
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="columns">No of steps</label>
              <input
                type="number"
                id="steps-count"
                name="stepsCount"
                className="form-control"
                value={tableData["stepsCount"]}
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Create Table
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TableForm;
