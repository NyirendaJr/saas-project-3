import { createContext, useContext, useState } from 'react';

interface PermissionsContextType {
    selectedPermissions: string[];
    setSelectedPermissions: (permissions: string[]) => void;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    isCreateDialogOpen: boolean;
    setIsCreateDialogOpen: (open: boolean) => void;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    editingPermission: any;
    setEditingPermission: (permission: any) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string | null) => void;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function usePermissions() {
    const context = useContext(PermissionsContext);
    if (context === undefined) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
}

interface PermissionsProviderProps {
    children: React.ReactNode;
    initialFlash?: {
        success?: string;
        error?: string;
    };
}

export default function PermissionsProvider({ children, initialFlash }: PermissionsProviderProps) {
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingPermission, setEditingPermission] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(initialFlash?.error || null);
    const [successMessage, setSuccessMessage] = useState<string | null>(initialFlash?.success || null);

    const value = {
        selectedPermissions,
        setSelectedPermissions,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isCreateDialogOpen,
        setIsCreateDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        editingPermission,
        setEditingPermission,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
    };

    return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
}
