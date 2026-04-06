import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Corridor {
  origin: string;
  destination: string;
  riskScore: number;
  transportMode: "train" | "bus" | "flight";
}

interface CorridorRiskMapProps {
  corridors: Corridor[];
}

const CorridorRiskMap = ({ corridors }: CorridorRiskMapProps) => {
  const [selectedFestival, setSelectedFestival] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");

  const getRiskColor = (score: number) => {
    if (score >= 80) return "#ef4444"; // red
    if (score >= 60) return "#f59e0b"; // amber
    return "#10b981"; // green
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return "CRITICAL";
    if (score >= 60) return "MODERATE";
    return "NORMAL";
  };

  // Simplified India map coordinates for major cities
  const cityCoordinates: Record<string, { x: number; y: number }> = {
    "Mumbai": { x: 150, y: 200 },
    "Delhi": { x: 200, y: 100 },
    "Bangalore": { x: 160, y: 280 },
    "Kolkata": { x: 280, y: 150 },
    "Chennai": { x: 180, y: 320 },
    "Hyderabad": { x: 170, y: 250 },
    "Pune": { x: 145, y: 210 },
    "Ahmedabad": { x: 120, y: 150 },
    "Jaipur": { x: 180, y: 120 },
    "Lucknow": { x: 230, y: 130 },
    "Kanpur": { x: 240, y: 140 },
    "Nagpur": { x: 210, y: 190 },
    "Indore": { x: 160, y: 160 },
    "Thane": { x: 155, y: 195 },
    "Bhopal": { x: 170, y: 150 },
    "Visakhapatnam": { x: 250, y: 220 },
    "Pimpri-Chinchwad": { x: 148, y: 208 },
    "Patna": { x: 260, y: 140 },
    "Vadodara": { x: 125, y: 165 },
    "Ghaziabad": { x: 205, y: 95 },
    "Ludhiana": { x: 190, y: 80 },
    "Agra": { x: 195, y: 110 },
    "Nashik": { x: 140, y: 180 },
  };

  const festivals = ["all", "Diwali", "Kumbh Mela", "Durga Puja", "Eid", "Pongal"];
  const states = ["all", "Maharashtra", "Uttar Pradesh", "West Bengal", "Tamil Nadu", "Karnataka"];
  const modes = ["all", "train", "bus", "flight"];

  const filteredCorridors = corridors.filter(corridor => {
    if (selectedFestival !== "all") return true; // Would filter by festival in real implementation
    if (selectedState !== "all") return true; // Would filter by state in real implementation
    if (selectedMode !== "all" && corridor.transportMode !== selectedMode) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1">
          {festivals.map((festival) => (
            <Button
              key={festival}
              variant={selectedFestival === festival ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFestival(festival)}
              className="capitalize"
            >
              {festival === "all" ? "All Festivals" : festival}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          {modes.map((mode) => (
            <Button
              key={mode}
              variant={selectedMode === mode ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMode(mode)}
              className="capitalize"
            >
              {mode === "all" ? "All Modes" : mode}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle>India Corridor Risk Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-slate-50 rounded-lg" style={{ height: "400px" }}>
            {/* Simplified SVG India Map */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              className="absolute inset-0"
            >
              {/* India outline (simplified) */}
              <path
                d="M 100 80 L 320 80 L 340 120 L 340 280 L 280 340 L 120 340 L 80 280 L 80 120 Z"
                fill="#e2e8f0"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

              {/* Route arcs */}
              {filteredCorridors.map((corridor, index) => {
                const origin = cityCoordinates[corridor.origin];
                const destination = cityCoordinates[corridor.destination];
                if (!origin || !destination) return null;

                const midX = (origin.x + destination.x) / 2;
                const midY = (origin.y + destination.y) / 2 - 20; // Curve upward

                return (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <g>
                          <path
                            d={`M ${origin.x} ${origin.y} Q ${midX} ${midY} ${destination.x} ${destination.y}`}
                            stroke={getRiskColor(corridor.riskScore)}
                            strokeWidth="3"
                            fill="none"
                            className="cursor-pointer hover:stroke-opacity-80 transition-opacity"
                          />
                          {/* Animated dots on routes */}
                          <circle r="3" fill={getRiskColor(corridor.riskScore)}>
                            <animateMotion
                              dur="3s"
                              repeatCount="indefinite"
                              path={`M ${origin.x} ${origin.y} Q ${midX} ${midY} ${destination.x} ${destination.y}`}
                            />
                          </circle>
                        </g>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm space-y-1">
                          <div className="font-semibold">
                            {corridor.origin} → {corridor.destination}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              style={{ backgroundColor: getRiskColor(corridor.riskScore) }}
                              className="text-white"
                            >
                              {getRiskLevel(corridor.riskScore)}
                            </Badge>
                            <span className="text-muted-foreground">
                              Risk: {corridor.riskScore}/100
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            Mode: {corridor.transportMode}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}

              {/* City markers */}
              {Object.entries(cityCoordinates).map(([city, coords]) => (
                <g key={city}>
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="5"
                    fill="#1e293b"
                    className="cursor-pointer hover:r-6 transition-all"
                  />
                  <text
                    x={coords.x}
                    y={coords.y - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#475569"
                    className="pointer-events-none"
                  >
                    {city}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border">
            <div className="text-sm font-semibold mb-2">Risk Levels</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-red-500 rounded"></div>
                <span className="text-xs">Critical (80+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-amber-500 rounded"></div>
                <span className="text-xs">Moderate (60-79)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500 rounded"></div>
                <span className="text-xs">Normal (&lt;60)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Corridor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCorridors.map((corridor, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: getRiskColor(corridor.riskScore) }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">
                  {corridor.origin} → {corridor.destination}
                </div>
                <Badge
                  style={{ backgroundColor: getRiskColor(corridor.riskScore) }}
                  className="text-white"
                >
                  {corridor.riskScore}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="capitalize">{corridor.transportMode}</span>
                <span>{getRiskLevel(corridor.riskScore)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CorridorRiskMap;
