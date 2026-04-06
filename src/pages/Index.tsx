import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkTime = () => {
      if (!video.duration || video.paused) {
        rafRef.current = requestAnimationFrame(checkTime);
        return;
      }
      const { currentTime, duration } = video;
      if (currentTime < 0.5) {
        setVideoOpacity(currentTime / 0.5);
      } else if (currentTime > duration - 0.5) {
        setVideoOpacity((duration - currentTime) / 0.5);
      } else {
        setVideoOpacity(1);
      }
      rafRef.current = requestAnimationFrame(checkTime);
    };

    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    video.play().catch(() => {});
    rafRef.current = requestAnimationFrame(checkTime);

    return () => {
      video.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Hero wrapper */}
      <div className="relative min-h-screen">
        {/* Video Background with Very Light Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1))"
            }}
          />
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ opacity: videoOpacity, transition: "opacity 0.1s linear" }}
            src="/hero-video.mp4"
            muted
            playsInline
          />
        </div>

        {/* Navigation */}
        <nav className="relative z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
            <a href="/" className="text-3xl font-semibold tracking-tight"
               style={{ color: "#1F2937" }}>
              TransitSense<span className="text-blue-500">AI</span>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {[
                { label: "Home", active: true, href: "/" },
                { label: "Travel", active: false, href: "/travel" },
                { label: "Dashboard", active: false, href: "/dashboard" },
                { label: "Alerts", active: false, href: "/alerts" },
                { label: "API", active: false, href: "/api" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm transition-colors ${
                    item.active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link 
              to="/travel"
              className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Begin Journey
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
          style={{ paddingTop: "calc(8rem - 75px)" }}
        >
          <h1
            className="animate-fade-rise max-w-7xl text-5xl font-normal sm:text-6xl md:text-7xl"
            style={{ 
              lineHeight: 0.95, 
              letterSpacing: "-2px", 
              color: "#1F2937",
              textShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            Beyond the{" "}
            <em className="text-blue-500">chaos,</em> we forecast{" "}
            <em className="text-blue-500">the journey.</em>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed sm:text-lg font-medium"
             style={{ 
               color: "#4B5563",
               textShadow: "0 1px 3px rgba(0,0,0,0.1)"
             }}>
            Intelligent travel planning powered by real-time data and AI to make your journeys seamless.
          </p>

          <Link 
            to="/travel"
            className="animate-fade-rise-delay-2 mt-12 rounded-full bg-blue-500 px-14 py-5 text-base text-white transition-transform hover:bg-blue-600 hover:scale-[1.03]"
          >
            Begin Journey
          </Link>
        </section>
      </div>

      {/* Feature Cards Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4"
                style={{ color: "#111827" }}>
              Why Choose TransitSenseAI?
            </h2>
            <p className="text-base max-w-3xl mx-auto"
               style={{ color: "#4B5563" }}>
              Intelligent travel planning powered by real-time data and AI to make your journeys seamless.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Predict Demand */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center"
                  alt="Analytics dashboard with charts and graphs showing travel data"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-cyan-500/25" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Predict Demand</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered analytics forecast travel demand during peak seasons to help you plan ahead.
                </p>
              </div>
            </div>

            {/* Card 2: Avoid Congestion */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img 
                  src="/img_1.jpg"
                  alt="Very crowded railway station with many passengers during rush hour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/25 to-emerald-500/25" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Avoid Congestion</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time crowd monitoring helps you avoid overcrowded stations and peak travel hours.
                </p>
              </div>
            </div>

            {/* Card 3: Smart Route Suggestions */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop&crop=center"
                  alt="Digital map with route navigation and directions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/25 to-indigo-500/25" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Smart Route Suggestions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get optimized multi-modal route recommendations based on real-time and historical data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6"
              style={{ color: "#111827" }}>
            About TransitSenseAI
          </h2>
          <p className="leading-relaxed mb-4"
             style={{ color: "#4B5563" }}>
            TransitSenseAI is an AI-powered platform designed to transform travel during high-demand periods like festivals. By leveraging real-time data, predictive analytics, and intelligent routing, it helps users make smarter travel decisions while enabling authorities to efficiently manage crowd flow and reduce congestion.
          </p>
          <p className="text-blue-700 font-medium mt-4">
            Built by BITWISE AXIS
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
