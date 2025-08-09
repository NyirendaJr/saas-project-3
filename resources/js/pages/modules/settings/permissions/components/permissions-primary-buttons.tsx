import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { usePermissions } from '../context/permissions-context';

export function PermissionsPrimaryButtons() {
    const { selectedPermissions, setIsCreateDialogOpen, setIsDeleteDialogOpen, setErrorMessage, setSuccessMessage } = usePermissions();
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSyncPermissions = async () => {
        setIsSyncing(true);
        try {
            await router.post(
                '/permissions/sync',
                {},
                {
                    onSuccess: (page: any) => {
                        // Check for flash messages
                        if (page.props.flash?.success) {
                            setSuccessMessage(page.props.flash.success);
                        }
                        if (page.props.flash?.error) {
                            setErrorMessage(page.props.flash.error);
                        }
                        // Refresh the page to show updated permissions
                        router.reload();
                    },
                    onError: (errors) => {
                        console.error('Failed to sync permissions:', errors);
                        setErrorMessage('Failed to sync permissions. Please try again.');
                    },
                    onFinish: () => {
                        setIsSyncing(false);
                    },
                },
            );
        } catch (error) {
            console.error('Error syncing permissions:', error);
            setErrorMessage('An unexpected error occurred while syncing permissions.');
            setIsSyncing(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {selectedPermissions.length > 0 && (
                <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                </Button>
            )}
            <Button size="sm" variant="outline" onClick={handleSyncPermissions} disabled={isSyncing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Permissions'}
            </Button>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Permission
            </Button>
        </div>
    );
}
