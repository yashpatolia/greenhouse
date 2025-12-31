function SettingsPanel({ onClose, onClearData, cookieConsent }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-sage-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-sage-500 hover:text-sage-700 text-2xl leading-none"
            aria-label="Close settings"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Cookie Status */}
          <div>
            <h3 className="font-semibold text-sage-700 mb-2">Cookie Status</h3>
            <div className="bg-sage-50 p-4 rounded-lg">
              <p className="text-sm text-sage-600">
                {cookieConsent === true && (
                  <span className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Cookies are enabled. Your grid state is being saved.
                  </span>
                )}
                {cookieConsent === false && (
                  <span className="flex items-center gap-2">
                    <span className="text-amber-600">⚠</span>
                    Cookies are disabled. Your grid state will reset when you close the browser.
                  </span>
                )}
                {cookieConsent === null && (
                  <span className="flex items-center gap-2">
                    <span className="text-sage-600">ℹ</span>
                    Cookie preference not set yet.
                  </span>
                )}
              </p>
            </div>
          </div>
          
          {/* Clear Data */}
          <div>
            <h3 className="font-semibold text-sage-700 mb-2">Data Management</h3>
            <button
              onClick={onClearData}
              className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Clear All Data & Reset Preferences
            </button>
            <p className="text-xs text-sage-500 mt-2">
              This will remove all saved data and reset your grid to the default cross pattern.
            </p>
          </div>
          
          {/* About */}
          <div>
            <h3 className="font-semibold text-sage-700 mb-2">About</h3>
            <div className="text-sm text-sage-600 space-y-2">
              <p>
                <strong>Greenhouse Garden Optimizer</strong> helps you maximize crop mutations 
                by suggesting optimal placement patterns.
              </p>
              <p className="text-xs text-sage-500">
                Version 1.0.0 • Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="btn-primary w-full mt-6"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default SettingsPanel
