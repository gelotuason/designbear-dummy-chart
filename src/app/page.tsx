"use client"

import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const MovingLineChart = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
      pointRadius: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Values',
        data: [],
        fill: false,
        borderColor: 'rgb(0, 157, 255)',
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  })

  const options: ChartOptions<'line'> = {
    responsive: true,
    animation: {
      duration: 0 // disable animation for smooth updates
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 159,
        max: 174,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          // drawBorder: false,
        },
        ticks: {
          stepSize: 5
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          // drawBorder: false,
        }
      }
    },
    maintainAspectRatio: false
  }

  useEffect(() => {
    const updateChart = () => {
      const now = new Date()
      const newLabel = now.toLocaleTimeString()
      const newValue = Math.floor(Math.random() * (174 - 159) + 159)

      setChartData(prevData => {
        const newLabels = [...prevData.labels.slice(-10), newLabel]
        const newData = [...prevData.datasets[0].data.slice(-10), newValue]

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData
            }
          ]
        }
      })
    }

    const interval = setInterval(updateChart, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-md">
        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default MovingLineChart

