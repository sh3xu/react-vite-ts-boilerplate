import Footer from "@/components/LandingLayout/Footer";
import Header from "@/components/LandingLayout/Header";

const Landing = () => {
  return (
    <div className="landing-page">
      <Header />
      <main className="content">
        <h1>Welcome to SampleSite!</h1>
        <p>Your modern, responsive landing page built with React.</p>
      </main>
      <Footer />
      <style>{`
        .landing-page {
          font-family: 'Segoe UI', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }
      `}</style>
    </div>
  );
};

export default Landing;
