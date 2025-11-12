import { Icon } from "@iconify/react/dist/iconify.js";

interface Stat {
  label: string;
  value: string | number;
  icon?: string;
  color?: "dark" | "light" | "teal" | "primary";
  bottomText?: string;
  bottomTextColor?: string;
}

interface ModernDashboardProps {
  stats: Stat[];
  isLoading: boolean;
}

const ModernDashboard: React.FC<ModernDashboardProps> = ({
  stats,
  isLoading,
}) => {
  const getGridCols = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      case 5:
        return "grid-cols-1 md:grid-cols-3 lg:grid-cols-5";
      case 6:
        return "grid-cols-1 md:grid-cols-3 lg:grid-cols-6";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  const getCardStyles = (color?: string) => {
    switch (color) {
      case "dark":
        return "bg-primary-dark text-white";
      case "light":
        return "bg-primary-gray text-gray-800";
      case "teal":
        return "bg-primary-green text-white";
      case "primary":
        return "bg-primary-gray/50 text-primary-black";
      default:
        return "bg-white text-gray-800 border border-gray-200";
    }
  };

  const getLoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current opacity-30"></div>
    </div>
  );

  return (
    <div className={`grid ${getGridCols(stats.length)} gap-4`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            ${getCardStyles(stat.color)}
            p-6 shadow-sm hover:shadow-md transition-shadow duration-200
            flex flex-col justify-between min-h-[180px]
          `}
        >
          <div className="flex flex-col h-full justify-between">
            {/* Header with label */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-base uppercase font-medium opacity-90">{stat.label}</h3>
              {stat.icon && (
                <div className="flex-shrink-0">
                  <Icon icon={stat.icon} className="text-lg opacity-80" />
                </div>
              )}
            </div>

            {/* Value */}
            <div className="flex-1 flex items-center">
              {isLoading ? (
                getLoadingSpinner()
              ) : (
                <p className="text-2xl lg:text-3xl font-bold mt-auto">{stat.value}</p>
              )}
            </div>

            {/* Bottom text */}
            {stat.bottomText && !isLoading && (
              <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                <p
                  className={`text-xs opacity-75 ${stat.bottomTextColor || ""}`}
                >
                  {stat.bottomText}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernDashboard;
