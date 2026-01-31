import { useEffect, useRef, useState } from 'react';
import { ditherImage } from '../utils/atkinsonDither';

interface DitheredImageProps {
    src: string;
    crunch?: number;
    primaryColor: string;
    secondaryColor: string;
    alt?: string;
}

/**
 * Canvas-based Atkinson dithered image component
 * 
 * Renders an image with the classic Mac-style Atkinson dithering effect.
 * Uses canvas for pixel manipulation - no WebGL required.
 */
export default function DitheredImage({
    src,
    crunch = 4,
    primaryColor,
    secondaryColor,
    alt = 'Dithered image'
}: DitheredImageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const render = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const ditheredCanvas = await ditherImage(src, {
                    crunch,
                    primaryColor,
                    secondaryColor
                });

                if (cancelled) return;

                const canvas = canvasRef.current;
                const container = containerRef.current;
                if (!canvas || !container) return;

                // Set canvas dimensions to match container
                const rect = container.getBoundingClientRect();
                const displayWidth = rect.width || ditheredCanvas.width;
                const displayHeight = rect.height || ditheredCanvas.height;

                canvas.width = ditheredCanvas.width;
                canvas.height = ditheredCanvas.height;
                canvas.style.width = '100%';
                canvas.style.height = '100%';

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Draw with pixelated scaling for crisp dither
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(ditheredCanvas, 0, 0);

                setIsLoading(false);
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to dither image');
                    setIsLoading(false);
                }
            }
        };

        render();

        return () => {
            cancelled = true;
        };
    }, [src, crunch, primaryColor, secondaryColor]);

    return (
        <div
            ref={containerRef}
            className="dithered-image-container"
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: secondaryColor
            }}
        >
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: primaryColor,
                    fontSize: '0.875rem'
                }}>
                    Dithering…
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff4444',
                    fontSize: '0.875rem',
                    padding: '1rem',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}
            <canvas
                ref={canvasRef}
                aria-label={alt}
                role="img"
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    imageRendering: 'pixelated',
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.2s ease'
                }}
            />
        </div>
    );
}
