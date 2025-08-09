import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { usePermissions } from '../context/permissions-context';

export function PermissionsDialogs() {
    const {
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        isCreateDialogOpen,
        setIsCreateDialogOpen,
        isEditDialogOpen,
        setIsEditDialogOpen,
        editingPermission,
        selectedPermissions,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
    } = usePermissions();

    const [formData, setFormData] = useState({
        name: '',
        guard_name: 'web',
        module: '',
        description: '',
    });

    const handleCreate = () => {
        // TODO: Implement create permission logic
        console.log('Creating permission:', formData);
        setIsCreateDialogOpen(false);
        setFormData({ name: '', guard_name: 'web', module: '', description: '' });
    };

    const handleEdit = () => {
        // TODO: Implement edit permission logic
        console.log('Editing permission:', editingPermission);
        setIsEditDialogOpen(false);
    };

    const handleDelete = () => {
        // TODO: Implement delete permission logic
        console.log('Deleting permissions:', selectedPermissions);
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            {/* Error Message Dialog */}
            <Dialog open={!!errorMessage} onOpenChange={() => setErrorMessage(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="h-5 w-5" />
                            Error
                        </DialogTitle>
                        <DialogDescription className="text-red-600">{errorMessage}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setErrorMessage(null)}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Message Dialog */}
            <Dialog open={!!successMessage} onOpenChange={() => setSuccessMessage(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            Success
                        </DialogTitle>
                        <DialogDescription className="text-green-600">{successMessage}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setSuccessMessage(null)}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create Permission Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Permission</DialogTitle>
                        <DialogDescription>Add a new permission to the system.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="col-span-3"
                                placeholder="permission.name"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="guard" className="text-right">
                                Guard
                            </Label>
                            <Select value={formData.guard_name} onValueChange={(value) => setFormData({ ...formData, guard_name: value })}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web">Web</SelectItem>
                                    <SelectItem value="api">API</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="module" className="text-right">
                                Module
                            </Label>
                            <Select value={formData.module} onValueChange={(value) => setFormData({ ...formData, module: value })}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select module" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="users">Users</SelectItem>
                                    <SelectItem value="settings">Settings</SelectItem>
                                    <SelectItem value="sales">Sales</SelectItem>
                                    <SelectItem value="reports">Reports</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="col-span-3"
                                placeholder="Permission description..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreate}>Create Permission</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Permission Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Permission</DialogTitle>
                        <DialogDescription>Update the permission details.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                                Name
                            </Label>
                            <Input id="edit-name" defaultValue={editingPermission?.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-description" className="text-right">
                                Description
                            </Label>
                            <Textarea id="edit-description" defaultValue={editingPermission?.description} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEdit}>Update Permission</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Permission Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the selected permission
                            {selectedPermissions.length > 1 ? 's' : ''}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
