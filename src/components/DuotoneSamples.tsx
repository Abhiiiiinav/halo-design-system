import { useAssetPath } from '../hooks/useAssetPath';
import DitheredImage from './DitheredImage';
import './DuotoneSamples.css';

type ThemeMode = 'light' | 'dark' | 'agentic';

interface DuotoneTheme {
    bg: string;
    highlight: string;
    shadow: string;
    label: string;
}

// Asset folder path for duotone samples
const DUOTONE_PATH = '/assets/duotone';

export default function DuotoneSamples() {
    // Format-agnostic image loading for each mode
    const darkImage = useAssetPath(DUOTONE_PATH, 'dark');
    const lightImage = useAssetPath(DUOTONE_PATH, 'light');
    const agenticImage = useAssetPath(DUOTONE_PATH, 'agentic');

    const imageMap: Record<ThemeMode, string | null> = {
        dark: darkImage,
        light: lightImage,
        agentic: agenticImage
    };

    // Color definitions aligned with Design System
    const themes: Record<ThemeMode, DuotoneTheme> = {
        dark: {
            bg: '#000000',           // --color-base-black
            highlight: '#FBFDE2',    // --color-base-cream
            shadow: '#000000',       // Deep Blacks
            label: 'Dark Mode'
        },
        light: {
            bg: '#FDFDFD',           // --color-base-white
            highlight: '#FDFDFD',    // White
            shadow: '#274029',       // --color-base-green
            label: 'Light Mode'
        },
        agentic: {
            bg: '#FFFFFF',           // White
            highlight: '#A3BD6A',    // Soft Sage/Olive Highlight
            shadow: '#0D1F18',       // Deep Green Shadow
            label: 'Agentic Mode'
        }
    };

    return (
        <div className="duotone-samples-container">
            <h3 className="samples-heading">Duotone Styles</h3>

            <div className="samples-grid">
                {(['dark', 'light', 'agentic'] as ThemeMode[]).map((mode) => (
                    <div key={mode} className={`sample-card sample-card--${mode}`}>
                        <div className="sample-image-wrapper">
                            {imageMap[mode] && (
                                <DitheredImage
                                    src={imageMap[mode]!}
                                    crunch={3}
                                    primaryColor={themes[mode].highlight}
                                    secondaryColor={themes[mode].shadow}
                                    alt={`${themes[mode].label} Sample`}
                                />
                            )}
                        </div>
                        <div className="sample-label">
                            {themes[mode].label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
