'use client';

import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
]);

interface EChartProps {
  option: Record<string, unknown>;
  height?: number | string;
  loading?: boolean;
}

const EChart = ({ option, height = 300, loading = false }: EChartProps) => {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      style={{ height, width: '100%' }}
      showLoading={loading}
      notMerge
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default EChart;
