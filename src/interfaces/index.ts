import { QueryOptionsType, OutputTypeList, OutputType, UpdateOptionsType, QueryFilterType } from "../types/index";

export interface DataService<Type> {
    // Get item query
    getItems(options?: QueryOptionsType<Type>): Promise<OutputTypeList<Type>>;
    getItem(options?: QueryOptionsType<Type>): Promise<OutputType<Type>>;

    // Add item query
    addItems(data: Array<Type>): Promise<OutputTypeList<Type>>;
    addItem(data: Type): Promise<OutputType<Type>>;

    // Update data query
    updateItem(id: string, data: Partial<Type>, options?: UpdateOptionsType): Promise<OutputType<Type>>;

    // Delete data query
    deleteItem(id: string): Promise<OutputType<Type>>;
}

export interface CountQuery<Type> { countItems(options?: QueryOptionsType<Type>): Promise<OutputType<number>>; }

export interface SumQuery<Type> { sumItems(options?: QueryOptionsType<Type>): Promise<OutputType<number>>; }

export interface AvgQuery<Type> { avgItems(options?: QueryOptionsType<Type>): Promise<OutputType<number>>; }

export interface MaxQuery<Type> { maxItems(options?: QueryOptionsType<Type>): Promise<OutputType<number>>; }

export interface MinQuery<Type> { minItems(options?: QueryOptionsType<Type>): Promise<OutputType<number>>; }

export interface AppConnector {
    registerDataService<Type>(typeName: string, service: DataService<Type>): void;
    getDataService<Type>(typeName: string): DataService<Type>;
}