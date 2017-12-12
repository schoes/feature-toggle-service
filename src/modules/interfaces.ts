export class FeatureToggle {
    constructor() {
        this.isActivated = false;
    }

    toggleId: string;
    isActivated: boolean;
    activeInVersion?: string;
    toggleType: APPLICATION_TYPE;
}

export enum APPLICATION_TYPE {
    PORTAL, APP, UNKNOWN
}

export class FeatureToggleUpdate {
    isActivated: boolean;
    activeInVersion?: string;
    toggleType: APPLICATION_TYPE;
}