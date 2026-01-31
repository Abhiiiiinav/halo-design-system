"use client";
import { ImageDithering } from "@paper-design/shaders-react";
import type { FC } from "react";

interface DitherShaderProps {
    src: string;
    gridSize?: number;
    ditherMode?: "bayer" | "8x8" | "4x4";
    colorMode?: "duotone" | "grayscale";
    primaryColor?: string;
    secondaryColor?: string;
    threshold?: number;
    className?: string;
}

export const DitherShader: FC<DitherShaderProps> = ({
    src,
    gridSize = 1,
    ditherMode = "bayer",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    colorMode = "duotone",
    primaryColor = "#000",
    secondaryColor = "#fff",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    threshold = 0.5,
    className = "",
}) => {
    // Map props to the underlying library props
    // ditherMode 'bayer' usually corresponds to standard ordered dither like '8x8' in some libs,
    // we'll default to '8x8' if bayer is passed, or pass through if it matches known types.
    const type = ditherMode === "bayer" ? "8x8" : ditherMode;

    return (
        <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
            <ImageDithering
                image={src}
                type={type as any} // Cast to any to satisfy library types if strict
                size={gridSize}
                colorFront={primaryColor}
                colorBack={secondaryColor}
                // Use secondary/highlight roughly if needed, usually colorBack is background
                colorHighlight={primaryColor}
                colorSteps={2} // Duotone implies 2 steps
                scale={1} // Default scale
                fit="cover"
                className="w-full h-full object-cover"
                originalColors={false}
            />
        </div>
    );
};
