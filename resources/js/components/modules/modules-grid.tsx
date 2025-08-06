import { type Module } from '@/types/modules';
import { ModuleCard } from './module-card';

interface ModulesGridProps {
    modules: Module[];
    className?: string;
}

export function ModulesGrid({ modules, className }: ModulesGridProps) {
    return (
        <div className={className}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {modules.map((module) => (
                    <ModuleCard key={module.id} module={module} />
                ))}
            </div>
        </div>
    );
}
