import ReactApexChart from "react-apexcharts";
import React from "react";
import { chartOptions } from "./LineChart.styles";

export const LinearChart = ({ series, xAxis }: any) => {

    return (
        <div id="chart">
            <ReactApexChart
                options={chartOptions(xAxis)}
                series={series}
                type="area"
                height={window.innerHeight - 200} />
        </div>
    );
}