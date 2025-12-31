function CropSelector({ selectedCrop, onSelectCrop, crops }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-sage-800 mb-4">Select Crop</h2>
      
      <div className="space-y-3">
        {Object.values(crops).map((crop) => (
          <button
            key={crop.id}
            onClick={() => onSelectCrop(crop.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedCrop === crop.id
                ? 'border-earth-600 bg-earth-50 shadow-md'
                : 'border-sage-200 bg-white hover:border-sage-300 hover:bg-sage-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{crop.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-sage-800">{crop.name}</h3>
                <p className="text-sm text-sage-600">{crop.description}</p>
              </div>
              {selectedCrop === crop.id && (
                <span className="text-earth-600 font-bold">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CropSelector
