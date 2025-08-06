import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { usePermissions } from '../context/permissions-context';

export function PermissionsPrimaryButtons() {
    const { selectedPermissions, setIsCreateDialogOpen, setIsDeleteDialogOpen } = usePermissions();

    return (
        <div className="flex items-center gap-2">
            {selectedPermissions.length > 0 && (
                <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                </Button>
            )}
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Permission
            </Button>
        </div>
    );
}
