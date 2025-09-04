
export interface Product {
    id: number;
    name: string;
}



export interface Step {
    id: number;
    title: string;
    icon?: React.ReactNode;
    color?: string;
    description?: string;
}