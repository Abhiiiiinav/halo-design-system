import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { toPng } from 'html-to-image';
import DitheredImage from './DitheredImage';
import './DuotoneImageUploader.css';

type ThemeMode = 'light' | 'dark' | 'agentic';

interface DuotoneTheme {
    bg: string;
    highlight: string;
    shadow: string;
    label: string;
    uiPrimary: string;
    uiOnPrimary: string;
}

export default function DuotoneImageUploader() {
    const [imageSrc, setImageSrc] = useState<string | null>("/agentic.webp");
    const [mode, setMode] = useState<ThemeMode>('dark');
    const [pendingMode, setPendingMode] = useState<ThemeMode | null>(null);
    const [zoom, setZoom] = useState(1);
    const [showDither, setShowDither] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    // Color definitions aligned with Design System
    const themes: Record<ThemeMode, DuotoneTheme> = {
        dark: {
            bg: '#000000',           // --color-base-black
            highlight: '#FBFDE2',    // --color-base-cream
            shadow: '#000000',       // Deep Blacks
            label: 'Dark Mode',
            uiPrimary: '#FBFDE2',    // Cream Buttons
            uiOnPrimary: '#000000'   // Black Text
        },
        light: {
            bg: '#FDFDFD',           // --color-base-white
            highlight: '#FDFDFD',    // White
            shadow: '#274029',       // Green
            label: 'Light Mode',
            uiPrimary: '#274029',    // Forest Green Buttons
            uiOnPrimary: '#FFFFFF'   // White Text
        },
        agentic: {
            bg: '#FFFFFF',           // White
            highlight: '#A3BD6A',    // Soft Sage/Olive Highlight
            shadow: '#0D1F18',       // Deep Green Shadow
            label: 'Agentic Mode',
            uiPrimary: '#A3BD6A',    // Sage Buttons
            uiOnPrimary: '#0D1F18'   // Dark Green Text
        }
    };

    const currentTheme = themes[mode];

    const handleModeChange = (newMode: ThemeMode) => {
        if (newMode === mode || isProcessing) return;
        setPendingMode(newMode);
        setIsProcessing(true);
        setTimeout(() => {
            setMode(newMode);
            setPendingMode(null);
            setIsProcessing(false);
        }, 400);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsProcessing(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target?.result as string);
                setZoom(1); // Reset zoom on new image
                setTimeout(() => setIsProcessing(false), 500);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerUpload = () => fileInputRef.current?.click();

    const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 3));
    const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));

    const handleDownload = async () => {
        if (!previewRef.current || !imageSrc) return;
        try {
            const dataUrl = await toPng(previewRef.current, { cacheBust: true });
            const link = document.createElement('a');
            link.download = `duotone-export-${mode}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image', err);
        }
    };

    // Helper to convert Hex to RGB array normalized (0-1) for SVG filter
    const hexToRgb01 = (hex: string) => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = ((bigint >> 16) & 255) / 255;
        const g = ((bigint >> 8) & 255) / 255;
        const b = (bigint & 255) / 255;
        return { r, g, b };
    };

    const shadow = hexToRgb01(currentTheme.shadow);
    const highlight = hexToRgb01(currentTheme.highlight);

    const rSlope = highlight.r - shadow.r;
    const gSlope = highlight.g - shadow.g;
    const bSlope = highlight.b - shadow.b;

    return (
        <div
            className="duotone-uploader-container"
            style={{
                background: currentTheme.bg,
                color: mode === 'dark' ? '#FFF' : '#000',
                // @ts-ignore
                '--theme-bg': currentTheme.bg,
                '--theme-highlight': currentTheme.highlight,
                '--theme-shadow': currentTheme.shadow,
                '--theme-ui-primary': currentTheme.uiPrimary,
                '--theme-ui-on-primary': currentTheme.uiOnPrimary,
                '--theme-text-contrast': mode === 'dark' ? currentTheme.bg : '#FFF'
            }}
        >

            <div className="duotone-controls">
                <div className="duotone-header">
                    <div className="theme-toggles">
                        {(['dark', 'light', 'agentic'] as ThemeMode[]).map((m) => {
                            const isActive = (pendingMode ?? mode) === m;
                            return (
                                <button
                                    key={m}
                                    onClick={() => handleModeChange(m)}
                                    className={`theme-btn ${isActive ? 'active' : ''}`}
                                    disabled={isProcessing}
                                >
                                    {isActive && isProcessing && pendingMode === m ? (
                                        <span className="btn-loader"></span>
                                    ) : null}
                                    {themes[m].label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden-input"
                />
                <button className="upload-btn" onClick={triggerUpload}>
                    {imageSrc ? 'Replace Image' : 'Upload Image'}
                </button>
            </div>

            <div className="duotone-preview-area">
                {isProcessing && (
                    <div className="processing-overlay">
                        <div className="spinner"></div>
                        <span>Processing...</span>
                    </div>
                )}

                {!imageSrc ? (
                    <div className="placeholder" onClick={triggerUpload}>
                        <span style={{ fontSize: '2rem' }}>+</span>
                        <span>Drag & Drop or Click to Upload</span>
                    </div>
                ) : (
                    <div className="image-wrapper" ref={previewRef} style={{ overflow: 'hidden' }}>
                        {/* Scale container */}
                        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease', width: '100%', height: '100%' }}>
                            {showDither ? (
                                <DitheredImage
                                    src={imageSrc}
                                    crunch={2}
                                    alt="Dithered preview"
                                    primaryColor={currentTheme.highlight}
                                    secondaryColor={currentTheme.shadow}
                                />
                            ) : (
                                <>
                                    <svg style={{ display: 'none' }}>
                                        <filter id={`duotone-filter-${mode}`}>
                                            <feColorMatrix
                                                type="matrix"
                                                values={`
                                                    ${0.2126 * rSlope} ${0.7152 * rSlope} ${0.0722 * rSlope} 0 ${shadow.r}
                                                    ${0.2126 * gSlope} ${0.7152 * gSlope} ${0.0722 * gSlope} 0 ${shadow.g}
                                                    ${0.2126 * bSlope} ${0.7152 * bSlope} ${0.0722 * bSlope} 0 ${shadow.b}
                                                    0 0 0 1 0
                                                `}
                                            />
                                        </filter>
                                    </svg>
                                    <img
                                        src={imageSrc}
                                        alt="Duotone Preview"
                                        style={{ filter: `url(#duotone-filter-${mode})`, width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Component Options */}
            <div className="button-showcase">
                <span className="showcase-label">Component Options</span>
                <div className="button-row">
                    <button className="btn-halo btn-halo-primary" onClick={handleDownload}>
                        Download
                    </button>

                    <button className="btn-halo btn-halo-outline" onClick={handleZoomIn}>
                        Zoom In
                    </button>

                    <button className="btn-halo btn-halo-outline" onClick={handleZoomOut}>
                        Zoom Out
                    </button>

                    <button className="btn-halo btn-halo-agentic" onClick={() => setShowDither(!showDither)}>
                        {showDither ? 'Remove Dither' : 'Add Dither'}
                    </button>
                </div>
            </div>
        </div>
    );
}
