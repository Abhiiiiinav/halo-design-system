import { useState, useEffect } from 'react';
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

    useEffect(() => {
        let mounted = true;
        const resolve = async () => {
            clearAssetCache();
            const path = await getAssetPath(basePath, imageName);
            if (mounted) {
                setResolvedPath(path ?? fallbackPath ?? null);
            }
        };
        resolve();
        return () => { mounted = false; };
    }, [basePath, imageName, fallbackPath]);

    return resolvedPath;
}
