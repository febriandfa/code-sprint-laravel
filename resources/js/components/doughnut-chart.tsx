import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend, Title);

export default function DoughnutChart({ datas, title, colors, labels }: { datas: number[]; title: string; colors?: string[]; labels: string[] }) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: datas,
                backgroundColor: colors ?? ['#3b82f6', '#d5d9e2'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 18,
                    weight: 'bold' as const,
                },
                position: 'bottom' as const,
                padding: {
                    bottom: 10,
                },
            },
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    return <Doughnut data={data} options={options} />;
}
