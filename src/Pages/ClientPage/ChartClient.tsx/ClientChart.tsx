import { Dashboard } from "../../../Components/NavBarComponent/DashBoard/DashBoard"
import React, { useEffect, useState } from "react"
import { LinearChart } from "../../../LinearChart/LinearChart"
import { BoxStyle } from "../../../Components/Client/Client.styles"
import { currentRole, CURRENT_DEVICES, CURRENT_ID, CURRENT_ROLE } from "../../MainPage/Home.types"
import { IDeviceChecked } from "../../../Components/Client/Client.types"
import { ISensor, ISensorData } from "../../../Models/models"
import { NotFound } from "../../PageNotFound/NotFound"
import axios from "axios"
import { RoleRoutes, SensorRoutes } from "../../../Routes/routes"

import { getHeaders } from "../../../Utils/methods"
import { useHistory } from "react-router"
import { Pages } from "../../../Enums/Pages"

export const ClientChart = (): JSX.Element => {
    const [sensors, setSesnors] = useState<ISensor[]>([]);
    const history = useHistory()

    const sensorsToSeries = (sensors: ISensor[]) => {
        return sensors.map((sensor: ISensor) => { return { name: sensor.name, data: sensor.dataList.map((data: ISensorData) => data.value) } })
    };

    const sensorsToXAxis = (sensors: ISensor[]) => {
        return sensors.map((sensor: ISensor) => sensor.dataList.map((data: ISensorData) => data.date.toString().split("T")[1].split(".")[0])).flat(1)
    }

    useEffect(() => {
        axios.post(SensorRoutes.GET_BY_CLIENT_ID, CURRENT_ID, getHeaders()).then((response) => {
            setSesnors(response.data as ISensor[])
        })
            .catch((error: any) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        alert("Session Expired")
                        CURRENT_ID != null && axios.post(RoleRoutes.LOG_OUT, CURRENT_ID, getHeaders());
                        history.push(Pages.SignIn)
                        localStorage.clear()
                    }
                }
            })
    }, [])

    return (<div>
        {currentRole !== null && CURRENT_ROLE !== "Admin" ?
            <div>
                <Dashboard currentUser={undefined} /> <div style={BoxStyle}>
                    <LinearChart series={sensorsToSeries(sensors)} xAxis={sensorsToXAxis(sensors)} />
                </div>
            </div> : <NotFound />
        }
    </div>
    )
}
