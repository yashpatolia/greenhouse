function Legend() {
  const items = [
    { icon: '🔒', label: 'Locked Plot', description: 'Click to unlock' },
    { icon: '⬜', label: 'Empty Plot', description: 'Unlocked, no crop' },
    { icon: '🍈', label: 'Melon', description: 'Optimal placement' },
    { icon: '🎃', label: 'Pumpkin', description: 'Optimal placement' },
    { icon: '✨', label: 'Mutation Spot', description: 'Ready for Gloomgourd' },
  ]
  
  return (
    <div className="mt-6 pt-6 border-t border-sage-200">
      <h3 className="font-semibold text-sage-700 mb-3">Legend</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-2 bg-sage-50 rounded-lg"
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <p className="text-xs font-medium text-sage-700">{item.label}</p>
            <p className="text-xs text-sage-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Legend
