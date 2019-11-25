import React, { Component } from "react";
import TableForm from "./tableForm";
import TableGrid from "./tableGrid";
class Table extends Component {
  state = {
    tableData: { gridSize: "", stepsCount: "" },
    showTable: false,
    activeCell: 1,
    movesCount: 0,
    moves: []
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleMove);
  }

  handleInputChange = e => {
    const input = e.currentTarget;
    const tableData = this.state.tableData;
    tableData[input.name] = input.value;
    this.setState({ tableData });
  };

  handleMove = e => {
    const gridSize = parseInt(this.state.tableData.gridSize),
      moves = [...this.state.moves],
      code = e.keyCode,
      totalCellCount = gridSize * gridSize;
    let activeCell = parseInt(this.state.activeCell),
      movesCount = parseInt(this.state.movesCount);
    if (movesCount === parseInt(this.state.tableData.stepsCount)) {
      alert("Moves completed");
      return;
    }
    if ([37, 38, 39, 40].includes(code) && this.state.showTable) {
      movesCount = movesCount + 1;
      const currentRow = Math.ceil(activeCell / gridSize);
      switch (code) {
        case 37:
          activeCell = activeCell > 1 ? activeCell - 1 : totalCellCount;
          break;
        case 38:
          activeCell =
            currentRow <= gridSize && activeCell > gridSize
              ? activeCell - gridSize
              : totalCellCount - gridSize + activeCell;
          break;
        case 39:
          activeCell =
            activeCell >= 1 && activeCell < totalCellCount ? activeCell + 1 : 1;
          break;
        case 40:
          activeCell =
            currentRow < gridSize
              ? activeCell + gridSize
              : activeCell - gridSize * (gridSize - 1);
          break;
        default:
          break;
      }
      const updatedRow = Math.ceil(activeCell / gridSize),
        updatedColumn =
          activeCell % gridSize === 0 ? gridSize : activeCell % gridSize;
      moves.push([updatedRow, updatedColumn]);
      this.setState({ activeCell, moves, movesCount });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { tableData } = this.state;
    if (tableData.gridSize >= 2) {
      this.setState({ showTable: !this.state.showTable });
    } else {
      alert("Provide minimum grid count 2");
    }
  };

  render() {
    const { handleInputChange, handleSubmit, handleMove } = this;
    const { showTable, activeCell } = this.state;
    return (
      <>
        {!showTable && (
          <TableForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            tableData={this.state.tableData}
          />
        )}
        {showTable && (
          <>
            <div className="text-center mt-4 mb-4">
              <p className="text-primary">Moves</p>
              <h4>{JSON.stringify(this.state.moves)}</h4>
            </div>
            <TableGrid
              gridSize={this.state.tableData.gridSize}
              activeCell={activeCell}
              handleMove={handleMove}
            ></TableGrid>
          </>
        )}
      </>
    );
  }
}

export default Table;
