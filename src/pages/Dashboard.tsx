import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DemandForecastCommand from "@/components/dashboard/DemandForecastCommand";
import CorridorRiskMatrix from "@/components/dashboard/CorridorRiskMatrix";
import CorridorDrillDown from "@/components/dashboard/CorridorDrillDown";
import CapacityRecommendationCards from "@/components/dashboard/CapacityRecommendationCards";
import StaggeredTravelSimulator from "@/components/dashboard/StaggeredTravelSimulator";
import TerminalDensityMonitor from "@/components/dashboard/TerminalDensityMonitor";
import SurgePricingOversight from "@/components/dashboard/SurgePricingOversight";
import HistoricalAnalyticsPanel from "@/components/dashboard/HistoricalAnalyticsPanel";
import Navigation from "@/components/layout/Navigation";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("demand-forecast");
  const [selectedCorridor, setSelectedCorridor] = useState<any>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleRowClick = (corridor: any) => {
    setSelectedCorridor(corridor);
  };

  const handleCloseDrillDown = () => {
    setSelectedCorridor(null);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "demand-forecast":
        return <DemandForecastCommand />;
      case "risk-matrix":
        return <CorridorRiskMatrix onRowClick={handleRowClick} />;
      case "capacity-recs":
        return <CapacityRecommendationCards />;
      case "terminal-density":
        return <TerminalDensityMonitor />;
      case "surge-oversight":
        return <SurgePricingOversight />;
      case "analytics":
        return <HistoricalAnalyticsPanel />;
      default:
        return <DemandForecastCommand />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar 
        activeSection={activeSection}
        onNavigate={handleNavigate}
        user={{ name: "Authority User", role: "Transport Planner" }}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Authority Planning Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Real-time transit analytics and capacity planning tools
            </p>
          </div>

          {/* Dynamic Content */}
          <div className="space-y-8">
            {renderActiveSection()}
          </div>

          {/* Staggered Travel Simulator - Always visible */}
          <div className="mt-8">
            <StaggeredTravelSimulator />
          </div>
        </div>
      </div>

      {/* Corridor Drill Down Modal */}
      {selectedCorridor && (
        <CorridorDrillDown 
          corridor={selectedCorridor}
          onClose={handleCloseDrillDown}
        />
      )}
    </div>
  );
};

export default Dashboard;
