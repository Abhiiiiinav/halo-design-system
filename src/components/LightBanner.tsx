import DitheringAnimation from './DitheringAnimation';
import HaloLogo from './HaloLogo';
import './Banner.css';

export default function LightBanner() {
    return (
        <div className="banner">
            <DitheringAnimation variant="light" />
            <HaloLogo variant="light" />
            <img
                src="/assets/banners/image-dithering-light.webp"
                alt=""
                className="banner-image-dithering banner-image-dithering--light"
                style={{ objectFit: 'cover' }}
            />
        </div>
    );
}
