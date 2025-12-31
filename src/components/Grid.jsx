import Cell from './Cell'

function Grid({ unlockedCells, optimization, onCellToggle }) {
  const { melons = [], pumpkins = [], mutationSpots = [] } = optimization || {}
  
  // Create grid state
  const getCellState = (row, col) => {
    const isUnlocked = unlockedCells.some(cell => cell.row === row && cell.col === col)
    
    if (!isUnlocked) {
      return { type: 'locked', unlocked: false }
    }
    
    // Check if this cell has a crop
    if (melons.some(m => m.row === row && m.col === col)) {
      return { type: 'melon', unlocked: true }
    }
    
    if (pumpkins.some(p => p.row === row && p.col === col)) {
      return { type: 'pumpkin', unlocked: true }
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
