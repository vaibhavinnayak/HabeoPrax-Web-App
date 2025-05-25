import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const HabitReport = () => {
  const { userId } = useParams(); 
  const [habitData, setHabitData] = useState(null);
   const [userName, setUserName] = useState('');

   useEffect(() => {
     const name = localStorage.getItem('userName');
     if (name) setUserName(name);
   }, []);
   
  useEffect(() => {
    axios.get(`http://localhost:5000/reports/${userId}`)
      .then(res => {
        setHabitData(res.data);
      })
      .catch(err => console.error("Error fetching report:", err));
  }, [userId]);

  if (!habitData || !habitData.weekCategoryCounts) {
    return <div className="text-center text-white text-xl mt-12">Loading charts...</div>;
  }

  const pieData = {
    labels: Object.keys(habitData.weekCategoryCounts),
    datasets: [{
      label: 'Habits Completed This Week',
      data: Object.values(habitData.weekCategoryCounts),
      backgroundColor: ['#F48FB1', '#9575CD', '#CE93D8', '#81D4FA', '#B39DDB']
    }]
  };

  const barData = {
    labels: habitData.dailyCompletion.labels,
    datasets: [{
      label: 'Completions per Day (Week)',
      data: habitData.dailyCompletion.counts,
      backgroundColor: '#90CAF9'
    }]
  };

  const lineData = {
    labels: habitData.monthlyTrend.labels,
    datasets: [{
      label: 'Monthly Habit Completions',
      data: habitData.monthlyTrend.counts,
      fill: false,
      borderColor: '#BA68C8'
    }]
  };

return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-8 font-sans">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img src="../public/logo.png" alt="logo" className="w-10 h-10 rounded-full object-contain" />
          <h1 className="text-3xl font-bold text-white tracking-wide">HabeoPrax</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-purple-500 text-white rounded-full px-4 py-1">
            <span className="text-lg">👤</span>
            <span className="ml-2 font-medium">{userName}</span>
          </div>
          <button className="text-2xl text-purple-300" onClick={() => window.location.href = "/home"}>🏠</button>
        </div>
      </header>

      <h2 className="text-4xl text-white font-bold text-center mb-12">Habit Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-center mb-4 text-purple-700">Habits by Category (This Week)</h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-4">Completions per Day</h3>
          <div className="flex-1">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-center mb-4 text-purple-700">Monthly Trend</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  </>
);
}
export default HabitReport
