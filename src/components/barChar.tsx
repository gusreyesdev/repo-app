import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ReportCommits {
  month: number;
  feat: number;
  fix: number;
}

interface DataChar {
  reportCommits: ReportCommits[];
}

export const BarChar = (dataChar: DataChar) => {
  const { reportCommits } = dataChar;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = reportCommits.map((item) => item.month);

  const data = {
    labels,
    datasets: [
      {
        label: "Feat",
        data: reportCommits.map((item) => item.feat),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Fix",
        data: reportCommits.map((item) => item.fix),
        backgroundColor: "rgba(38, 26, 145, 0.8)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};
