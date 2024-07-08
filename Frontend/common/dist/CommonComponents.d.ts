import * as React from "react";
import { Status } from "./CommonModels";
import { IPaginatorProps } from "./Components/CommonComponentModels";
export declare const ProcessingMessage: (props: {
    statusMessage: string;
}) => JSX.Element;
export declare const ValidationMessage: (props: {
    errorMessage: string;
}) => JSX.Element;
export declare const StatusElement: (props: {
    status: Status;
    statusMessage: string;
}) => JSX.Element;
export declare const PageTitleActionBar: (props: {
    okAction: () => Promise<void>;
    cancelAction: () => Promise<void>;
    title: string;
    status: Status;
    statusMessage: string;
    okText?: string;
    cancelText?: string;
}) => JSX.Element;
export declare const ModalContent: (props: {
    title: string;
    children: JSX.Element;
    OkButton: JSX.Element;
    cancelButton: JSX.Element;
}) => JSX.Element;
export declare const ModalDialog: (props: {
    title: string;
    children: JSX.Element;
    actionButtons: JSX.Element;
    progress?: JSX.Element;
}) => JSX.Element;
export declare const Paginator1: (props: IPaginatorProps<any>) => JSX.Element;
export declare const Paginator: (props: IPaginatorProps<any>) => JSX.Element;
export declare const FieldLabel: (props: {
    label: string;
    children: React.ReactNode;
}) => JSX.Element;
//# sourceMappingURL=CommonComponents.d.ts.map