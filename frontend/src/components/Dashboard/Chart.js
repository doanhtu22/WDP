import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ChartCustom = () => {
  const [data, setData] = useState({
    revenue: [],
    guests: [],
    tours: [],
    labels: [],
  });
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const toursResponse = await fetch("http://localhost:8000/api/v1/tours", {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const toursData = await toursResponse.json();
        const bookingsResponse = await fetch("http://localhost:8000/api/v1/booking", {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const bookingsData = await bookingsResponse.json();

        if (!toursData.data || !bookingsData.data) {
          throw new Error("Invalid data format");
        }

        const tourPrices = toursData.data.reduce((acc, tour) => {
          acc[tour.title] = tour.price;
          return acc;
        }, {});

        const monthlyData = {};

        bookingsData.data.forEach((booking) => {
          const date = new Date(booking.bookAt || booking.createdAt);
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear();
          const key = `${month}-${year}`;

          if (!monthlyData[key]) {
            monthlyData[key] = {
              revenue: 0,
              guests: 0,
              tours: 0,
            };
          }

          const tourName = booking.tourName;
          const guestSize = booking.guestSize;

          monthlyData[key].revenue += (tourPrices[tourName] || 0) * guestSize;
          monthlyData[key].guests += guestSize;
          monthlyData[key].tours += 1;
        });

        const labels = Object.keys(monthlyData).sort((a, b) => {
          const [monthA, yearA] = a.split("-");
          const [monthB, yearB] = b.split("-");
          const dateA = new Date(`${monthA} 1, ${yearA}`);
          const dateB = new Date(`${monthB} 1, ${yearB}`);
          return dateA - dateB;
        });

        setData({
          revenue: labels.map((label) => monthlyData[label].revenue),
          guests: labels.map((label) => monthlyData[label].guests),
          tours: labels.map((label) => monthlyData[label].tours),
          labels,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Tổng doanh thu",
        data: data.revenue,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Tổng số lượng người đi",
        data: data.guests,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Tổng số tour đã được book",
        data: data.tours,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Travel Dashboard</h5>
          </div>
          <div className="card-body">
            <Bar
              ref={chartRef}
              data={chartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              key={JSON.stringify(chartData)}
            />
          </div>
          <div className="card-footer">
            <hr />
            <div className="stats">
              <i className="fa fa-history"></i> Updated 1 month ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCustom;
