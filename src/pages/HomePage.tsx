import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dithering, LiquidMetal } from '@paper-design/shaders-react';
import MissionCard from '../components/MissionCard';
import DitherCard from '../components/DitherCard';
import './HomePage.css';

gsap.registerPlugin(ScrollTrigger);

// Header Logo with Liquid Metal effect - same pattern as HaloLogo but sized for header
function HeaderLogo() {
    const logoRef = useRef<SVGSVGElement>(null);
    const [scale, setScale] = useState(0.015); // Smaller default for header

    useEffect(() => {
        if (!logoRef.current) return;

        const calculateScale = () => {
            if (!logoRef.current) return;
            // Use offsetWidth which is cheaper than getBoundingClientRect regarding reflows if possible, 
            // but sticking to logic: current used getBoundingClientRect.
            // ResizeObserverEntry provides contentRect usually, but let's keep logic identical to ensure NO visual change.
            const logoWidth = logoRef.current.getBoundingClientRect().width;
            // O letter inner is ~12% of logo width, shader is 800px
            const oLetterInnerWidth = logoWidth * 0.12;
            setScale(oLetterInnerWidth / 800);
        };

        // Initial calculation
        calculateScale();

        const resizeObserver = new ResizeObserver(() => {
            calculateScale();
        });

        resizeObserver.observe(logoRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div className="header-logo-wrapper">
            <svg
                ref={logoRef}
                className="header-logo-svg"
                width="100"
                height="28"
                viewBox="0 0 168 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M4.42 37.683V6.52C4.42 5.12 3.72 4.42 2.321 4.42H2.1C0.7 4.42 7.825e-05 3.72 7.825e-05 2.321V2.1C7.825e-05 0.7 0.7 1.707e-06 2.1 1.707e-06H11.161C12.561 1.707e-06 13.261 0.7 13.261 2.1V2.321C13.261 3.72 12.561 4.42 11.161 4.42H10.94C9.541 4.42 8.841 5.12 8.841 6.52V15.471C8.841 16.097 9.052 16.622 9.476 17.046C9.9 17.469 10.425 17.681 11.051 17.681H28.732C29.377 17.681 29.901 17.469 30.307 17.046C30.73 16.622 30.942 16.097 30.942 15.471V6.52C30.942 5.12 30.242 4.42 28.843 4.42H28.622C27.222 4.42 26.522 3.72 26.522 2.321V2.1C26.522 0.7 27.222 1.707e-06 28.622 1.707e-06H37.683C39.083 1.707e-06 39.783 0.7 39.783 2.1V2.321C39.783 3.72 39.083 4.42 37.683 4.42H37.462C36.062 4.42 35.362 5.12 35.362 6.52V37.683C35.362 39.083 36.062 39.783 37.462 39.783H37.683C39.083 39.783 39.783 40.483 39.783 41.882V42.103C39.783 43.503 39.083 44.203 37.683 44.203H28.622C27.222 44.203 26.522 43.503 26.522 42.103V41.882C26.522 40.483 27.222 39.783 28.622 39.783H28.843C30.242 39.783 30.942 39.083 30.942 37.683V24.312C30.942 23.667 30.73 23.142 30.307 22.737C29.901 22.313 29.377 22.102 28.732 22.102H11.051C10.425 22.102 9.9 22.313 9.476 22.737C9.052 23.142 8.841 23.667 8.841 24.312V37.683C8.841 39.083 9.541 39.783 10.94 39.783H11.161C12.561 39.783 13.261 40.483 13.261 41.882V42.103C13.261 43.503 12.561 44.203 11.161 44.203H2.1C0.7 44.203 7.825e-05 43.503 7.825e-05 42.103V41.882C7.825e-05 40.483 0.7 39.783 2.1 39.783H2.321C3.72 39.783 4.42 39.083 4.42 37.683ZM75.138 33.152C75.138 32.508 74.926 31.983 74.503 31.577C74.097 31.154 73.573 30.942 72.928 30.942H55.247C54.621 30.942 54.096 31.154 53.672 31.577C53.248 31.983 53.037 32.508 53.037 33.152V37.572C53.037 38.199 53.248 38.724 53.672 39.147C54.096 39.571 54.621 39.783 55.247 39.783H55.357C56.757 39.783 57.457 40.483 57.457 41.882V42.103C57.457 43.503 56.757 44.203 55.357 44.203H46.296C44.896 44.203 44.196 43.503 44.196 42.103V41.882C44.196 40.483 44.896 39.783 46.296 39.783H46.406C47.051 39.783 47.576 39.571 47.981 39.147C48.405 38.724 48.616 38.199 48.616 37.572V33.042C48.616 31.642 49.316 30.942 50.716 30.942H50.827C51.471 30.942 51.996 30.73 52.401 30.307C52.825 29.883 53.037 29.358 53.037 28.732V19.781C53.037 18.381 53.736 17.681 55.136 17.681H55.247C55.891 17.681 56.416 17.469 56.822 17.046C57.245 16.622 57.457 16.097 57.457 15.471V10.94C57.457 9.54 58.157 8.841 59.557 8.841H59.667C60.312 8.841 60.837 8.629 61.242 8.205C61.665 7.782 61.877 7.257 61.877 6.63V2.1C61.877 0.7 62.577 1.707e-06 63.977 1.707e-06H64.198C65.598 1.707e-06 66.297 0.7 66.297 2.1V6.63C66.297 7.257 66.509 7.782 66.933 8.205C67.356 8.629 67.882 8.841 68.508 8.841H68.618C70.018 8.841 70.718 9.54 70.718 10.94V15.471C70.718 16.097 70.93 16.622 71.353 17.046C71.777 17.469 72.302 17.681 72.928 17.681H73.038C74.438 17.681 75.138 18.381 75.138 19.781V28.732C75.138 29.358 75.35 29.883 75.773 30.307C76.197 30.73 76.722 30.942 77.348 30.942H77.459C78.859 30.942 79.558 31.642 79.558 33.042V37.572C79.558 38.199 79.77 38.724 80.194 39.147C80.617 39.571 81.142 39.783 81.769 39.783H81.879C83.279 39.783 83.979 40.483 83.979 41.882V42.103C83.979 43.503 83.279 44.203 81.879 44.203H72.817C71.418 44.203 70.718 43.503 70.718 42.103V41.882C70.718 40.483 71.418 39.783 72.817 39.783H72.928C73.573 39.783 74.097 39.571 74.503 39.147C74.926 38.724 75.138 38.199 75.138 37.572V33.152ZM70.718 19.891C70.718 19.247 70.506 18.722 70.082 18.317C69.677 17.893 69.152 17.681 68.508 17.681H68.397C66.997 17.681 66.297 16.981 66.297 15.582V11.051C66.297 10.406 66.086 9.881 65.662 9.476C65.257 9.052 64.732 8.841 64.087 8.841C63.461 8.841 62.936 9.052 62.513 9.476C62.089 9.881 61.877 10.406 61.877 11.051V15.582C61.877 16.981 61.177 17.681 59.778 17.681H59.667C59.041 17.681 58.516 17.893 58.092 18.317C57.669 18.722 57.457 19.247 57.457 19.891V24.312C57.457 24.938 57.669 25.463 58.092 25.886C58.516 26.31 59.041 26.522 59.667 26.522H68.508C69.152 26.522 69.677 26.31 70.082 25.886C70.506 25.463 70.718 24.938 70.718 24.312V19.891ZM92.812 37.683V6.52C92.812 5.12 92.112 4.42 90.713 4.42H90.492C89.092 4.42 88.392 3.72 88.392 2.321V2.1C88.392 0.7 89.092 1.707e-06 90.492 1.707e-06H103.974C105.373 1.707e-06 106.073 0.7 106.073 2.1V2.321C106.073 3.72 105.373 4.42 103.974 4.42H99.443C98.817 4.42 98.292 4.632 97.868 5.056C97.444 5.461 97.233 5.986 97.233 6.63V37.572C97.233 38.199 97.444 38.724 97.868 39.147C98.292 39.571 98.817 39.783 99.443 39.783H112.704C113.348 39.783 113.873 39.571 114.278 39.147C114.702 38.724 114.914 38.199 114.914 37.572V37.462C114.914 36.062 115.614 35.362 117.013 35.362H117.124C117.787 35.362 118.284 35.169 118.616 34.782C118.947 34.377 119.113 33.87 119.113 33.263V33.042C119.113 32.379 119.334 31.826 119.776 31.384C120.218 30.942 120.771 30.721 121.434 30.721H121.655C122.318 30.721 122.87 30.942 123.312 31.384C123.754 31.826 123.975 32.379 123.975 33.042V33.263C123.975 33.926 123.754 34.478 123.312 34.92C122.87 35.362 122.318 35.583 121.655 35.583H121.434C120.826 35.583 120.319 35.749 119.914 36.081C119.527 36.412 119.334 36.909 119.334 37.572V41.993C119.334 42.656 119.131 43.19 118.726 43.595C118.321 44 117.787 44.203 117.124 44.203H90.492C89.092 44.203 88.392 43.503 88.392 42.103V41.882C88.392 40.483 89.092 39.783 90.492 39.783H90.713C92.112 39.783 92.812 39.083 92.812 37.683ZM132.384 37.462C132.384 36.854 132.219 36.357 131.887 35.97C131.555 35.565 131.058 35.362 130.395 35.362H130.285C128.885 35.362 128.185 34.662 128.185 33.263V10.94C128.185 9.54 128.885 8.841 130.285 8.841H130.395C131.058 8.841 131.555 8.647 131.887 8.26C132.219 7.855 132.384 7.349 132.384 6.741V6.52C132.384 5.857 132.605 5.304 133.047 4.862C133.489 4.42 134.042 4.199 134.705 4.199H134.926C135.534 4.199 136.031 4.034 136.418 3.702C136.823 3.37 137.026 2.873 137.026 2.21V2.1C137.026 0.7 137.725 1.707e-06 139.125 1.707e-06H157.027C158.427 1.707e-06 159.127 0.7 159.127 2.1V2.21C159.127 2.873 159.32 3.37 159.707 3.702C160.112 4.034 160.619 4.199 161.227 4.199H161.448C162.111 4.199 162.663 4.42 163.105 4.862C163.547 5.304 163.768 5.857 163.768 6.52V6.741C163.768 7.349 163.934 7.855 164.266 8.26C164.597 8.647 165.094 8.841 165.757 8.841H165.868C167.268 8.841 167.968 9.54 167.968 10.94V33.263C167.968 34.662 167.268 35.362 165.868 35.362H165.757C165.094 35.362 164.597 35.565 164.266 35.97C163.934 36.357 163.768 36.854 163.768 37.462V37.683C163.768 38.346 163.547 38.899 163.105 39.341C162.663 39.783 162.111 40.004 161.448 40.004H161.227C160.619 40.004 160.112 40.169 159.707 40.501C159.32 40.832 159.127 41.33 159.127 41.993V42.103C159.127 43.503 158.427 44.203 157.027 44.203H139.125C137.725 44.203 137.026 43.503 137.026 42.103V41.993C137.026 41.33 136.823 40.832 136.418 40.501C136.031 40.169 135.534 40.004 134.926 40.004H134.705C134.042 40.004 133.489 39.783 133.047 39.341C132.605 38.899 132.384 38.346 132.384 37.683V37.462ZM137.247 37.683C137.247 38.291 137.412 38.797 137.744 39.203C138.075 39.589 138.573 39.783 139.236 39.783H156.917C157.58 39.783 158.077 39.589 158.409 39.203C158.74 38.797 158.906 38.291 158.906 37.683V37.462C158.906 36.799 159.127 36.246 159.569 35.804C160.011 35.362 160.564 35.141 161.227 35.141H161.448C162.055 35.141 162.553 34.975 162.94 34.644C163.345 34.313 163.547 33.815 163.547 33.152V11.051C163.547 10.388 163.345 9.89 162.94 9.559C162.553 9.227 162.055 9.062 161.448 9.062H161.227C160.564 9.062 160.011 8.841 159.569 8.399C159.127 7.957 158.906 7.404 158.906 6.741V6.52C158.906 5.912 158.74 5.415 158.409 5.028C158.077 4.623 157.58 4.42 156.917 4.42H139.236C138.573 4.42 138.075 4.623 137.744 5.028C137.412 5.415 137.247 5.912 137.247 6.52V6.741C137.247 7.404 137.026 7.957 136.584 8.399C136.142 8.841 135.589 9.062 134.926 9.062H134.705C134.097 9.062 133.591 9.227 133.185 9.559C132.799 9.89 132.605 10.388 132.605 11.051V33.152C132.605 33.815 132.799 34.313 133.185 34.644C133.591 34.975 134.097 35.141 134.705 35.141H134.926C135.589 35.141 136.142 35.362 136.584 35.804C137.026 36.246 137.247 36.799 137.247 37.462V37.683Z" fill="#274029" />
            </svg>
            <LiquidMetal
                speed={1}
                softness={0.1}
                repetition={2}
                shiftRed={0}
                shiftBlue={0}
                distortion={0.07}
                contour={0.4}
                scale={1}
                rotation={0}
                shape="diamond"
                angle={0}
                image="https://workers.paper.design/file-assets/01KG85R3HYDAAEWD7AE7ZCGNTF/01KG812P9Q3TZH32MBX86NF9M5.svg"
                frame={4543891.499999572}
                colorBack="#00000000"
                colorTint="#274029"
                className="header-liquid-metal"
                style={{
                    transform: `translate(-50%, -50%) scale(${scale})`
                }}
            />
        </div>
    );
}

// Dither transition with sage-to-black colors
function DitherTransition() {
    return (
        <div className="dither-transition">
            <Dithering
                speed={0.5}
                shape="wave"
                type="4x4"
                size={3}
                scale={1.2}
                frame={0}
                colorBack="#F4F7EE"
                colorFront="#000000"
                className="dither-transition-canvas"
            />
        </div>
    );
}

// Large footer logo - subtle watermark style
function FooterLogo() {
    return (
        <svg viewBox="0 0 168 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-logo-watermark">
            <path d="M4.42 37.683V6.52C4.42 5.12 3.72 4.42 2.321 4.42H2.1C0.7 4.42 7.825e-05 3.72 7.825e-05 2.321V2.1C7.825e-05 0.7 0.7 1.707e-06 2.1 1.707e-06H11.161C12.561 1.707e-06 13.261 0.7 13.261 2.1V2.321C13.261 3.72 12.561 4.42 11.161 4.42H10.94C9.541 4.42 8.841 5.12 8.841 6.52V15.471C8.841 16.097 9.052 16.622 9.476 17.046C9.9 17.469 10.425 17.681 11.051 17.681H28.732C29.377 17.681 29.901 17.469 30.307 17.046C30.73 16.622 30.942 16.097 30.942 15.471V6.52C30.942 5.12 30.242 4.42 28.843 4.42H28.622C27.222 4.42 26.522 3.72 26.522 2.321V2.1C26.522 0.7 27.222 1.707e-06 28.622 1.707e-06H37.683C39.083 1.707e-06 39.783 0.7 39.783 2.1V2.321C39.783 3.72 39.083 4.42 37.683 4.42H37.462C36.062 4.42 35.362 5.12 35.362 6.52V37.683C35.362 39.083 36.062 39.783 37.462 39.783H37.683C39.083 39.783 39.783 40.483 39.783 41.882V42.103C39.783 43.503 39.083 44.203 37.683 44.203H28.622C27.222 44.203 26.522 43.503 26.522 42.103V41.882C26.522 40.483 27.222 39.783 28.622 39.783H28.843C30.242 39.783 30.942 39.083 30.942 37.683V24.312C30.942 23.667 30.73 23.142 30.307 22.737C29.901 22.313 29.377 22.102 28.732 22.102H11.051C10.425 22.102 9.9 22.313 9.476 22.737C9.052 23.142 8.841 23.667 8.841 24.312V37.683C8.841 39.083 9.541 39.783 10.94 39.783H11.161C12.561 39.783 13.261 40.483 13.261 41.882V42.103C13.261 43.503 12.561 44.203 11.161 44.203H2.1C0.7 44.203 7.825e-05 43.503 7.825e-05 42.103V41.882C7.825e-05 40.483 0.7 39.783 2.1 39.783H2.321C3.72 39.783 4.42 39.083 4.42 37.683ZM75.138 33.152C75.138 32.508 74.926 31.983 74.503 31.577C74.097 31.154 73.573 30.942 72.928 30.942H55.247C54.621 30.942 54.096 31.154 53.672 31.577C53.248 31.983 53.037 32.508 53.037 33.152V37.572C53.037 38.199 53.248 38.724 53.672 39.147C54.096 39.571 54.621 39.783 55.247 39.783H55.357C56.757 39.783 57.457 40.483 57.457 41.882V42.103C57.457 43.503 56.757 44.203 55.357 44.203H46.296C44.896 44.203 44.196 43.503 44.196 42.103V41.882C44.196 40.483 44.896 39.783 46.296 39.783H46.406C47.051 39.783 47.576 39.571 47.981 39.147C48.405 38.724 48.616 38.199 48.616 37.572V33.042C48.616 31.642 49.316 30.942 50.716 30.942H50.827C51.471 30.942 51.996 30.73 52.401 30.307C52.825 29.883 53.037 29.358 53.037 28.732V19.781C53.037 18.381 53.736 17.681 55.136 17.681H55.247C55.891 17.681 56.416 17.469 56.822 17.046C57.245 16.622 57.457 16.097 57.457 15.471V10.94C57.457 9.54 58.157 8.841 59.557 8.841H59.667C60.312 8.841 60.837 8.629 61.242 8.205C61.665 7.782 61.877 7.257 61.877 6.63V2.1C61.877 0.7 62.577 1.707e-06 63.977 1.707e-06H64.198C65.598 1.707e-06 66.297 0.7 66.297 2.1V6.63C66.297 7.257 66.509 7.782 66.933 8.205C67.356 8.629 67.882 8.841 68.508 8.841H68.618C70.018 8.841 70.718 9.54 70.718 10.94V15.471C70.718 16.097 70.93 16.622 71.353 17.046C71.777 17.469 72.302 17.681 72.928 17.681H73.038C74.438 17.681 75.138 18.381 75.138 19.781V28.732C75.138 29.358 75.35 29.883 75.773 30.307C76.197 30.73 76.722 30.942 77.348 30.942H77.459C78.859 30.942 79.558 31.642 79.558 33.042V37.572C79.558 38.199 79.77 38.724 80.194 39.147C80.617 39.571 81.142 39.783 81.769 39.783H81.879C83.279 39.783 83.979 40.483 83.979 41.882V42.103C83.979 43.503 83.279 44.203 81.879 44.203H72.817C71.418 44.203 70.718 43.503 70.718 42.103V41.882C70.718 40.483 71.418 39.783 72.817 39.783H72.928C73.573 39.783 74.097 39.571 74.503 39.147C74.926 38.724 75.138 38.199 75.138 37.572V33.152ZM70.718 19.891C70.718 19.247 70.506 18.722 70.082 18.317C69.677 17.893 69.152 17.681 68.508 17.681H68.397C66.997 17.681 66.297 16.981 66.297 15.582V11.051C66.297 10.406 66.086 9.881 65.662 9.476C65.257 9.052 64.732 8.841 64.087 8.841C63.461 8.841 62.936 9.052 62.513 9.476C62.089 9.881 61.877 10.406 61.877 11.051V15.582C61.877 16.981 61.177 17.681 59.778 17.681H59.667C59.041 17.681 58.516 17.893 58.092 18.317C57.669 18.722 57.457 19.247 57.457 19.891V24.312C57.457 24.938 57.669 25.463 58.092 25.886C58.516 26.31 59.041 26.522 59.667 26.522H68.508C69.152 26.522 69.677 26.31 70.082 25.886C70.506 25.463 70.718 24.938 70.718 24.312V19.891ZM92.812 37.683V6.52C92.812 5.12 92.112 4.42 90.713 4.42H90.492C89.092 4.42 88.392 3.72 88.392 2.321V2.1C88.392 0.7 89.092 1.707e-06 90.492 1.707e-06H103.974C105.373 1.707e-06 106.073 0.7 106.073 2.1V2.321C106.073 3.72 105.373 4.42 103.974 4.42H99.443C98.817 4.42 98.292 4.632 97.868 5.056C97.444 5.461 97.233 5.986 97.233 6.63V37.572C97.233 38.199 97.444 38.724 97.868 39.147C98.292 39.571 98.817 39.783 99.443 39.783H112.704C113.348 39.783 113.873 39.571 114.278 39.147C114.702 38.724 114.914 38.199 114.914 37.572V37.462C114.914 36.062 115.614 35.362 117.013 35.362H117.124C117.787 35.362 118.284 35.169 118.616 34.782C118.947 34.377 119.113 33.87 119.113 33.263V33.042C119.113 32.379 119.334 31.826 119.776 31.384C120.218 30.942 120.771 30.721 121.434 30.721H121.655C122.318 30.721 122.87 30.942 123.312 31.384C123.754 31.826 123.975 32.379 123.975 33.042V33.263C123.975 33.926 123.754 34.478 123.312 34.92C122.87 35.362 122.318 35.583 121.655 35.583H121.434C120.826 35.583 120.319 35.749 119.914 36.081C119.527 36.412 119.334 36.909 119.334 37.572V41.993C119.334 42.656 119.131 43.19 118.726 43.595C118.321 44 117.787 44.203 117.124 44.203H90.492C89.092 44.203 88.392 43.503 88.392 42.103V41.882C88.392 40.483 89.092 39.783 90.492 39.783H90.713C92.112 39.783 92.812 39.083 92.812 37.683ZM132.384 37.462C132.384 36.854 132.219 36.357 131.887 35.97C131.555 35.565 131.058 35.362 130.395 35.362H130.285C128.885 35.362 128.185 34.662 128.185 33.263V10.94C128.185 9.54 128.885 8.841 130.285 8.841H130.395C131.058 8.841 131.555 8.647 131.887 8.26C132.219 7.855 132.384 7.349 132.384 6.741V6.52C132.384 5.857 132.605 5.304 133.047 4.862C133.489 4.42 134.042 4.199 134.705 4.199H134.926C135.534 4.199 136.031 4.034 136.418 3.702C136.823 3.37 137.026 2.873 137.026 2.21V2.1C137.026 0.7 137.725 1.707e-06 139.125 1.707e-06H157.027C158.427 1.707e-06 159.127 0.7 159.127 2.1V2.21C159.127 2.873 159.32 3.37 159.707 3.702C160.112 4.034 160.619 4.199 161.227 4.199H161.448C162.111 4.199 162.663 4.42 163.105 4.862C163.547 5.304 163.768 5.857 163.768 6.52V6.741C163.768 7.349 163.934 7.855 164.266 8.26C164.597 8.647 165.094 8.841 165.757 8.841H165.868C167.268 8.841 167.968 9.54 167.968 10.94V33.263C167.968 34.662 167.268 35.362 165.868 35.362H165.757C165.094 35.362 164.597 35.565 164.266 35.97C163.934 36.357 163.768 36.854 163.768 37.462V37.683C163.768 38.346 163.547 38.899 163.105 39.341C162.663 39.783 162.111 40.004 161.448 40.004H161.227C160.619 40.004 160.112 40.169 159.707 40.501C159.32 40.832 159.127 41.33 159.127 41.993V42.103C159.127 43.503 158.427 44.203 157.027 44.203H139.125C137.725 44.203 137.026 43.503 137.026 42.103V41.993C137.026 41.33 136.823 40.832 136.418 40.501C136.031 40.169 135.534 40.004 134.926 40.004H134.705C134.042 40.004 133.489 39.783 133.047 39.341C132.605 38.899 132.384 38.346 132.384 37.683V37.462ZM137.247 37.683C137.247 38.291 137.412 38.797 137.744 39.203C138.075 39.589 138.573 39.783 139.236 39.783H156.917C157.58 39.783 158.077 39.589 158.409 39.203C158.74 38.797 158.906 38.291 158.906 37.683V37.462C158.906 36.799 159.127 36.246 159.569 35.804C160.011 35.362 160.564 35.141 161.227 35.141H161.448C162.055 35.141 162.553 34.975 162.94 34.644C163.345 34.313 163.547 33.815 163.547 33.152V11.051C163.547 10.388 163.345 9.89 162.94 9.559C162.553 9.227 162.055 9.062 161.448 9.062H161.227C160.564 9.062 160.011 8.841 159.569 8.399C159.127 7.957 158.906 7.404 158.906 6.741V6.52C158.906 5.912 158.74 5.415 158.409 5.028C158.077 4.623 157.58 4.42 156.917 4.42H139.236C138.573 4.42 138.075 4.623 137.744 5.028C137.412 5.415 137.247 5.912 137.247 6.52V6.741C137.247 7.404 137.026 7.957 136.584 8.399C136.142 8.841 135.589 9.062 134.926 9.062H134.705C134.097 9.062 133.591 9.227 133.185 9.559C132.799 9.89 132.605 10.388 132.605 11.051V33.152C132.605 33.815 132.799 34.313 133.185 34.644C133.591 34.975 134.097 35.141 134.705 35.141H134.926C135.589 35.141 136.142 35.362 136.584 35.804C137.026 36.246 137.247 36.799 137.247 37.462V37.683Z" fill="currentColor" />
        </svg>
    );
}


// Social icons removed

function NewsletterForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already_subscribed'>('idle');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error'); // Could separate validation error
            return;
        }

        setStatus('loading');

        try {
            const { supabase } = await import('../lib/supabase');

            const { error } = await supabase
                .from('subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Unique violation
                    setStatus('already_subscribed');
                } else {
                    console.error('Supabase error:', error);
                    setStatus('error');
                }
            } else {
                setStatus('success');
                setEmail('');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setStatus('error');
        }
    };

    return (
        <div className="newsletter-container">
            <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="Enter your email…"
                    className="newsletter-input"
                    required
                    disabled={status === 'loading' || status === 'success'}
                />
                <button
                    type="submit"
                    className="newsletter-button"
                    disabled={status === 'loading' || status === 'success'}
                >
                    {status === 'loading' ? 'Signing up...' : status === 'success' ? 'Signed Up' : 'Sign Up'}
                </button>
            </form>

            {status === 'success' && (
                <p className="newsletter-feedback newsletter-feedback--success">
                    You have successfully signed up!
                </p>
            )}

            {status === 'already_subscribed' && (
                <p className="newsletter-feedback newsletter-feedback--warning">
                    You have already signed up!
                </p>
            )}

            {status === 'error' && (
                <p className="newsletter-feedback newsletter-feedback--error">
                    Something went wrong. Please try again.
                </p>
            )}
        </div>
    );
}

export default function HomePage() {
    const manifestoRef = useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Paragraph fade-in animations
            gsap.utils.toArray<HTMLElement>('.manifesto-paragraph').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Text highlight trigger
            gsap.utils.toArray<HTMLElement>('.text-highlight').forEach((el) => {
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 80%',
                    onEnter: () => el.classList.add('active')
                });
            });

            // Fade animation for each snap-section - NO blur
            gsap.utils.toArray<HTMLElement>('.snap-section').forEach((section, i) => {
                const content = section.querySelector('.snap-content');
                if (!content) return;

                // Track active section when it enters viewport
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    onEnter: () => setActiveSection(i),
                    onEnterBack: () => setActiveSection(i),
                });

                // Subtle opacity fade only - no blur
                gsap.fromTo(content,
                    { opacity: 0.4 },
                    {
                        opacity: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 70%',
                            end: 'top 30%',
                            scrub: 0.2,
                        }
                    }
                );
            });

            // Toggle Scroll Indicator Visibility
            ScrollTrigger.create({
                trigger: manifestoRef.current,
                start: 'top 60%',
                end: 'bottom 40%',
                onEnter: () => gsap.to('.scroll-indicator', { opacity: 1, autoAlpha: 1, duration: 0.3 }),
                onLeave: () => gsap.to('.scroll-indicator', { opacity: 0, autoAlpha: 0, duration: 0.3 }),
                onEnterBack: () => gsap.to('.scroll-indicator', { opacity: 1, autoAlpha: 1, duration: 0.3 }),
                onLeaveBack: () => gsap.to('.scroll-indicator', { opacity: 0, autoAlpha: 0, duration: 0.3 })
            });
        }, manifestoRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="home-page">
            {/* Global Dither Noise Overlay */}
            <div className="dither-noise-overlay" aria-hidden="true" />

            {/* Fixed Header */}
            <header className="site-header">
                <div className="halftone-overlay" aria-hidden="true" />
                <Link to="/home" className="header-brand">
                    <HeaderLogo />
                </Link>
                <nav className="header-nav">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('manifesto');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                                // Explicitly clean URL if hash exists
                                window.history.pushState("", document.title, window.location.pathname + window.location.search);
                            }
                        }}
                        className="nav-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', padding: 0 }}
                    >
                        Memo
                    </button>
                    <a href="mailto:contactus@halofy.ai" className="nav-link nav-link--cta">Contact</a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                {/* Full-screen Dithering Background */}
                <div className="hero-dither-bg" style={{ backgroundColor: '#F4F7EE' }}>
                    <div style={{ opacity: activeSection !== -1 ? 1 : 0, transition: 'opacity 1.5s ease' }}>
                        <Dithering
                            style={{ height: '100%', width: '100%' }}
                            colorBack="#F4F7EE"
                            colorFront="#A3BD6A"
                            shape="wave"
                            type="4x4"
                            size={3}
                            scale={0.8}
                            rotation={0}
                            speed={0.1}
                        />
                    </div>
                </div>
                <div className="hero-fade-bottom" />

                {/* Hero Content */}
                <div className="hero-content">
                    <h1 className="hero-title">
                        AGENTIC<br />BANKING OS
                    </h1>
                    <p className="hero-tagline">
                        Building the next gen financial rails for agentic economy
                    </p>
                </div>
            </section>

            {/* Mission Statement Card */}
            <MissionCard />

            {/* Manifesto Scroll Sections */}
            <main id="manifesto" className="manifesto-scroll" ref={manifestoRef}>
                {/* Dot Navigation Indicators */}
                <nav className="scroll-indicator" aria-label="Section navigation">
                    <ul>
                        <li><a href="#section-evolution" className={activeSection === 0 ? 'active' : ''}><span className="sr-only">Evolution of Payments</span></a></li>
                        <li><a href="#section-fragmentation" className={activeSection === 1 ? 'active' : ''}><span className="sr-only">Fragmentation Problem</span></a></li>
                        <li><a href="#section-builders" className={activeSection === 2 ? 'active' : ''}><span className="sr-only">Builders Should Build</span></a></li>
                        <li><a href="#section-halo" className={activeSection === 3 ? 'active' : ''}><span className="sr-only">Introducing Halo</span></a></li>
                    </ul>
                </nav>

                {/* Section 1: Evolution of Payments */}
                <section id="section-evolution" className="snap-section">
                    <div className="snap-content">
                        <h2 className="section-title">The Evolution of Payments</h2>

                        <div className="section-text">
                            <p className="manifesto-paragraph">
                                <strong>Era I: Physical Commerce</strong>. Cash changed hands and cards swiped at terminals, with payments tethered to physical presence.
                            </p>

                            <p className="manifesto-paragraph">
                                <strong>Era II: Digital Commerce</strong>. E-commerce moved payments online through PayPal, Stripe, and digital wallets, letting humans click "buy now" from anywhere.
                            </p>

                            <p className="manifesto-paragraph">
                                <strong>Era III: Instant & Programmable Money</strong>. QR codes, real-time networks, and stablecoins made payments faster and borderless, but still required human intent at the moment of transaction.
                            </p>

                            <p className="manifesto-paragraph">
                                <strong>Era IV: Agentic Commerce</strong>. AI agents don't wait for clicks. They negotiate, transact, and settle autonomously. McKinsey projects agentic commerce will drive <span className="text-highlight">$5 trillion in annual sales by 2030</span>. But the infrastructure isn't ready.
                            </p>

                            <p className="manifesto-paragraph manifesto-paragraph--emphasis">
                                Modern financial infrastructure is not built for the Agent Economy.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 2: The Fragmentation Problem */}
                <section id="section-fragmentation" className="snap-section">
                    <div className="snap-content">
                        <h2 className="section-title">The Fragmentation Problem</h2>

                        <div className="section-text">
                            <p className="manifesto-paragraph">
                                The agentic commerce space is fracturing before it scales. Each protocol solves part of the problem: payments, identity, settlement. Yet <span className="text-highlight">none interoperate</span>. Builders face a maze of incompatible standards: multiple SDKs, fragmented compliance requirements, no unified approach to delegated authentication, and infrastructure debt that compounds with every new protocol.
                            </p>

                            <p className="manifesto-paragraph manifesto-paragraph--emphasis">
                                The ecosystem is siloed. Builders are stuck stitching together rails that were never designed to work together.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Builders Should Build */}
                <section id="section-builders" className="snap-section">
                    <div className="snap-content">
                        <h2 className="section-title">Builders Should Build, Not Plumb</h2>

                        <div className="section-text">
                            <p className="manifesto-paragraph">
                                Agentic builders are creating the future through autonomous ticketing, AI procurement agents, voice-enabled checkouts. Their focus should be training models and perfecting user experience, <span className="text-highlight">not navigating authentication flows, managing tokenization and compliance, building reconciliation layers, or maintaining audit trails</span>.
                            </p>

                            <p className="manifesto-paragraph manifesto-paragraph--emphasis">
                                Payments and authentication are foundational, but they're not the product.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Introducing Halo */}
                <section id="section-halo" className="snap-section">
                    <div className="snap-content">
                        <DitherCard
                            title="Introducing Halo"
                            mode="agentic"
                            imageName="halopic"
                            className="intro-card"
                        />

                        <div className="section-text">
                            <p className="manifesto-paragraph manifesto-paragraph--lead">
                                A universal interoperability layer enabling merchants and agents to seamlessly connect, transact, and scale across fragmented payment ecosystems.
                            </p>

                            <p className="manifesto-paragraph">
                                For agentic builders, Halo is a one-stop solution enabling delegated authentication, identity, payments, and reconciliation between users, agents, and merchants.
                            </p>

                            <h3 className="subsection-title">What Halo provides:</h3>
                            <ul className="feature-list">
                                <li><strong>Universal entity vault</strong> for delegated authentication and identity</li>
                                <li><strong>Protocol-agnostic middleware</strong> translating between commerce standards (UCP, ACP, x402, APP)</li>
                                <li><strong>Immutable audit trail</strong> with privacy-preserving reconciliation</li>
                            </ul>

                            <p className="manifesto-paragraph manifesto-paragraph--emphasis">
                                Halo handles the complexity. Builders get a single integration point across every rail, every protocol, every ecosystem.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Email Signup */}
            <section className="newsletter">
                <h3 className="newsletter-title">Stay Updated</h3>
                <p className="newsletter-description">
                    Join our mailing list for updates about our products, insights from our team, and get early access!
                </p>
                <NewsletterForm />
            </section>

            {/* Dither Transition - Sage to Black */}
            <DitherTransition />

            {/* Footer */}
            <footer className="site-footer">
                <div className="footer-top">
                    <div className="footer-left">
                        <p className="footer-location">San Francisco, CA</p>
                        <div className="footer-contact">
                            <p className="footer-contact-label">Contact Us</p>
                            <a href="mailto:contactus@halofy.ai" className="footer-email">contactus@halofy.ai</a>
                        </div>
                    </div>
                </div>
                <div className="footer-logo-container">
                    <FooterLogo />
                </div>
            </footer>
        </div>
    );
}
