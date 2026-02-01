import './DuotoneSamples.css';

type ThemeMode = 'light' | 'dark' | 'agentic';

interface DuotoneTheme {
    label: string;
}

// Pre-rendered dithered images (no runtime computation needed)
const DUOTONE_IMAGES: Record<ThemeMode, string> = {
    dark: '/assets/duotone/duotone-dark.png',
    light: '/assets/duotone/duotone-light.png',
    agentic: '/assets/duotone/duotone-agentic.png'
};

export default function DuotoneSamples() {
    const themes: Record<ThemeMode, DuotoneTheme> = {
        dark: { label: 'Dark Mode' },
        light: { label: 'Light Mode' },
        agentic: { label: 'Agentic Mode' }
    };

    return (
        <div className="duotone-samples-container">
            <h3 className="samples-heading">Duotone Styles</h3>

            <div className="samples-grid">
                {(['dark', 'light', 'agentic'] as ThemeMode[]).map((mode) => (
                    <div key={mode} className={`sample-card sample-card--${mode}`}>
                        <div className="sample-image-wrapper">
                            <img
                                src={DUOTONE_IMAGES[mode]}
                                alt={`${themes[mode].label} Sample`}
                                className="sample-image"
                                loading="lazy"
                            />
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

