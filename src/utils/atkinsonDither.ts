/**
 * Atkinson Dithering Algorithm
 * 
 * Applies classic Atkinson error-diffusion dithering to an image.
 * Produces the iconic "Mac retro" aesthetic with crisp, pixel-accurate results.
 * 
 * Unlike Floyd-Steinberg, Atkinson only diffuses 6/8 (75%) of the error,
 * resulting in more contrast and less muddy mid-tones.
 */

export interface DitherOptions {
    /** Primary color for light/highlight pixels (default: white) */
    primaryColor?: string;
    /** Secondary color for dark/shadow pixels (default: black) */
    secondaryColor?: string;
    /** Threshold for black/white cutoff (0-255, default: 128) */
    threshold?: number;
}

/**
 * Parse hex color to RGB values
 */
function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0, 0, 0];
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ];
}

/**
 * Apply Atkinson dithering to ImageData
 * Modifies the ImageData in place and returns it
 */
export function atkinsonDither(
    imageData: ImageData,
    options: DitherOptions = {}
): ImageData {
    const {
        primaryColor = '#000000',
        secondaryColor = '#FFFFFF',
        threshold = 128
    } = options;

    const primary = hexToRgb(primaryColor);
    const secondary = hexToRgb(secondaryColor);

    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    // Convert to grayscale array for error diffusion
    const gray = new Float32Array(width * height);
    for (let i = 0; i < width * height; i++) {
        const idx = i * 4;
        // Luminance formula
        gray[i] = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    }

    // Atkinson error diffusion pattern:
    //       X   1   1
    //   1   1   1
    //       1
    // Each coefficient is 1/8, and we only spread 6/8 of the error

    const diffuseError = (x: number, y: number, err: number) => {
        const fraction = err / 8;

        // Right
        if (x + 1 < width) {
            gray[y * width + (x + 1)] += fraction;
        }
        // Right + 1
        if (x + 2 < width) {
            gray[y * width + (x + 2)] += fraction;
        }
        // Bottom left
        if (y + 1 < height && x - 1 >= 0) {
            gray[(y + 1) * width + (x - 1)] += fraction;
        }
        // Bottom
        if (y + 1 < height) {
            gray[(y + 1) * width + x] += fraction;
        }
        // Bottom right
        if (y + 1 < height && x + 1 < width) {
            gray[(y + 1) * width + (x + 1)] += fraction;
        }
        // Two rows down
        if (y + 2 < height) {
            gray[(y + 2) * width + x] += fraction;
        }
    };

    // Apply dithering
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = y * width + x;
            const oldPixel = gray[idx];
            const newPixel = oldPixel < threshold ? 0 : 255;
            const error = oldPixel - newPixel;

            // primaryColor = highlights (light areas), secondaryColor = shadows (dark areas)
            // This matches the duotone convention where highlight = light, shadow = dark
            const color = newPixel === 0 ? secondary : primary;

            // Write back to ImageData
            const dataIdx = idx * 4;
            data[dataIdx] = color[0];
            data[dataIdx + 1] = color[1];
            data[dataIdx + 2] = color[2];
            data[dataIdx + 3] = 255; // Full opacity

            // Diffuse error
            diffuseError(x, y, error);
        }
    }

    return imageData;
}

/**
 * Dither an image from a source URL
 * Returns a canvas with the dithered result
 */
export async function ditherImage(
    src: string,
    options: DitherOptions & { crunch?: number } = {}
): Promise<HTMLCanvasElement> {
    const { crunch = 1, ...ditherOptions } = options;

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            // Calculate dimensions based on crunch factor
            // Higher crunch = smaller working size = blockier result
            const scale = 1 / Math.max(1, crunch);
            const workWidth = Math.floor(img.width * scale);
            const workHeight = Math.floor(img.height * scale);

            // Create working canvas at reduced size
            const workCanvas = document.createElement('canvas');
            workCanvas.width = workWidth;
            workCanvas.height = workHeight;
            const workCtx = workCanvas.getContext('2d', { willReadFrequently: true });

            if (!workCtx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            // Draw image at reduced size
            workCtx.imageSmoothingEnabled = false;
            workCtx.drawImage(img, 0, 0, workWidth, workHeight);

            // Get image data and apply dithering
            const imageData = workCtx.getImageData(0, 0, workWidth, workHeight);
            atkinsonDither(imageData, ditherOptions);
            workCtx.putImageData(imageData, 0, 0);

            // Create output canvas at original size
            const outputCanvas = document.createElement('canvas');
            outputCanvas.width = img.width;
            outputCanvas.height = img.height;
            const outputCtx = outputCanvas.getContext('2d');

            if (!outputCtx) {
                reject(new Error('Could not get output canvas context'));
                return;
            }

            // Scale up with nearest-neighbor for crisp pixels
            outputCtx.imageSmoothingEnabled = false;
            outputCtx.drawImage(workCanvas, 0, 0, img.width, img.height);

            resolve(outputCanvas);
        };

        img.onerror = () => {
            reject(new Error(`Failed to load image: ${src}`));
        };

        img.src = src;
    });
}
