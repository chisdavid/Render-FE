// {"id":"1","jsonrpc":"2.0","method":"getSensorDataBySensorId","params":{"id":1.0}}

export interface RPCObject {
    id: number,
    jsonrpc: number,
    method: string,
    params: any
};

export interface RPCResponse {
    jsonrpc: number,
    id: number,
    result: any
};

export interface AverageDTO {
    name: string,
    val: number
};

export enum MenuItem {
    HistoricalEnergyConsumption = "Historical Energy Consumption",
    Baseline = "Client Baseline",
    Program = "Program"
};

export interface TimePicker {
    display: boolean,
    hour: number;
}