export interface ArtToyType {
    _id: string;
    sku: string;
    name: string;
    posterPicture: string;
    description: string;
    arrivalDate: string;
    availableQuota: number;
}

export interface ToyJsonResponse {
    count: number;
    data: ArtToyType[];
}

export interface ToyCatalogProps {
    toyJson: Promise<ToyJsonResponse>;
}

export interface OrderItem {
    _id: string;
    artToy: {
        _id: string;
        name: string;
        picture?: string;
    };
    orderAmount: number;

    user?: {
        name: string;
        email: string;
    }
}

export interface OrderFormProps {
    allToys: ArtToyType[];
    pastOrderedToyIds: string[]; 
}