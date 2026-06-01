"use client";
import { createContext, useContext } from "react";
//#region src/ui/tooltip/context.tsx
const TooltipContext = createContext(null);
const TooltipContextProvider = TooltipContext.Provider;
function useTooltipContext() {
	const ctx = useContext(TooltipContext);
	if (!ctx) throw new Error("Tooltip compound components must be used within a Tooltip.Root");
	return ctx;
}
function useOptionalTooltipContext() {
	return useContext(TooltipContext);
}
//#endregion
export { TooltipContextProvider, useOptionalTooltipContext, useTooltipContext };

//# sourceMappingURL=context.js.map