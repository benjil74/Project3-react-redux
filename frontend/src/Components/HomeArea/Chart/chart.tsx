import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import {CategoryScale} from "chart.js";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";
import "./chart.css";

interface HolidayData {
  holidayID: number;
  userCount: number;
  place: string;
}

Chart.register(CategoryScale);

function UsersPerHolidayChart() {
  const role = localStorage.getItem("role"); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderWidth: number;
    }[];
  }>({ labels: [], datasets: [] });

  useEffect(() => {
    if (role==="admin") {
      setIsAdmin(true);
  };
    axios
      .get<HolidayData[]>('http://localhost:4000/followers/count')
      .then((response) => {
        const data = response.data;
        console.log(data);
        
        const places = data.map((item) => item.place);
        const userCounts = data.map((item) => item.userCount);

        setChartData({
          labels: places,
          datasets: [
            {
              label: 'Vacations Report',
              data: userCounts,
              backgroundColor: 'red',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const generateCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      'Place,User Count\n' +
      chartData.labels.map((label, index) => `${label},${chartData.datasets[0].data[index]}`).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    saveAs(blob, 'vacations_report.csv');
  };

  return (
      <div>
      {isAdmin && (
        <div>
        <button onClick={generateCSV}>Download CSV Report</button>
        <div className="chart-container">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Holiday',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'User Count',
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
          </div>
          </div>
      )} 
      {!isAdmin && (
          <div>
              <p>You are not admin.</p>
          </div>
      )}
    </div>
  );
}

export default UsersPerHolidayChart;
