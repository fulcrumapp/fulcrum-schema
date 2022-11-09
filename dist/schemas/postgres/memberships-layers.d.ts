export default class MembershipsLayers extends TableDefinition {
    get name(): string;
    defineTable(): void;
    defineView(): void;
    defineIndexes(): void;
}
import TableDefinition from "../../table-definition";
