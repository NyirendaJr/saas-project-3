import { fonts } from '@/config/fonts';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Font = (typeof fonts)[number];

interface FontContextType {
    currentFont: Font;
    setFont: (font: Font) => void;
    availableFonts: Font[];
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
    const [currentFont, setCurrentFont] = useState<Font>('inter');

    useEffect(() => {
        // Load font preference from localStorage
        const savedFont = localStorage.getItem('font') as Font;
        if (savedFont && fonts.includes(savedFont)) {
            setCurrentFont(savedFont);
        }
    }, []);

    const setFont = (font: Font) => {
        setCurrentFont(font);
        localStorage.setItem('font', font);

        // Apply font class to document
        document.documentElement.classList.remove(...fonts.map((f) => `font-${f}`));
        document.documentElement.classList.add(`font-${font}`);
    };

    useEffect(() => {
        // Apply current font on mount and when it changes
        document.documentElement.classList.remove(...fonts.map((f) => `font-${f}`));
        document.documentElement.classList.add(`font-${currentFont}`);
    }, [currentFont]);

    return <FontContext.Provider value={{ currentFont, setFont, availableFonts: fonts }}>{children}</FontContext.Provider>;
}

export function useFont() {
    const context = useContext(FontContext);
    if (context === undefined) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
}
