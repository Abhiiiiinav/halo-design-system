import { ImageDithering } from '@paper-design/shaders-react';
import { useResponsiveDithering } from '../hooks/useResponsiveDithering';
import './Banner.css';

interface DitheringImageProps {
    variant: 'light' | 'dark';
}

/**
 * Paper Design Dithering Image (Legacy/Specialized)
 *
 * USE WHEN:
 * - You are implementing the specific "Liquid Metal" or "Paper Design" branded banners.
 * - You need the exact specific dither algorithms provided by the @paper-design/shaders-react library.
 *
 * PREFER `DitheredImage` FOR:
 * - General purpose image dithering with Atkinson algorithm and custom duotone colors.
 */
export default function DitheringImage({ variant }: DitheringImageProps) {
    const { imageDitheringSize } = useResponsiveDithering();

    const config = {
        dark: {
            image: 'https://workers.paper.design/file-assets/01KG85R3HYDAAEWD7AE7ZCGNTF/01KG84W0D40CN0D4P3N0DEQAAA.jpg',
            colorFront: '#FBFDE2', /* Matches --color-base-cream */
            colorBack: '#00000000',
            colorHighlight: '#EAFF94', /* Matches --color-base-lime */
            bgClass: 'banner-image-dithering--dark'
        },
        light: {
            image: 'https://workers.paper.design/file-assets/01KG85R3HYDAAEWD7AE7ZCGNTF/01KG84GFNTZJNFSFNH0TC00JZP.jpg',
            colorFront: '#94FFAF', /* Matches --color-base-mint */
            colorBack: '#00000000',
            colorHighlight: '#EAFF94', /* Matches --color-base-lime */
            bgClass: 'banner-image-dithering--light'
        }
    };

    const { image, colorFront, colorBack, colorHighlight, bgClass } = config[variant];

    return (
        <ImageDithering
            originalColors={false}
            type="8x8"
            size={imageDitheringSize}
            colorSteps={2}
            image={image}
            scale={1}
            fit="cover"
            colorFront={colorFront}
            colorBack={colorBack}
            colorHighlight={colorHighlight}
            className={`banner-image-dithering ${bgClass}`}
        />
    );
}
