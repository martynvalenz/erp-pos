import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
// const TABLET_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 1200;
const LG_DESKTOP = 1285;
const XL_DESKTOP = 1800;

export function useViewport() {
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return {
    width,
    isMobile: width !== undefined && width < MOBILE_BREAKPOINT,
    isTablet:
      width !== undefined &&
      width >= MOBILE_BREAKPOINT &&
      width < TABLET_BREAKPOINT,
    isDesktop: width !== undefined && width >= LG_DESKTOP,
    isXL: width !== undefined && width >= XL_DESKTOP,
  };
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTablet;
}

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${LG_DESKTOP - 1}px)`);
    const onChange = () => {
      setIsDesktop(window.innerWidth < LG_DESKTOP);
    };
    mql.addEventListener("change", onChange);
    setIsDesktop(window.innerWidth < LG_DESKTOP);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !isDesktop;
};

export const useIsXL = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${XL_DESKTOP - 1}px)`);
    const onChange = () => {
      setIsDesktop(window.innerWidth < XL_DESKTOP);
    };
    mql.addEventListener("change", onChange);
    setIsDesktop(window.innerWidth < XL_DESKTOP);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !isDesktop;
};
