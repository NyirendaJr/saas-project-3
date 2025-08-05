import useDialogState from '@/hooks/use-dialog-state';
import React, { createContext, useContext, useState } from 'react';

interface EntityContextType<T, D extends string> {
    open: D | null;
    setOpen: (str: D | null) => void;
    currentRow: T | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>;
}

export function createEntityContext<T, D extends string>() {
    const EntityContext = createContext<EntityContextType<T, D> | null>(null);

    function EntityProvider({ children }: { children: React.ReactNode }) {
        const [open, setOpen] = useDialogState<D>(null);
        const [currentRow, setCurrentRow] = useState<T | null>(null);

        return <EntityContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</EntityContext.Provider>;
    }

    function useEntity() {
        const context = useContext(EntityContext);
        if (!context) {
            throw new Error('useEntity must be used within an EntityProvider');
        }
        return context;
    }

    return { EntityProvider, useEntity };
}
