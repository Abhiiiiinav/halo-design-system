import { useState, useEffect, useCallback } from 'react';
import { getAssetPath, clearAssetCache } from '../utils/getAssetPath';

/**
 * React hook for format-agnostic asset loading
 * 
 * @param basePath - Directory containing the asset (e.g., '/assets/cards')
 * @param imageName - Image name without extension (e.g., 'dark')
 * @param fallbackPath - Optional fallback if no image found
 */
export function useAssetPath(
    basePath: string,
    imageName: string,
    fallbackPath?: string
): string | null {
    const [resolvedPath, setResolvedPath] = useState<string | null>(null);

    const resolve = useCallback(async () => {
        // Clear cache to ensure fresh lookup
        clearAssetCache();
        const path = await getAssetPath(basePath, imageName);
        setResolvedPath(path ?? fallbackPath ?? null);
    }, [basePath, imageName, fallbackPath]);

    useEffect(() => {
        resolve();
    }, [resolve]);

    return resolvedPath;
}
