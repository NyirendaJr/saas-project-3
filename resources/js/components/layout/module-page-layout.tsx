import React from 'react';

interface ModulePageLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    primaryButtons?: React.ReactNode;
    dialogs?: React.ReactNode;
    showHeader?: boolean;
    className?: string;
}

export function ModulePageLayout({
    children,
    title,
    description,
    primaryButtons,
    dialogs,
    showHeader = true,
    className = '',
}: ModulePageLayoutProps) {
    return (
        <div className={`flex flex-col space-y-6 ${className}`}>
            {showHeader && (
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                            {description && <p className="text-muted-foreground">{description}</p>}
                        </div>
                        {primaryButtons && <div className="flex items-center space-x-2">{primaryButtons}</div>}
                    </div>
                </div>
            )}

            <div className="flex-1">{children}</div>

            {dialogs}
        </div>
    );
}
