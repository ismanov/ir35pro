import React from "react"
import ReactApexChart from "react-apexcharts"

const ApexRevenue = () => {
  const options = {
    chart: {
      height: 300,
      type: "bar",
      toolbar: {
        show: !1,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "14%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      show: !0,
      width: 2,
      colors: ["transparent"],
    },
    series: [
      {
        name: "Revenue",
        data: [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32],
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "$(thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#556ee6"],
  }
  const series = [
    {
      name: "Revenue",
      data: [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32],
    },
  ]

  return (
    <ReactApexChart options={options} series={series} type="bar" height="320" className="apex-charts" />
  )
}

export default ApexRevenue
