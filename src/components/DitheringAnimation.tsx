import { Dithering } from '@paper-design/shaders-react';
import { useResponsiveDithering } from '../hooks/useResponsiveDithering';
import './Banner.css';

interface DitheringAnimationProps {
    variant: 'light' | 'dark';
}

export default function DitheringAnimation({ variant }: DitheringAnimationProps) {
    const { ditheringSize } = useResponsiveDithering();

    const colors = {
        dark: {
            colorBack: '#00000000',
            colorFront: '#FBFDE2',
            bgClass: 'banner-dithering--dark'
        },
        light: {
            colorBack: '#00000000',
            colorFront: '#274029',
            bgClass: 'banner-dithering--light'
        }
    };

    const { colorBack, colorFront, bgClass } = colors[variant];

    return (
        <Dithering
            speed={1}
            shape="wave"
            type="4x4"
            size={ditheringSize}
            scale={1.2}
            frame={1898309.7999998615}
            colorBack={colorBack}
            colorFront={colorFront}
            className={`banner-dithering ${bgClass}`}
        />
    );
}
