import JourneyPlannerForm from "@/components/travel/JourneyPlannerForm";
import DemandForecastCard from "@/components/travel/DemandForecastCard";
import CorridorRiskMap from "@/components/travel/CorridorRiskMap";
import AlternativeOptionsPanel from "@/components/travel/AlternativeOptionsPanel";
import FareWatchWidget from "@/components/travel/FareWatchWidget";
import TripAlertSignup from "@/components/travel/TripAlertSignup";
import FestivalTravelGuide from "@/components/travel/FestivalTravelGuide";
import Navigation from "@/components/layout/Navigation";

const Travel = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Citizen Travel Portal</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your journey with AI-powered crowd forecasting and real-time surge alerts
          </p>
        </div>

        {/* Journey Planner Form */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Plan Your Journey</h2>
          <JourneyPlannerForm onSearch={(query) => console.log('Search query:', query)} />
        </section>

        {/* Demand Forecast Card */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Demand Forecast</h2>
          <DemandForecastCard
            route="Mumbai → Kolkata"
            riskLevel="HIGH"
            demandScore={87}
            forecastSeries={Array.from({ length: 14 }, (_, i) => ({
              date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
              demand: Math.floor(Math.random() * 40) + 60
            }))}
          />
        </section>

        {/* Corridor Risk Map */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">National Corridor Risk Map</h2>
          <CorridorRiskMap
            corridors={[
              { origin: "Mumbai", destination: "Kolkata", riskScore: 87, transportMode: "train" },
              { origin: "Delhi", destination: "Varanasi", riskScore: 92, transportMode: "bus" },
              { origin: "Bangalore", destination: "Hyderabad", riskScore: 45, transportMode: "flight" },
            ]}
          />
        </section>

        {/* Alternative Options Panel */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Alternative Travel Options</h2>
          <AlternativeOptionsPanel
            originalQuery={{ origin: "Mumbai", destination: "Kolkata", date: "2024-11-15" }}
            alternatives={[
              { date: "2024-11-14", route: "Mumbai → Kolkata → Patna", crowdLevel: "LOW", fareRange: "₹2,500-3,500" },
              { date: "2024-11-16", route: "Mumbai → Nagpur → Kolkata", crowdLevel: "MODERATE", fareRange: "₹3,000-4,000" },
              { date: "2024-11-13", route: "Mumbai → Surat → Kolkata", crowdLevel: "LOW", fareRange: "₹2,200-3,200" },
            ]}
          />
        </section>

        {/* Fare Watch Widget */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Fare Monitoring</h2>
          <FareWatchWidget
            route="Mumbai → Kolkata"
            currentFare={8500}
            baseFare={2500}
            fairPriceCeiling={5000}
          />
        </section>

        {/* Trip Alert Signup */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Stay Updated</h2>
          <TripAlertSignup
            prefillRoute={{ origin: "Mumbai", destination: "Kolkata" }}
            onSubscribe={(data) => console.log('Subscription data:', data)}
          />
        </section>

        {/* Festival Travel Guide */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Festival Travel Guides</h2>
          <FestivalTravelGuide
            festivals={[
              {
                name: "Diwali",
                dates: "Oct 31 - Nov 5",
                affectedCorridors: ["Mumbai-Delhi", "Kolkata-Chennai", "Bangalore-Hyderabad"],
                historicalCrowdLevel: 92,
                travelTips: "Book 3 weeks in advance, consider alternate routes"
              },
              {
                name: "Kumbh Mela",
                dates: "Jan 14 - Feb 26",
                affectedCorridors: ["Delhi-Prayagraj", "Mumbai-Prayagraj", "Kolkata-Prayagraj"],
                historicalCrowdLevel: 98,
                travelTips: "Expect massive crowds, special trains arranged"
              },
              {
                name: "Durga Puja",
                dates: "Oct 9-13",
                affectedCorridors: ["Kolkata-Mumbai", "Kolkata-Delhi", "Kolkata-Bangalore"],
                historicalCrowdLevel: 88,
                travelTips: "High demand to/from Kolkata, book early morning departures"
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
};

export default Travel;
