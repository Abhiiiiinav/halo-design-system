import { useState, useEffect, type RefObject } from 'react';

/**
 * Hook to calculate the LiquidMetal scale based on actual logo dimensions.
 * The shader renders at 800x600px, and we need to scale it to fit the O letter.
 * The O letter is approximately 21% of the total logo width.
 */
export function useLiquidMetalScale(logoRef: RefObject<SVGSVGElement | null>) {
    const [scale, setScale] = useState(0.1); // Default scale

    useEffect(() => {
        const calculateScale = () => {
            if (!logoRef.current) return;

            const logoWidth = logoRef.current.getBoundingClientRect().width;

            // The inner area of the O letter is approximately 12% of the logo width
            // The shader is 800px wide, we want it to fit inside the O
            // Target width for shader = logoWidth * 0.12
            // Scale = targetWidth / 800
            const oLetterInnerWidth = logoWidth * 0.12;
            const newScale = oLetterInnerWidth / 800;

            setScale(newScale);
        };

        // Calculate on mount
        calculateScale();

        // Recalculate on resize
        window.addEventListener('resize', calculateScale);

        return () => window.removeEventListener('resize', calculateScale);
    }, [logoRef]);

    return scale;
}
