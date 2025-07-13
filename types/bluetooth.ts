import { ColorValue, ImageSourcePropType } from "react-native";

export type PeripheralServices = {
    peripheralId: string;
    serviceId: string;
    transfer: string;
    receive: string;
};
  
export interface StrippedPeripheral {
    name?: string;
    localName?: string;
    rssi: number;
    id: string
}

export interface Pokemon {
    id: string;
    name: string;
    image?: ImageSourcePropType;
    backgroundColor: readonly [ColorValue, ColorValue, ...ColorValue[]];
    unlocked: boolean;
    path:string
  }