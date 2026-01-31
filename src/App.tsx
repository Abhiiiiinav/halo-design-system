import DarkBanner from './components/DarkBanner'
import LightBanner from './components/LightBanner'
import DitherCard from './components/DitherCard'
import DuotoneSamples from './components/DuotoneSamples'
import DuotoneImageUploader from './components/DuotoneImageUploader'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <DarkBanner />
      <LightBanner />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        marginTop: '48px',
        flexWrap: 'wrap',
        padding: '24px'
      }}>
        <DitherCard mode="dark" title="Dark Mode" subtitle="Deep space black" />
        <DitherCard mode="light" title="Light Mode" subtitle="Clean white forest" />
        <DitherCard mode="agentic" title="Agentic Commerce" subtitle="Automated value exchange" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '48px' }}>
        <DuotoneSamples />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '96px' }}>
        <DuotoneImageUploader />
      </div>
    </div>
  )
}

export default App
