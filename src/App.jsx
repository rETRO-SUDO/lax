import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { LogosStrip, Services, Process, Benefits, Testimonials, Pricing, FAQ, Contact, Footer } from './components/Sections';
import { LangProvider } from './i18n/LangContext';
import './index.css';

export default function App() {
  return (
    <LangProvider>
      <Navbar />
      <Hero />
      <LogosStrip />
      <Services />
      <Process />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </LangProvider>
  );
}
