"use client";
import { createContext, useContext } from "react";
//#region src/ui/tooltip/group-context.tsx
const TooltipGroupContext = createContext(null);
const TooltipGroupContextProvider = TooltipGroupContext.Provider;
/** Returns the nearest `TooltipGroupCore`, or `undefined` when used outside a `Tooltip.Provider`. */
function useTooltipGroup() {
	return useContext(TooltipGroupContext)?.group;
}
//#endregion
export { TooltipGroupContextProvider, useTooltipGroup };

//# sourceMappingURL=group-context.js.map