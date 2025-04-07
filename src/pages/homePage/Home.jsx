import React from 'react';
import ImageSection from '../../components/ImageSection/ImageSection';
import Statistics from '../../components/Statistics/Statistics';
import AboutUs from '../../components/AboutUs/AboutUs';
import PopularDestinations from '../../components/PopularDestination/PopularDestinations';
import FAQSection from '../../components/FAQSection/FAQSection';
import './Home.css';

const Home = () => {
  return (
    <main className="home-page">
      <ImageSection />
      <Statistics />
      <AboutUs />
      <PopularDestinations />
      <FAQSection />
    </main>
  );
};

export default Home;