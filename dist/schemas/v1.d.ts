export default Schema;
declare namespace Schema {
    const systemFormTableColumns: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemValuesTableColumns: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemRepeatableTableColumns: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemFormViewColumns: any;
    const systemRepeatableViewColumns: any;
    const systemFormTableIndexes: {
        columns: string[];
        method: string;
    }[];
    const systemRepeatableTableIndexes: {
        columns: string[];
        method: string;
    }[];
    const systemValuesTableIndexes: {
        columns: string[];
        method: string;
    }[];
    const includeMediaCaptions: boolean;
}
