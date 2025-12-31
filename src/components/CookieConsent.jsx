function CookieConsent({ onAccept, onDecline }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-sage-300 shadow-2xl p-6 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-sage-800 mb-2">
              🍪 Cookie Preferences
            </h3>
            <p className="text-sm text-sage-600">
              We use cookies to save your unlocked plot configuration and preferences. 
              Your data stays on your device and is never shared. You can clear it anytime in settings.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="btn-secondary whitespace-nowrap"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="btn-primary whitespace-nowrap"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
