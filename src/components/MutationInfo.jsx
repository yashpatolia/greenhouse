function MutationInfo({ crop, mutationCount, onOptimize, isOptimizing, hasOptimization, unlockedCount }) {
  if (!crop) return null
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-sage-800 mb-4">Mutation Info</h2>
      
      <div className="space-y-4">
        {/* Requirements */}
        <div>
          <h3 className="font-semibold text-sage-700 mb-2">Requirements:</h3>
          <div className="flex gap-2 items-center bg-sage-50 p-3 rounded-lg">
            {crop.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-2xl">{req.icon}</span>
                <span className="text-sm font-medium text-sage-700">
                  {req.crop.charAt(0).toUpperCase() + req.crop.slice(1)}
                </span>
                {index < crop.requirements.length - 1 && (
                  <span className="text-sage-500 mx-1">+</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Description */}
        <div>
          <h3 className="font-semibold text-sage-700 mb-2">How it works:</h3>
          <p className="text-sm text-sage-600 bg-sage-50 p-3 rounded-lg">
            {crop.mutationDescription}
          </p>
        </div>
        
        {/* Adjacency */}
        <div>
          <p className="text-sm text-sage-600">
            <span className="font-semibold">Adjacency:</span> {crop.adjacency}
          </p>
        </div>
        
        {/* Optimize Buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => onOptimize('quick')}
            disabled={isOptimizing}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isOptimizing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Optimizing...</span>
              </>
            ) : (
              <>
                <span className="text-xl">⚡</span>
                <span>Quick Optimize</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => onOptimize('thorough')}
            disabled={isOptimizing}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isOptimizing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Optimizing...</span>
              </>
            ) : (
              <>
                <span className="text-xl">🚀</span>
                <span>Best Optimize</span>
              </>
            )}
          </button>
          
          <p className="text-xs text-sage-500 text-center mt-2">
            ⚡ Quick: Best for smaller layouts (~1s) • 🚀 Best: Most optimal for any size (~5-7s)
          </p>
        </div>
        
        {/* Mutation Count */}
        {hasOptimization && (
          <div className="mt-4 pt-4 border-t border-sage-200">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-700 font-medium mb-1">
                Possible Mutations:
              </p>
              <p className="text-3xl font-bold text-purple-900">
                {mutationCount}
                <span className="text-lg ml-2">✨</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MutationInfo
