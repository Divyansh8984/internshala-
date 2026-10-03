import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect warns during SSR; this resolves to useEffect on the server.
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
