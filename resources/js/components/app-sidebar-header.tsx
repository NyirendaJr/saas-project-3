import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem } from '@/types';

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppSidebarHeader({ breadcrumbs = [] }: AppSidebarHeaderProps) {
    if (breadcrumbs.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
    );
}
