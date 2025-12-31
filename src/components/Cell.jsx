function Cell({ row, col, state, onToggle }) {
  const handleClick = () => {
    onToggle(row, col)
  }
  
  const getCellClasses = () => {
    const baseClasses = 'w-12 h-12 flex items-center justify-center rounded cursor-pointer transition-all duration-200 text-2xl border-2'
    
    switch (state.type) {
      case 'locked':
        return `${baseClasses} bg-sage-700 border-sage-800 hover:bg-sage-600`
      
      case 'melon':
        return `${baseClasses} bg-emerald-100 border-emerald-500 hover:border-emerald-600 shadow-md`
      
      case 'pumpkin':
        return `${baseClasses} bg-amber-100 border-amber-500 hover:border-amber-600 shadow-md`
      
      case 'mutation':
        return `${baseClasses} bg-purple-100 border-purple-400 hover:border-purple-500 shadow-lg animate-pulse`
      
      case 'empty':
      default:
        return `${baseClasses} bg-white border-sage-300 hover:bg-sage-50 hover:border-sage-400`
    }
  }
  
  const getCellContent = () => {
    switch (state.type) {
      case 'locked':
        return '🔒'
      
      case 'melon':
        return '🍈'
      
      case 'pumpkin':
        return '🎃'
      
      case 'mutation':
        return '✨'
      
      default:
        return ''
    }
  }
  
  return (
    <div
      className={getCellClasses()}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Cell ${row},${col} - ${state.type}${state.unlocked ? ' unlocked' : ' locked'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      {getCellContent()}
    </div>
  )
}

export default Cell
