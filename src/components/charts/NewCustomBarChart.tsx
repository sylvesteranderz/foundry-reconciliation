import CustomBarChart from "./new-bar";
import CustomContainerComponent from "../custom.container.component";
import LogoComponent from "../logo.component";
import { ChartConfig } from "@/components/ui/chart";

export interface NewCustomBarChartProps {
  title: string;
  isLoading: boolean;
  data: Array<any>;
  config: ChartConfig;
  dataKey: string;
  tickFormatter?: (value: any) => string;
  headerStyles?: string;
  containerStyles?: string;
  chartHeight?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  radius?: number;
  useOpacity?: boolean;
  useGradientOpacity?: boolean;
}

const NewCustomBarChart: React.FC<NewCustomBarChartProps> = ({
  title,
  isLoading,
  data,
  config,
  dataKey,
  tickFormatter = (value) => value,
  headerStyles = "font-semibold text-[14px]",
  containerStyles = "dark:bg-tertiary-black",
  chartHeight = "lg:h-[300px] h-[200px]",
  showXAxis = true,
  showYAxis = false,
  radius = 0,
  useOpacity = true,
  useGradientOpacity = true,
}) => {
  // Apply gradient opacity from left to right (lightest to darkest) if enabled
  const processedData = useGradientOpacity
    ? data.map((item, index) => ({
        ...item,
        opacity: 0.6 + (index / (data.length - 1)) * 0.5, // 0.6 to 1.0 gradient
      }))
    : data;

  const axisConfig = {
    x_axis: {
      dataKey,
      tickLine: false,
      tickMargin: 10,
      axisLine: false,
      tickFormatter,
    },
  };

  return (
    <CustomContainerComponent
      title={title}
      headerStyles={headerStyles}
      styles={containerStyles}
    >
      {isLoading ? (
        <LogoComponent />
      ) : (
        <div className={`mt-5 ${chartHeight}`}>
          <CustomBarChart
            config={config}
            radius={radius}
            showXAxis={showXAxis}
            showYAxis={showYAxis}
            useOpacity={useOpacity}
            axisConfig={axisConfig}
            dataset={processedData}
          />
        </div>
      )}
    </CustomContainerComponent>
  );
};

export default NewCustomBarChart;
