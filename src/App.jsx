import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Toast from './components/Toast.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import DestinationDetails from './pages/DestinationDetails.jsx'
import EscapeFinder from './pages/EscapeFinder.jsx'
import Experiences from './pages/Experiences.jsx'
import Planner from './pages/Planner.jsx'
import Favorites from './pages/Favorites.jsx'
import Dashboard from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/escape-finder" element={<EscapeFinder />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
