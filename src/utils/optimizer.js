/**
 * Optimization algorithm for Gloomgourd mutation placement
 * 
 * Goal: Maximize the number of valid mutation spots
 * Strategy: Simulated Annealing - iteratively improve by making small random changes
 *           and accepting worse solutions probabilistically to escape local optima
 */

const MELON = 'melon'
const PUMPKIN = 'pumpkin'
const EMPTY = null

// Simulated Annealing parameters
const INITIAL_TEMP = 5.0
const FINAL_TEMP = 0.01
const COOLING_RATE = 0.995
const ITERATIONS_PER_TEMP = 500
const RESTARTS = 5 // Multiple restarts for better results

// Get all adjacent cells (orthogonal + diagonal)
const getAdjacentCells = (row, col) => {
  return [
    { row: row - 1, col: col - 1 }, // top-left
    { row: row - 1, col: col },     // top
    { row: row - 1, col: col + 1 }, // top-right
    { row: row, col: col - 1 },     // left
    { row: row, col: col + 1 },     // right
    { row: row + 1, col: col - 1 }, // bottom-left
    { row: row + 1, col: col },     // bottom
    { row: row + 1, col: col + 1 }  // bottom-right
  ]
}

// Check if a cell is within grid bounds
const isValidCell = (row, col) => {
  return row >= 0 && row < 10 && col >= 0 && col < 10
}

// Check if a cell is unlocked
const isUnlocked = (row, col, unlockedCells) => {
  return unlockedCells.some(cell => cell.row === row && cell.col === col)
}

/**
 * Create initial grid with checkerboard pattern
 */
const seedInitialGrid = (unlockedCells) => {
  const grid = {}
  
  // Initialize all cells as empty
  unlockedCells.forEach(cell => {
    grid[`${cell.row},${cell.col}`] = EMPTY
  })
  
  // Seed with alternating pattern for better starting point
  unlockedCells.forEach(cell => {
    const { row, col } = cell
    // Create a checkerboard-like pattern
    if ((row % 4 < 2) !== (col % 4 < 2)) {
      grid[`${row},${col}`] = MELON
    } else if ((row % 4 >= 2) !== (col % 4 >= 2)) {
      grid[`${row},${col}`] = PUMPKIN
    }
  })
  
  return grid
}

/**
 * Count mutation spots for a given grid configuration
 */
const scoreGrid = (grid, unlockedCells) => {
  let count = 0
  
  for (const cell of unlockedCells) {
    const key = `${cell.row},${cell.col}`
    
    // Skip if cell is occupied
    if (grid[key] !== EMPTY) continue
    
    // Check if it has adjacent melon AND pumpkin
    const adjacent = getAdjacentCells(cell.row, cell.col)
    let hasMelon = false
    let hasPumpkin = false
    
    for (const adj of adjacent) {
      const adjKey = `${adj.row},${adj.col}`
      if (grid[adjKey] === MELON) hasMelon = true
      if (grid[adjKey] === PUMPKIN) hasPumpkin = true
      if (hasMelon && hasPumpkin) break
    }
    
    if (hasMelon && hasPumpkin) count++
  }
  
  return count
}

/**
 * Make a small random change to the grid (tweak a 2x2 area)
 */
const tweakGrid = (grid, unlockedCells) => {
  const newGrid = { ...grid }
  const cropTypes = [EMPTY, MELON, PUMPKIN]
  
  // Pick a random starting point
  const startCell = unlockedCells[Math.floor(Math.random() * unlockedCells.length)]
  
  // Find all cells in a 2x2 area around it that are unlocked
  const tweakCells = []
  for (let dr = 0; dr < 2; dr++) {
    for (let dc = 0; dc < 2; dc++) {
      const row = startCell.row + dr
      const col = startCell.col + dc
      if (isValidCell(row, col) && isUnlocked(row, col, unlockedCells)) {
        tweakCells.push({ row, col })
      }
    }
  }
  
  // Randomly assign new crop types to these cells
  tweakCells.forEach(cell => {
    const key = `${cell.row},${cell.col}`
    newGrid[key] = cropTypes[Math.floor(Math.random() * cropTypes.length)]
  })
  
  return newGrid
}

/**
 * Deep copy a grid
 */
const copyGrid = (grid) => {
  return { ...grid }
}

/**
 * Convert grid to result format
 */
const gridToResult = (grid, unlockedCells) => {
  const melons = []
  const pumpkins = []
  const mutationSpots = []
  
  // Extract crops
  unlockedCells.forEach(cell => {
    const key = `${cell.row},${cell.col}`
    if (grid[key] === MELON) {
      melons.push(cell)
    } else if (grid[key] === PUMPKIN) {
      pumpkins.push(cell)
    }
  })
  
  // Find mutation spots
  unlockedCells.forEach(cell => {
    const key = `${cell.row},${cell.col}`
    if (grid[key] !== EMPTY) return
    
    const adjacent = getAdjacentCells(cell.row, cell.col)
    let hasMelon = false
    let hasPumpkin = false
    
    for (const adj of adjacent) {
      const adjKey = `${adj.row},${adj.col}`
      if (grid[adjKey] === MELON) hasMelon = true
      if (grid[adjKey] === PUMPKIN) hasPumpkin = true
      if (hasMelon && hasPumpkin) break
    }
    
    if (hasMelon && hasPumpkin) {
      mutationSpots.push(cell)
    }
  })
  
  return { melons, pumpkins, mutationSpots }
}

/**
 * Simulated Annealing optimization
 */
const simulatedAnnealing = (unlockedCells) => {
  let currentGrid = seedInitialGrid(unlockedCells)
  let bestGrid = copyGrid(currentGrid)
  let currentScore = scoreGrid(currentGrid, unlockedCells)
  let bestScore = currentScore
  
  let temp = INITIAL_TEMP
  
  while (temp > FINAL_TEMP) {
    for (let i = 0; i < ITERATIONS_PER_TEMP; i++) {
      const candidateGrid = tweakGrid(currentGrid, unlockedCells)
      const candidateScore = scoreGrid(candidateGrid, unlockedCells)
      
      const delta = candidateScore - currentScore
      
      // Accept if better, or probabilistically if worse (to escape local optima)
      if (delta > 0 || Math.random() < Math.exp(delta / temp)) {
        currentGrid = candidateGrid
        currentScore = candidateScore
        
        // Update best if this is the best so far
        if (currentScore > bestScore) {
          bestGrid = copyGrid(currentGrid)
          bestScore = currentScore
        }
      }
    }
    
    temp *= COOLING_RATE
  }
  
  return { grid: bestGrid, score: bestScore }
}

/**
 * Main optimization function with multiple restarts
 */
export const optimizePlacement = (unlockedCells, selectedCrop) => {
  if (selectedCrop !== 'gloomgourd') {
    return { melons: [], pumpkins: [], mutationSpots: [] }
  }
  
  if (unlockedCells.length < 3) {
    return { melons: [], pumpkins: [], mutationSpots: [] }
  }
  
  let bestGrid = null
  let bestScore = -1
  
  // Run multiple times with different random seeds
  for (let restart = 0; restart < RESTARTS; restart++) {
    const result = simulatedAnnealing(unlockedCells)
    
    if (result.score > bestScore) {
      bestScore = result.score
      bestGrid = result.grid
    }
  }
  
  return gridToResult(bestGrid, unlockedCells)
}
