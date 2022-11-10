export default class Audio extends TableDefinition {
    get name(): string;
    defineTable(): void;
    defineView(): void;
    defineIndexes(): void;
}
import TableDefinition from "../../table-definition";
