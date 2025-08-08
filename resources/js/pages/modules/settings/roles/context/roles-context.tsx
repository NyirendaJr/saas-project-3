import { createContext, ReactNode, useContext } from 'react';

interface RolesContextType {
    // Add any context-specific state or methods here
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

interface RolesProviderProps {
    children: ReactNode;
    initialFlash?: {
        success?: string;
        error?: string;
    };
}

export function RolesProvider({ children, initialFlash }: RolesProviderProps) {
    const value: RolesContextType = {
        // Add any context-specific state or methods here
    };

    return <RolesContext.Provider value={value}>{children}</RolesContext.Provider>;
}

export function useRolesContext() {
    const context = useContext(RolesContext);
    if (context === undefined) {
        throw new Error('useRolesContext must be used within a RolesProvider');
    }
    return context;
}

export default RolesProvider;
