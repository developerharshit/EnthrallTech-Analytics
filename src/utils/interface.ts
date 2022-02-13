export interface Filters {
    startDate: string,
    endDate: string,
    department: string,
    region: string,
    device: string
    chartType: string,
}

export interface ControlPanelData {
    department: string[],
    region: string[],
    device: string[],
    maxDate: string,
    minDate: string
}

export const chartTypes: string[] =  [
    'Active Users Trend',
    'Region Wise Active User',
    'Mobile vs Web',
    'Department Wise Active User'
]
