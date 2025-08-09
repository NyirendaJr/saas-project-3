import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type Module } from '@/types/modules';
import { Link } from '@inertiajs/react';

interface ModuleCardProps {
    module: Module;
    className?: string;
}

export function ModuleCard({ module, className }: ModuleCardProps) {
    const IconComponent = module.icon;

    return (
        <Link href={module.route} className="block">
            <Card
                className={cn(
                    'group cursor-pointer border-2 transition-all duration-200 hover:scale-105 hover:border-primary/20 hover:shadow-lg',
                    className,
                )}
            >
                <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Icon */}
                        <div
                            className={cn(
                                'flex h-16 w-16 items-center justify-center rounded-full text-white transition-all duration-200 group-hover:scale-110',
                                module.color || 'bg-gray-500',
                            )}
                        >
                            <IconComponent className="h-8 w-8" />
                        </div>

                        {/* Module Name */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">{module.name}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                        </div>

                        {/* Hover Indicator */}
                        <div className="h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-8" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
