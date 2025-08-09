import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorDemoProps {
    className?: string;
}

export function ColorSchemeDemo({ className }: ColorDemoProps) {
    return (
        <div className={`space-y-8 p-6 ${className}`}>
            <div>
                <h1 className="mb-2 text-3xl font-bold text-foreground">Professional Inventory Color Scheme</h1>
                <p className="text-muted-foreground">A modern, accessible color palette designed for inventory management systems.</p>
            </div>

            {/* Primary Colors */}
            <Card>
                <CardHeader>
                    <CardTitle>Primary Brand Colors</CardTitle>
                    <CardDescription>Main brand colors for headers, buttons, and key UI elements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <div className="flex h-20 items-center justify-center rounded-lg bg-primary">
                                <span className="font-medium text-primary-foreground">Primary</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Professional Blue - Trust & Reliability</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex h-20 items-center justify-center rounded-lg bg-secondary">
                                <span className="font-medium text-secondary-foreground">Secondary</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Light Gray - Subtle Backgrounds</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex h-20 items-center justify-center rounded-lg bg-accent">
                                <span className="font-medium text-accent-foreground">Accent</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Hover States & Highlights</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Status Colors */}
            <Card>
                <CardHeader>
                    <CardTitle>Status & Feedback Colors</CardTitle>
                    <CardDescription>Essential colors for communicating system states and user feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <div className="flex h-20 items-center justify-center rounded-lg bg-success">
                                <span className="font-medium text-success-foreground">Success</span>
                            </div>
                            <p className="text-sm text-muted-foreground">In Stock, Completed</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex h-20 items-center justify-center rounded-lg bg-warning">
                                <span className="font-medium text-warning-foreground">Warning</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Low Stock, Attention</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex h-20 items-center justify-center rounded-lg bg-destructive">
                                <span className="font-medium text-destructive-foreground">Error</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Out of Stock, Critical</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex h-20 items-center justify-center rounded-lg bg-info">
                                <span className="font-medium text-info-foreground">Info</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Pending, Information</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Status Badges Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Status Examples</CardTitle>
                    <CardDescription>Real-world status indicators for inventory management</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="status-in-stock">In Stock (150)</Badge>
                            <Badge className="status-low-stock">Low Stock (5)</Badge>
                            <Badge className="status-out-of-stock">Out of Stock</Badge>
                            <Badge className="status-pending">Order Pending</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge className="badge-success">✓ Order Complete</Badge>
                            <Badge className="badge-warning">⚠ Review Required</Badge>
                            <Badge className="badge-destructive">✗ Order Failed</Badge>
                            <Badge className="badge-info">ℹ Processing</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
                <CardHeader>
                    <CardTitle>Action Buttons</CardTitle>
                    <CardDescription>Contextual action buttons with appropriate colors</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Button>Primary Action</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button className="btn-success">Add Stock</Button>
                        <Button className="btn-warning">Update Inventory</Button>
                        <Button className="btn-info">View Details</Button>
                        <Button variant="destructive">Remove Item</Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Metric Cards Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Dashboard Metrics</CardTitle>
                    <CardDescription>Sample metric cards for inventory dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="card-metric card-metric-positive">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                    <p className="text-2xl font-bold text-foreground">$45,231</p>
                                </div>
                                <div className="text-success">↑ 12%</div>
                            </div>
                        </div>

                        <div className="card-metric card-metric-negative">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                                    <p className="text-2xl font-bold text-foreground">23</p>
                                </div>
                                <div className="text-destructive">↑ 5</div>
                            </div>
                        </div>

                        <div className="card-metric card-metric-neutral">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                                    <p className="text-2xl font-bold text-foreground">156</p>
                                </div>
                                <div className="text-info">→ 0%</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Color Accessibility Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Accessibility Features</CardTitle>
                    <CardDescription>This color scheme meets WCAG 2.1 AA standards</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-semibold text-foreground">✓ High Contrast</h4>
                            <p className="text-sm text-muted-foreground">All text meets 4.5:1 contrast ratio minimum</p>
                        </div>
                        <div>
                            <h4 className="mb-2 font-semibold text-foreground">✓ Color Blind Friendly</h4>
                            <p className="text-sm text-muted-foreground">Status is conveyed through icons and text, not just color</p>
                        </div>
                        <div>
                            <h4 className="mb-2 font-semibold text-foreground">✓ Dark Mode Support</h4>
                            <p className="text-sm text-muted-foreground">Seamless switching between light and dark themes</p>
                        </div>
                        <div>
                            <h4 className="mb-2 font-semibold text-foreground">✓ Focus Indicators</h4>
                            <p className="text-sm text-muted-foreground">Clear focus rings for keyboard navigation</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
