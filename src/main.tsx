import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PageLoader } from './components/PageLoader'
import './index.css'

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'))
const BrandingPage = lazy(() => import('./pages/BrandingPage'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/branding" element={<BrandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
