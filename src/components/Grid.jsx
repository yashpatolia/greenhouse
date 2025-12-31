import Cell from './Cell'

function Grid({ unlockedCells, optimization, onCellToggle }) {
  const { mutationSpots = [] } = optimization || {}
  
  // Create grid state - works with any crop types
  const getCellState = (row, col) => {
    const isUnlocked = unlockedCells.some(cell => cell.row === row && cell.col === col)
    
    if (!isUnlocked) {
      return { type: 'locked', unlocked: false }
    }
    
    // Check if this cell has any crop (optimization object has crop arrays)
    if (optimization) {
      for (const [key, value] of Object.entries(optimization)) {
        if (key !== 'mutationSpots' && Array.isArray(value)) {
          if (value.some(c => c.row === row && c.col === col)) {
            return { type: key, unlocked: true }
          }
        }
      }
    }
    
    // Check if this is a mutation spot
    if (mutationSpots.some(s => s.row === row && s.col === col)) {
      return { type: 'mutation', unlocked: true }
    }
    
    return { type: 'empty', unlocked: true }
  }
  
  return (
    <div className="inline-block">
      <div className="grid grid-cols-10 gap-1 bg-sage-200 p-2 rounded-lg">
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => {
            const cellState = getCellState(row, col)
            return (
              <Cell
                key={`${row}-${col}`}
                row={row}
                col={col}
                state={cellState}
                onToggle={onCellToggle}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default Grid
