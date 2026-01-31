/**
 * Format-agnostic asset path resolver
 * 
 * Finds the first available image file matching the given name
 * across supported formats (webp, jpg, jpeg, png, gif)
 */

const SUPPORTED_FORMATS = ['webp', 'jpg', 'jpeg', 'png', 'gif'] as const;

/**
 * Cache for resolved asset paths to avoid repeated lookups
 */
const assetCache = new Map<string, string>();

/**
 * Checks if an image exists by attempting to load it
 */
function checkImageExists(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

/**
 * Resolves an asset path by trying each supported format
 * 
 * @param basePath - The directory path (e.g., '/assets/cards')
 * @param imageName - The image name without extension (e.g., 'dark')
 * @returns The full path to the first matching image, or null if not found
 */
export async function getAssetPath(
    basePath: string,
    imageName: string
): Promise<string | null> {
    const cacheKey = `${basePath}/${imageName}`;

    // Check cache first
    if (assetCache.has(cacheKey)) {
        return assetCache.get(cacheKey)!;
    }

    // Try each format until one works
    for (const format of SUPPORTED_FORMATS) {
        const fullPath = `${basePath}/${imageName}.${format}`;
        const exists = await checkImageExists(fullPath);
        if (exists) {
            assetCache.set(cacheKey, fullPath);
            return fullPath;
        }
    }

    return null;
}

/**
 * Clear the asset cache (call this when files change)
 */
export function clearAssetCache(): void {
    assetCache.clear();
}

// Auto-clear cache on hot module reload in development
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        clearAssetCache();
    });
}
