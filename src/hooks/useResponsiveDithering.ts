import { useState, useEffect } from 'react';

interface ResponsiveSizes {
    ditheringSize: number;
    imageDitheringSize: number;
}

export function useResponsiveDithering(): ResponsiveSizes {
    const [sizes, setSizes] = useState<ResponsiveSizes>({
        ditheringSize: 1.3,
        imageDitheringSize: 2.2
    });

    useEffect(() => {
        const updateSizes = () => {
            const width = window.innerWidth;

            if (width <= 480) {
                setSizes({ ditheringSize: 0.5, imageDitheringSize: 0.8 });
            } else if (width <= 768) {
                setSizes({ ditheringSize: 0.8, imageDitheringSize: 1.2 });
            } else if (width <= 1024) {
                setSizes({ ditheringSize: 1.0, imageDitheringSize: 1.6 });
            } else {
                setSizes({ ditheringSize: 1.3, imageDitheringSize: 2.2 });
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, []);

    return sizes;
}
