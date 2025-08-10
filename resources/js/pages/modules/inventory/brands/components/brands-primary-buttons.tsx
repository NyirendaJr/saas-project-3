import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useBrands } from '../context/brands-context';

export function BrandsPrimaryButtons() {
    const { selectedBrands, setIsCreateDialogOpen, setIsDeleteDialogOpen } = useBrands();

    const handleCreateBrand = () => {
        setIsCreateDialogOpen(true);
    };

    const handleDeleteSelected = () => {
        if (selectedBrands.length > 0) {
            setIsDeleteDialogOpen(true);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button onClick={handleCreateBrand}>
                <Plus className="mr-2 h-4 w-4" />
                Add Brand
            </Button>

            {selectedBrands.length > 0 && (
                <Button variant="destructive" onClick={handleDeleteSelected}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected ({selectedBrands.length})
                </Button>
            )}
        </div>
    );
}

