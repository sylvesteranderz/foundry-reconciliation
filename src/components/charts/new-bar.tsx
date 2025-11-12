import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type TBaseProps = {
  config: ChartConfig;
  dataset: Array<any>;
  showXAxis?: boolean;
  showYAxis?: boolean;
  useOpacity?: boolean;
  axisConfig?: {
    x_axis: {
      dataKey: string;
      tickLine: boolean;
      tickMargin: number;
      axisLine: boolean;
      tickFormatter: (value: any) => string;
    };
  };
  radius?: number;
};

const CustomBarChart = ({
  config,
  dataset,
  axisConfig,
  showXAxis = false,
  radius = 40,
  showYAxis,
  useOpacity = false,
}: TBaseProps) => {
  return (
    <ChartContainer config={config} className="h-full">
      <BarChart accessibilityLayer data={dataset}>
        {showXAxis && <XAxis {...axisConfig.x_axis} />}
        {showYAxis && <YAxis className="px-0 mx-0" />}
        <ChartTooltip content={<ChartTooltipContent />} />
        {Object.entries(config).map((item) => {
          return (
            <Bar dataKey={item[0]} radius={radius} key={item[0]}>
              {useOpacity
                ? dataset.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={item[1].color}
                      fillOpacity={entry.opacity || 1}
                    />
                  ))
                : dataset.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={item[1].color} />
                  ))}
            </Bar>
          );
        })}
      </BarChart>
    </ChartContainer>
  );
};

export default CustomBarChart;
