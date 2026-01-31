import HaloLogo from './HaloLogo';
import './Banner.css';

export default function DarkBanner() {
    return (
        <div className="banner">
            <img
                src="/assets/banners/dithering-dark.webp"
                alt=""
                className="banner-dithering banner-dithering--dark"
                style={{ objectFit: 'cover' }}
            />
            <HaloLogo variant="dark" />
            <img
                src="/assets/banners/image-dithering-dark.jpg"
                alt=""
                className="banner-image-dithering banner-image-dithering--dark"
                style={{ objectFit: 'cover' }}
            />
        </div>
    );
}
