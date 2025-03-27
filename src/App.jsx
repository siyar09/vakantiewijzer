import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PopularDestinations from './components/PopularDestination/PopularDestinations';
import FAQSection from './components/FAQSection/FAQSection';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Bestemmingen from './pages/bestemmingenPage/Bestemmingen';
import CityDetail from './pages/detailPage/CityDetail';
import Keuzehulp from './pages/keuzehulpPage/Keuzehulp';
import Statistics from './components/Statistics/Statistics';
import AboutUs from './components/AboutUs/AboutUs';
import ImageSection from './components/ImageSection/ImageSection';
import ReisCheck from './pages/reisCheckPage/ReisCheck';
import MijnFavorieten from './pages/favoritesPage/MijnFavorieten';
import Login from './pages/loginPage/Login';
import SignUp from './pages/signUpPage/SignUp';
import Account from './pages/accountPage/Account';
import AlgemeneInfo from './pages/algemeneInfoPage/AlgemenInfo';
import Privacy from './pages/privacyPage/Privacy';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './pages/notFoundPage/NotFound';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <ImageSection />
              <Statistics />
              <AboutUs />
              <PopularDestinations />
              <FAQSection />
            </>
          } />
          <Route path="/bestemmingen" element={<ProtectedRoute element={Bestemmingen} />} />
          <Route path="/city/:cityName" element={<ProtectedRoute element={CityDetail} />} />
          <Route path="/keuzehulp" element={<ProtectedRoute element={Keuzehulp} />} />
          <Route path="/reis-check" element={<ProtectedRoute element={ReisCheck} />} />
          <Route path="/mijn-favorieten" element={<ProtectedRoute element={MijnFavorieten} />} />
          <Route path="/mijn-account" element={<Login />} />
          <Route path="/registreren" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute element={Account} />} />
          <Route path="/algemene-informatie" element={<AlgemeneInfo />} />
          <Route path="/privacybeleid" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;