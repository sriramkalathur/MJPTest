import React, { ReactNode } from "react";
declare class PropsModel {
    options: Array<any>;
    selectedItems: Array<number>;
    onSelectionChanged: (items: Array<number>) => void;
    noItemsText: string;
    label?: string;
    valueField: string;
    renderItem?: (item: any) => ReactNode;
    displayField: string;
    renderFilter?: boolean;
}
declare class StateModel {
    isExpanded: boolean;
}
export declare class MultiSelectList extends React.Component<PropsModel, StateModel> {
    selectedItems: Array<number>;
    SELECT_ALL_VALUE: number;
    SELECT_ALL_TEXT: string;
    private filterText;
    constructor(props: any);
    getSelectedItems(items: number[]): any[];
    toggleOptionsList(e: any): void;
    private notifySelectionChanged;
    setAllSelected(selected: boolean): void;
    handleClickOutside(ev: any): void;
    componentWillUnmount(): void;
    componentDidMount(): void;
    getSelectedOptionsText(): string;
    handleItemChecked(selectedValue: number, checked: boolean): void;
    isItemChecked(value: number): boolean;
    renderSelectAllOption(): JSX.Element;
    filteredItems(): any[];
    renderOptions(): JSX.Element;
    renderFilter(): JSX.Element;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=MultiSelectList.d.ts.map