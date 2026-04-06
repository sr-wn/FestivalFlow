import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Play, TrendingDown, Users, DollarSign, Calendar } from "lucide-react";
import { toast } from "sonner";

interface StaggeredTravelSimulatorProps {}

const StaggeredTravelSimulator = ({}: StaggeredTravelSimulatorProps) => {
  const [subsidyPercentage, setSubsidyPercentage] = useState([15]);
  const [affectedCorridors, setAffectedCorridors] = useState([5]);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Generate baseline demand distribution
  const generateBaselineData = () => {
    return [
      { day: "Day 1", demand: 95 },
      { day: "Day 2", demand: 88 },
      { day: "Day 3", demand: 92 },
      { day: "Day 4", demand: 85 },
      { day: "Day 5", demand: 78 },
      { day: "Day 6", demand: 72 },
      { day: "Day 7", demand: 68 },
    ];
  };

  // Generate simulated demand after staggered travel incentives
  const generateSimulatedData = () => {
    const reduction = subsidyPercentage[0] * 0.8; // 0.8% reduction per 1% subsidy
    return [
      { day: "Day 1", demand: Math.max(30, 95 - reduction + Math.random() * 10) },
      { day: "Day 2", demand: Math.max(30, 88 - reduction + Math.random() * 8) },
      { day: "Day 3", demand: Math.max(30, 92 - reduction + Math.random() * 12) },
      { day: "Day 4", demand: Math.max(30, 85 - reduction + Math.random() * 15) },
      { day: "Day 5", demand: Math.max(30, 78 + reduction * 0.5 + Math.random() * 10) },
      { day: "Day 6", demand: Math.max(30, 72 + reduction * 0.8 + Math.random() * 8) },
      { day: "Day 7", demand: Math.max(30, 68 + reduction * 1.2 + Math.random() * 12) },
    ];
  };

  const baselineData = generateBaselineData();
  const simulatedData = simulationResults || generateSimulatedData();

  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = generateSimulatedData();
    setSimulationResults(results);
    
    const peakReduction = ((baselineData[0].demand - results[0].demand) / baselineData[0].demand * 100).toFixed(1);
    
    toast.success(`Simulation complete! Peak day load reduced by ${peakReduction}%`);
    setIsSimulating(false);
  };

  const generateRecommendation = () => {
    const peakReduction = ((baselineData[0].demand - simulatedData[0].demand) / baselineData[0].demand * 100).toFixed(1);
    
    toast.success("Recommendation added to capacity cards!");
    
    // In real implementation, this would add to the capacity recommendations
    console.log("Generated recommendation:", {
      type: "staggered-travel",
      subsidy: subsidyPercentage[0],
      corridors: affectedCorridors[0],
      peakReduction: peakReduction,
      estimatedCost: (subsidyPercentage[0] * affectedCorridors[0] * 100000).toLocaleString()
    });
  };

  const peakReduction = simulationResults 
    ? ((baselineData[0].demand - simulatedData[0].demand) / baselineData[0].demand * 100).toFixed(1)
    : "0.0";

  const combinedData = baselineData.map((item, index) => ({
    ...item,
    baseline: item.demand,
    simulated: simulatedData[index]?.demand || item.demand
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-green-500" />
          Staggered Travel Incentive Simulator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Model impact of off-peak travel incentives on demand distribution
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subsidy Slider */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Subsidy Percentage</label>
                <Badge variant="outline">{subsidyPercentage[0]}%</Badge>
              </div>
              <Slider
                value={subsidyPercentage}
                onValueChange={setSubsidyPercentage}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Estimated cost: ₹{(subsidyPercentage[0] * affectedCorridors[0] * 100000).toLocaleString()}
            </div>
          </div>

          {/* Corridors Slider */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Affected Corridors</label>
                <Badge variant="outline">{affectedCorridors[0]} corridors</Badge>
              </div>
              <Slider
                value={affectedCorridors}
                onValueChange={setAffectedCorridors}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <Users className="h-4 w-4 inline mr-1" />
              Estimated reach: {(affectedCorridors[0] * 50000).toLocaleString()} passengers
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {/* Peak Reduction Output */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-900">Projected Peak-Day Load Reduction</div>
                <div className="text-3xl font-bold text-blue-600 mt-1">{peakReduction}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-700">Peak reduction</div>
                <div className="text-xs text-blue-600 mt-1">
                  From {baselineData[0].demand}% to {simulatedData[0]?.demand?.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Chart */}
          <div>
            <h4 className="text-sm font-medium mb-4">Before vs After Demand Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `${value.toFixed(1)}%`,
                      name === 'baseline' ? 'Current Demand' : 'With Incentives'
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="baseline"
                  />
                  <Line
                    type="monotone"
                    dataKey="simulated"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="simulated"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-green-600">{peakReduction}%</div>
              <div className="text-xs text-muted-foreground">Peak Reduction</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {((simulatedData[6]?.demand - baselineData[6]?.demand) / baselineData[6]?.demand * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Off-Peak Increase</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-amber-600">
                {subsidyPercentage[0] * affectedCorridors[0]}%
              </div>
              <div className="text-xs text-muted-foreground">Utilization Gain</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                ₹{(subsidyPercentage[0] * affectedCorridors[0] * 50000).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Cost per 1% Reduction</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button 
            onClick={runSimulation} 
            disabled={isSimulating}
            className="flex-1"
          >
            {isSimulating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Simulating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Simulation
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={generateRecommendation}
            disabled={!simulationResults}
          >
            Generate Recommendation
          </Button>
        </div>

        {/* Insights */}
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <div className="font-semibold mb-1">Key Insights</div>
              <ul className="space-y-1 text-amber-700">
                <li>• {subsidyPercentage[0]}% subsidy across {affectedCorridors[0]} corridors can reduce peak load by {peakReduction}%</li>
                <li>• Off-peak travel increases by {((simulatedData[6]?.demand - baselineData[6]?.demand) / baselineData[6]?.demand * 100).toFixed(1)}% on average</li>
                <li>• Cost-effective for corridors with {baselineData[0].demand}%+ peak utilization</li>
                <li>• Best implemented 2-3 weeks before festival peak dates</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaggeredTravelSimulator;
