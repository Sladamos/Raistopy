export interface SingleStopDetails {
    _id: string;
    name: string;
    subName: string | null;
    latitude: number;
    longitude: number;
    type: string;
    zoneName: string | null;
    virtual: boolean;
    ticketZoneBorder: boolean;
    onDemand: boolean;
}