import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { brandsApiService, CreateBrandData, UpdateBrandData } from '@/services/brandsApiService';
import { useBrands } from '../context/brands-context';

const brandFormSchema = z.object({
    name: z.string().min(1, 'Brand name is required').max(255, 'Brand name is too long'),
    slug: z.string().max(255, 'Slug is too long').optional(),
    description: z.string().max(1000, 'Description is too long').optional(),
    logo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    website_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    is_active: z.boolean().default(true),
});

type BrandFormData = z.infer<typeof brandFormSchema>;

export function BrandsDialogs() {
    return (
        <>
            <CreateBrandDialog />
            <EditBrandDialog />
            <DeleteBrandDialog />
        </>
    );
}

function CreateBrandDialog() {
    const { isCreateDialogOpen, setIsCreateDialogOpen, setSuccessMessage, setErrorMessage, isLoading, setIsLoading } = useBrands();

    const form = useForm<BrandFormData>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            logo_url: '',
            website_url: '',
            is_active: true,
        },
    });

    const onSubmit = async (data: BrandFormData) => {
        setIsLoading(true);
        try {
            // Clean up empty strings to undefined
            const cleanData: CreateBrandData = {
                ...data,
                slug: data.slug || undefined,
                description: data.description || undefined,
                logo_url: data.logo_url || undefined,
                website_url: data.website_url || undefined,
            };

            await brandsApiService.createBrand(cleanData);
            setSuccessMessage('Brand created successfully');
            setIsCreateDialogOpen(false);
            form.reset();
            // Trigger refetch - this would be handled by the parent component
            window.location.reload();
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || 'Failed to create brand');
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleNameChange = (name: string) => {
        form.setValue('name', name);
        if (!form.getValues('slug')) {
            form.setValue('slug', generateSlug(name));
        }
    };

    return (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Brand</DialogTitle>
                    <DialogDescription>Add a new brand to your inventory management system.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter brand name" {...field} onChange={(e) => handleNameChange(e.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="brand-slug" {...field} />
                                    </FormControl>
                                    <FormDescription>URL-friendly version. Leave empty to auto-generate.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Brief description of the brand" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="logo_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Logo URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/logo.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://brand-website.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Active</FormLabel>
                                        <FormDescription>Active brands can be assigned to products.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Brand'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function EditBrandDialog() {
    const { isEditDialogOpen, setIsEditDialogOpen, editingBrand, setEditingBrand, setSuccessMessage, setErrorMessage, isLoading, setIsLoading } =
        useBrands();

    const form = useForm<BrandFormData>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            logo_url: '',
            website_url: '',
            is_active: true,
        },
    });

    // Update form when editing brand changes
    React.useEffect(() => {
        if (editingBrand) {
            form.reset({
                name: editingBrand.name,
                slug: editingBrand.slug,
                description: editingBrand.description || '',
                logo_url: editingBrand.logo_url || '',
                website_url: editingBrand.website_url || '',
                is_active: editingBrand.is_active,
            });
        }
    }, [editingBrand, form]);

    const onSubmit = async (data: BrandFormData) => {
        if (!editingBrand) return;

        setIsLoading(true);
        try {
            // Clean up empty strings to undefined
            const cleanData: UpdateBrandData = {
                ...data,
                slug: data.slug || undefined,
                description: data.description || undefined,
                logo_url: data.logo_url || undefined,
                website_url: data.website_url || undefined,
            };

            await brandsApiService.updateBrand(editingBrand.id, cleanData);
            setSuccessMessage('Brand updated successfully');
            setIsEditDialogOpen(false);
            setEditingBrand(null);
            // Trigger refetch - this would be handled by the parent component
            window.location.reload();
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || 'Failed to update brand');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={isEditDialogOpen}
            onOpenChange={(open) => {
                setIsEditDialogOpen(open);
                if (!open) setEditingBrand(null);
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Brand</DialogTitle>
                    <DialogDescription>Update the brand information.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Same form fields as CreateBrandDialog */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter brand name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="brand-slug" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Brief description of the brand" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="logo_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Logo URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/logo.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://brand-website.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Active</FormLabel>
                                        <FormDescription>Active brands can be assigned to products.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update Brand'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function DeleteBrandDialog() {
    const {
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        editingBrand,
        setEditingBrand,
        selectedBrands,
        setSelectedBrands,
        setSuccessMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
    } = useBrands();

    const isMultipleDelete = selectedBrands.length > 1;
    const brandToDelete = editingBrand;

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            if (isMultipleDelete) {
                // Delete multiple brands
                await Promise.all(selectedBrands.map((id) => brandsApiService.deleteBrand(id)));
                setSuccessMessage(`${selectedBrands.length} brands deleted successfully`);
                setSelectedBrands([]);
            } else if (brandToDelete) {
                // Delete single brand
                await brandsApiService.deleteBrand(brandToDelete.id);
                setSuccessMessage('Brand deleted successfully');
                setEditingBrand(null);
            }

            setIsDeleteDialogOpen(false);
            // Trigger refetch - this would be handled by the parent component
            window.location.reload();
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || 'Failed to delete brand(s)');
        } finally {
            setIsLoading(false);
        }
    };

    const getDialogContent = () => {
        if (isMultipleDelete) {
            return {
                title: `Delete ${selectedBrands.length} Brands`,
                description: `Are you sure you want to delete ${selectedBrands.length} selected brands? This action cannot be undone.`,
            };
        } else if (brandToDelete) {
            return {
                title: 'Delete Brand',
                description: `Are you sure you want to delete "${brandToDelete.name}"? This action cannot be undone.`,
            };
        }
        return {
            title: 'Delete Brand',
            description: 'Are you sure you want to delete this brand? This action cannot be undone.',
        };
    };

    const { title, description } = getDialogContent();

    return (
        <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={(open) => {
                setIsDeleteDialogOpen(open);
                if (!open) {
                    setEditingBrand(null);
                    setSelectedBrands([]);
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
