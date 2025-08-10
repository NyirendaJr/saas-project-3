import { Brand } from '@/services/brandsApiService';
import { createContext, useContext, useState } from 'react';

interface BrandsContextType {
    selectedBrands: string[];
    setSelectedBrands: (brands: string[]) => void;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    isCreateDialogOpen: boolean;
    setIsCreateDialogOpen: (open: boolean) => void;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    editingBrand: Brand | null;
    setEditingBrand: (brand: Brand | null) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string | null) => void;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const BrandsContext = createContext<BrandsContextType | undefined>(undefined);

export function useBrands() {
    const context = useContext(BrandsContext);
    if (context === undefined) {
        throw new Error('useBrands must be used within a BrandsProvider');
    }
    return context;
}

interface BrandsProviderProps {
    children: React.ReactNode;
    initialFlash?: {
        success?: string;
        error?: string;
    };
}

export default function BrandsProvider({ children, initialFlash }: BrandsProviderProps) {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(initialFlash?.error || null);
    const [successMessage, setSuccessMessage] = useState<string | null>(initialFlash?.success || null);
    const [isLoading, setIsLoading] = useState(false);

    const value = {
        selectedBrands,
        setSelectedBrands,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isCreateDialogOpen,
        setIsCreateDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        editingBrand,
        setEditingBrand,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
        isLoading,
        setIsLoading,
    };

    return <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>;
}

