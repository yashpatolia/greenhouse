/**
 * Optimization algorithm for crop mutation placement
 * Generic implementation that works with any mutation type
 * 
 * Goal: Maximize the number of valid mutation spots
 * Strategy: Simulated Annealing - iteratively improve by making small random changes
 *           and accepting worse solutions probabilistically to escape local optima
 */

const EMPTY = null

// Quick optimization parameters - fast results for small layouts
const QUICK_PARAMS = {
  INITIAL_TEMP: 3.0,
  FINAL_TEMP: 0.05,
  COOLING_RATE: 0.96,
  ITERATIONS_PER_TEMP: 150,
  RESTARTS: 5
}

// Thorough optimization parameters - best results for large layouts
const THOROUGH_PARAMS = {
  INITIAL_TEMP: 4.0,
  FINAL_TEMP: 0.02,
  COOLING_RATE: 0.98,
  ITERATIONS_PER_TEMP: 250,
  RESTARTS: 10
}

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

/**
 * Create initial grid with checkerboard pattern
 * Works with any crop types based on requirements
 */
const seedInitialGrid = (unlockedCells, unlockedSet, cropTypes) => {
  const grid = {}
  
  // Initialize all cells as empty
  unlockedCells.forEach(cell => {
    grid[`${cell.row},${cell.col}`] = EMPTY
  })
  
  // Seed with alternating pattern for better starting point
  // Distribute crop types across the grid
  unlockedCells.forEach(cell => {
    const { row, col } = cell
    // Create a pattern that distributes different crop types
    const patternIndex = (row % 4 < 2) !== (col % 4 < 2) ? 0 : 
                        (row % 4 >= 2) !== (col % 4 >= 2) ? 1 : -1
    
    if (patternIndex >= 0 && patternIndex < cropTypes.length) {
      grid[`${row},${col}`] = cropTypes[patternIndex]
    }
  })
  
  return grid
}

/**
 * Count mutation spots for a given grid configuration
 * Generic: checks if all required crops are adjacent
 */
const scoreGrid = (grid, unlockedCells, requirements) => {
  let count = 0
  
  for (const cell of unlockedCells) {
    const key = `${cell.row},${cell.col}`
    
    // Skip if cell is occupied
    if (grid[key] !== EMPTY) continue
    
    // Count adjacent crops
    const adjacent = getAdjacentCells(cell.row, cell.col)
    const adjacentCrops = {}
    
    for (const adj of adjacent) {
      const adjKey = `${adj.row},${adj.col}`
      const cropType = grid[adjKey]
      if (cropType && cropType !== EMPTY) {
        adjacentCrops[cropType] = (adjacentCrops[cropType] || 0) + 1
      }
    }
    
    // Check if all requirements are met
    let allRequirementsMet = true
    for (const req of requirements) {
      if ((adjacentCrops[req.crop] || 0) < req.count) {
        allRequirementsMet = false
        break
      }
    }
    
    if (allRequirementsMet) {
      count++
    }
  }
  
  return count
}

/**
 * Make a small random change to the grid (tweak a 2x2 area)
 * Works with any crop types
 */
const tweakGrid = (grid, unlockedCells, unlockedSet, cropTypes) => {
  const newGrid = { ...grid }
  const allOptions = [EMPTY, ...cropTypes]
  
  // Pick a random starting point
  const startCell = unlockedCells[Math.floor(Math.random() * unlockedCells.length)]
  
  // Find all cells in a 2x2 area around it that are unlocked
  const tweakCells = []
  for (let dr = 0; dr < 2; dr++) {
    for (let dc = 0; dc < 2; dc++) {
      const row = startCell.row + dr
      const col = startCell.col + dc
      if (isValidCell(row, col) && unlockedSet.has(`${row},${col}`)) {
        tweakCells.push({ row, col })
      }
    }
  }
  
  // Randomly assign new crop types to these cells
  tweakCells.forEach(cell => {
    const key = `${cell.row},${cell.col}`
    newGrid[key] = allOptions[Math.floor(Math.random() * allOptions.length)]
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
 * Generic: works with any crop types
 */
const gridToResult = (grid, unlockedCells, requirements) => {
  const cropPlacements = {}
  const mutationSpots = []
  
  // Initialize crop placement arrays
  requirements.forEach(req => {
    cropPlacements[req.crop] = []
  })
  
  // Extract crops
  unlockedCells.forEach(cell => {
    const key = `${cell.row},${cell.col}`
    const cropType = grid[key]
    if (cropType && cropType !== EMPTY && cropPlacements[cropType]) {
      cropPlacements[cropType].push(cell)
    }
  })
  
  // Find mutation spots
  unlockedCells.forEach(cell => {
    const key = `${cell.row},${cell.col}`
    if (grid[key] !== EMPTY) return
    
    const adjacent = getAdjacentCells(cell.row, cell.col)
    const adjacentCrops = {}
    
    for (const adj of adjacent) {
      const adjKey = `${adj.row},${adj.col}`
      const cropType = grid[adjKey]
      if (cropType && cropType !== EMPTY) {
        adjacentCrops[cropType] = (adjacentCrops[cropType] || 0) + 1
      }
    }
    
    // Check if all requirements are met
    let allRequirementsMet = true
    for (const req of requirements) {
      if ((adjacentCrops[req.crop] || 0) < req.count) {
        allRequirementsMet = false
        break
      }
    }
    
    if (allRequirementsMet) {
      mutationSpots.push(cell)
    }
  })
  
  return { ...cropPlacements, mutationSpots }
}

/**
 * Simulated Annealing optimization
 */
const simulatedAnnealing = (unlockedCells, unlockedSet, params, cropTypes, requirements) => {
  let currentGrid = seedInitialGrid(unlockedCells, unlockedSet, cropTypes)
  let bestGrid = copyGrid(currentGrid)
  let currentScore = scoreGrid(currentGrid, unlockedCells, requirements)
  let bestScore = currentScore
  
  let temp = params.INITIAL_TEMP
  
  while (temp > params.FINAL_TEMP) {
    for (let i = 0; i < params.ITERATIONS_PER_TEMP; i++) {
      const candidateGrid = tweakGrid(currentGrid, unlockedCells, unlockedSet, cropTypes)
      const candidateScore = scoreGrid(candidateGrid, unlockedCells, requirements)
      
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
    
    temp *= params.COOLING_RATE
  }
  
  return { grid: bestGrid, score: bestScore }
}

/**
 * Main optimization function with multiple restarts
 * @param {Array} unlockedCells - Array of unlocked cell positions
 * @param {Object} cropData - The mutation crop data from CROPS
 * @param {string} mode - 'quick' or 'thorough' optimization mode
 */
export const optimizePlacement = (unlockedCells, cropData, mode = 'thorough') => {
  if (!cropData || !cropData.requirements) {
    return { mutationSpots: [] }
  }
  
  if (unlockedCells.length < 3) {
    return { mutationSpots: [] }
  }
  
  // Extract crop types from requirements
  const cropTypes = cropData.requirements.map(req => req.crop)
  const requirements = cropData.requirements
  
  // Select parameters based on mode
  const params = mode === 'quick' ? QUICK_PARAMS : THOROUGH_PARAMS
  
  // Create Set for O(1) lookups
  const unlockedSet = new Set(unlockedCells.map(cell => `${cell.row},${cell.col}`))
  
  // Theoretical maximum: each unlocked cell could be a mutation spot if crops placed optimally
  // In practice, maximum is around 70-75% of unlocked cells
  const theoreticalMax = Math.floor(unlockedCells.length * 0.75)
  
  let bestGrid = null
  let bestScore = -1
  let consecutiveSameScore = 0
  
  // Run multiple times with different random seeds
  for (let restart = 0; restart < params.RESTARTS; restart++) {
    const result = simulatedAnnealing(unlockedCells, unlockedSet, params, cropTypes, requirements)
    
    if (result.score > bestScore) {
      bestScore = result.score
      bestGrid = result.grid
      consecutiveSameScore = 0
    } else if (result.score === bestScore) {
      consecutiveSameScore++
    }
    
    // Early stopping: if we've found theoretical max or same score 3 times in a row
    if (bestScore >= theoreticalMax || consecutiveSameScore >= 3) {
      break
    }
  }
  
  return gridToResult(bestGrid, unlockedCells, requirements)
}
