import DitheredImage from './DitheredImage';
import { useAssetPath } from '../hooks/useAssetPath';
import './MissionCard.css';

const DUOTONE_PATH = '/assets/duotone';

export default function MissionCard() {
    // Reuse the agentic image from DuotoneSamples
    const agenticImage = useAssetPath(DUOTONE_PATH, 'agentic');

    // Agentic Theme Colors
    const theme = {
        highlight: '#A3BD6A',    // Soft Sage/Olive Highlight
        shadow: '#0D1F18',       // Deep Green Shadow
    };

    return (
        <section className="mission-card-container">
            <div className="mission-card">
                <div className="mission-content">
                    <h2 className="mission-text">
                        We are building the financial infrastructure the <span className="highlight-text">agent economy</span> needs to scale.
                    </h2>
                </div>
                <div className="mission-visual">
                    {agenticImage && (
                        <DitheredImage
                            src={agenticImage}
                            crunch={3}
                            primaryColor={theme.highlight}
                            secondaryColor={theme.shadow}
                            alt="Agentic Economy Infrastructure"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

