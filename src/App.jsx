import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Grid from './components/Grid'
import CropSelector from './components/CropSelector'
import MutationInfo from './components/MutationInfo'
import CookieConsent from './components/CookieConsent'
import SettingsPanel from './components/SettingsPanel'
import Legend from './components/Legend'
import { optimizePlacement } from './utils/optimizer'
import { CROPS } from './data/crops'

// Cross pattern: center 4x4 with corners cut out
const createCrossPattern = () => {
  const unlocked = []
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      // Center 4x4 (rows 3-6, cols 3-6)
      if (row >= 3 && row <= 6 && col >= 3 && col <= 6) {
        // Cut out corners (3,3), (3,6), (6,3), (6,6)
        if (!((row === 3 || row === 6) && (col === 3 || col === 6))) {
          unlocked.push({ row, col })
        }
      }
    }
  }
  return unlocked
}

function App() {
  const [unlockedCells, setUnlockedCells] = useState(createCrossPattern())
  const [selectedCrop, setSelectedCrop] = useState('gloomgourd')
  const [optimization, setOptimization] = useState(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [cookieConsent, setCookieConsent] = useState(null)
  const [showSettings, setShowSettings] = useState(false)

  // Load saved state from cookies on mount
  useEffect(() => {
    const consent = Cookies.get('greenhouse_consent')
    
    if (consent === undefined) {
      // No preference set - show popup by setting to null
      setCookieConsent(null)
    } else if (consent === 'true') {
      setCookieConsent(true)
      const savedUnlocked = Cookies.get('greenhouse_unlocked')
      if (savedUnlocked) {
        try {
          setUnlockedCells(JSON.parse(savedUnlocked))
        } catch (e) {
          console.error('Failed to parse saved grid state:', e)
        }
      }
    } else {
      setCookieConsent(false)
    }
  }, [])

  // Save to cookies when unlocked cells change (if consent given)
  useEffect(() => {
    if (cookieConsent) {
      Cookies.set('greenhouse_unlocked', JSON.stringify(unlockedCells), { expires: 365 })
    }
  }, [unlockedCells, cookieConsent])

  const handleOptimize = async (mode = 'thorough') => {
    setIsOptimizing(true)
    // Use setTimeout to allow UI to update with loading state
    setTimeout(() => {
      const result = optimizePlacement(unlockedCells, selectedCrop, mode)
      setOptimization(result)
      setIsOptimizing(false)
    }, 50)
  }

  const handleCellToggle = (row, col) => {
    const isUnlocked = unlockedCells.some(cell => cell.row === row && cell.col === col)
    
    if (isUnlocked) {
      setUnlockedCells(prev => prev.filter(cell => !(cell.row === row && cell.col === col)))
    } else {
      setUnlockedCells(prev => [...prev, { row, col }])
    }
  }

  const handleConsentAccept = () => {
    setCookieConsent(true)
    Cookies.set('greenhouse_consent', 'true', { expires: 365 })
    Cookies.set('greenhouse_unlocked', JSON.stringify(unlockedCells), { expires: 365 })
  }

  const handleConsentDecline = () => {
    setCookieConsent(false)
    Cookies.set('greenhouse_consent', 'false', { expires: 365 })
  }

  const handleClearData = () => {
    Cookies.remove('greenhouse_consent')
    Cookies.remove('greenhouse_unlocked')
    setCookieConsent(null)
    setUnlockedCells(createCrossPattern())
    setOptimization(null)
    setShowSettings(false)
  }

  const handleToggleCookies = (enabled) => {
    if (enabled) {
      setCookieConsent(true)
      Cookies.set('greenhouse_consent', 'true', { expires: 365 })
      Cookies.set('greenhouse_unlocked', JSON.stringify(unlockedCells), { expires: 365 })
    } else {
      setCookieConsent(false)
      Cookies.set('greenhouse_consent', 'false', { expires: 365 })
      Cookies.remove('greenhouse_unlocked')
    }
  }

  const handleReset = () => {
    setUnlockedCells(createCrossPattern())
    setOptimization(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sage-800 mb-2">
            🌱 Greenhouse Garden Optimizer
          </h1>
          <p className="text-sage-600 text-lg">
            Maximize crop mutations with intelligent placement
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-sage-800">Garden Grid</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="btn-secondary text-sm"
                  >
                    Reset Grid
                  </button>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="btn-secondary text-sm"
                  >
                    ⚙️ Settings
                  </button>
                </div>
              </div>
              
              <Grid
                unlockedCells={unlockedCells}
                optimization={optimization}
                onCellToggle={handleCellToggle}
              />
              
              <Legend />
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="space-y-6">
            <CropSelector
              selectedCrop={selectedCrop}
              onSelectCrop={setSelectedCrop}
              crops={CROPS}
            />
            
            <MutationInfo
              crop={CROPS[selectedCrop]}
              mutationCount={optimization?.mutationSpots.length || 0}
              onOptimize={handleOptimize}
              isOptimizing={isOptimizing}
              hasOptimization={optimization !== null}
              unlockedCount={unlockedCells.length}
            />
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            onClose={() => setShowSettings(false)}
            onClearData={handleClearData}
            onToggleCookies={handleToggleCookies}
            cookieConsent={cookieConsent}
          />
        )}

        {/* Cookie Consent Banner */}
        {cookieConsent === null && (
          <CookieConsent
            onAccept={handleConsentAccept}
            onDecline={handleConsentDecline}
          />
        )}
      </div>
    </div>
  )
}

export default App
