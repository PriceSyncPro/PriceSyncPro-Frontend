
// Local Product interface for AddProduct component (temporary ID)
export interface Product {
    id: number;
    name: string;
}

// Also export as AddProductItem for clarity
export type AddProductItem = Product;



export interface Step {
    id: number;
    title: string;
    icon?: React.ReactNode;
    color?: string;
    description?: string;
}