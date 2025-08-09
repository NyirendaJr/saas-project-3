import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFont } from '@/context/font-context';
import { IconTypography } from '@tabler/icons-react';

export function FontSwitcher() {
    const { currentFont, setFont, availableFonts } = useFont();

    const fontLabels: Record<string, string> = {
        inter: 'Inter',
        manrope: 'Manrope',
        system: 'System',
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <IconTypography className="h-4 w-4" />
                    <span className="sr-only">Switch font</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {availableFonts.map((font) => (
                    <DropdownMenuItem
                        key={font}
                        onClick={() => setFont(font)}
                        className={`cursor-pointer ${currentFont === font ? 'bg-accent' : ''}`}
                    >
                        <span className={`font-${font} mr-2`}>{fontLabels[font] || font}</span>
                        {currentFont === font && <span className="ml-auto text-xs">✓</span>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
