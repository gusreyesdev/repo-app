import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataChar {
  time: [
    {
      time: string;
      value: number;
    }
  ];
};

export const LineChar = (dataTime: DataChar) => {
  const { time } = dataTime;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = time.map((item) => item.time);

  const data = {
    labels,
    datasets: [
      {
        label: "Cpu Report",
        data: time.map((item) => item.value),
        borderColor: "rgb(201, 172, 32)",
        backgroundColor: "rgba(201, 172, 32, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};
