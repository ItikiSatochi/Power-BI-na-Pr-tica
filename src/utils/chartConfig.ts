import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

let registered = false;

export function registerChartJS() {
  if (registered) return;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  ChartJS.defaults.font.family = "'Plus Jakarta Sans', system-ui, sans-serif";
  ChartJS.defaults.font.size = 12;
  registered = true;
}

export function getChartTheme(isDark: boolean) {
  return {
    textColor: isDark ? '#94A3B8' : '#475569',
    gridColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
    subtleGridColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)',
    tooltipBg: isDark ? '#0F1014' : '#FFFFFF',
    tooltipBorder: isDark ? '#2B2E36' : '#E2E8F0',
    tooltipTitle: isDark ? '#FFFFFF' : '#0F172A',
    tooltipBody: isDark ? '#F2C811' : '#D97706',
  };
}
