import React from 'react';
import { JobPositionFeature } from '../../models/JobPositionModels';
import { DialogResult } from 'common';


export class PopupContextProps<T> {
    isOpen : boolean

    closePopup: (result: DialogResult) => void;

    showPopup: (item: T) =>void;
    
    currentItem: T;
}

export const JobFeatureContext = React.createContext(new PopupContextProps<JobPositionFeature>());
