import { useAssetPath } from '../hooks/useAssetPath';
import './DitherCard.css';

interface DitherCardProps {
    title?: string;
    subtitle?: string;
    className?: string;
    mode?: 'light' | 'dark' | 'agentic';
}

// Asset folder path for cards
const CARDS_PATH = '/assets/cards';

export default function DitherCard({
    title = "Agentic Flow",
    subtitle = "System Aligned",
    className = "",
    mode = 'dark'
}: DitherCardProps) {
    // Format-agnostic image loading - automatically finds webp, jpg, png, etc.
    const imagePath = useAssetPath(CARDS_PATH, mode);

    const theme = {
        dark: {
            bg: '#000000',
            text: '#FBFDE2',
            subtext: '#A3A38C',
            border: '#1A1A1A',
            overlay: 'rgba(251, 253, 226, 0.08)'
        },
        light: {
            bg: '#FDFDFD',
            text: '#274029',
            subtext: '#5A7A5C',
            border: '#E2E8F0',
            overlay: 'rgba(39, 64, 41, 0.06)'
        },
        agentic: {
            bg: '#F4F7EE',
            text: '#0D1F18',
            subtext: '#50605A',
            border: '#CBD5A0',
            overlay: 'rgba(163, 189, 106, 0.1)'
        }
    }[mode];

    return (
        <div
            className={`dither-card ${className} ${mode}`}
            style={{
                background: theme.bg,
                border: `1px solid ${theme.border}`,
            }}
        >
            {/* SVG noise filter definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id={`noise-${mode}`}>
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </svg>

            {/* Top Section: Image with CSS dither overlay */}
            <div className="dither-card-visual" style={{ background: theme.bg }}>
                {/* Card image - loaded from /assets/cards/{mode}.* */}
                {imagePath && (
                    <img
                        src={imagePath}
                        alt=""
                        className="dither-card-image"
                        style={{
                            filter: mode === 'dark'
                                ? 'grayscale(100%) contrast(1.1)'
                                : 'grayscale(100%) contrast(1.2) brightness(1.1)',
                        }}
                    />
                )}

                {/* Noise/dither overlay - pure CSS, no WebGL */}
                <div
                    className="dither-noise-overlay"
                    style={{
                        background: theme.overlay,
                        filter: `url(#noise-${mode})`,
                    }}
                />

                {/* Gradient fade to text section */}
                <div
                    className="dither-gradient-fade"
                    style={{
                        background: `linear-gradient(to bottom, transparent 40%, ${theme.bg} 100%)`
                    }}
                />
            </div>

            {/* Bottom Section: Text Content */}
            <div className="dither-card-content" style={{ background: theme.bg }}>
                <h3 className="dither-card-title" style={{ color: theme.text }}>
                    {title}
                </h3>
                <p className="dither-card-subtitle" style={{ color: theme.subtext }}>
                    {subtitle}
                </p>
            </div>
        </div>
    );
}
