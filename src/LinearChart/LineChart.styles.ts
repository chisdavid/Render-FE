import { style } from "@mui/system"

export const title = (title: string) => {
    return {
        text: title,
        align: 'left'
    }
}

export const chartOptions = (xAxis: string[]) :any=> {
    return {
        chart: {
            height: 250,
            type: 'line',
            zoom: {
                enabled: false
            }

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.9
            },
        },
        xaxis: {
            categories: xAxis,
        },
    }
}