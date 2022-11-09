export default class DataElements {
    static get dataElements(): string[];
    static isDataElement(element: any): boolean;
    static find(elements: any): any;
}
