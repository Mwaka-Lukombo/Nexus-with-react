"use client";
import { renderElement } from "../../utils/use-render.js";
import { useTooltipContext } from "./context.js";
import { forwardRef, useCallback } from "react";
import { supportsAnchorPositioning } from "@videojs/utils/dom";
//#region src/ui/tooltip/tooltip-trigger.tsx
/** Element that triggers the tooltip on hover and focus. Renders a `<button>` element. */
const TooltipTrigger = forwardRef(function TooltipTrigger({ render, className, style, ...elementProps }, forwardedRef) {
	const { tooltip, state, stateAttrMap, anchorName } = useTooltipContext();
	const triggerRef = useCallback((el) => {
		tooltip.setTriggerElement(el);
		if (el && supportsAnchorPositioning()) el.style.setProperty("anchor-name", `--${anchorName}`);
	}, [tooltip, anchorName]);
	const { onFocusIn, onFocusOut, ...restTriggerProps } = tooltip.triggerProps;
	return renderElement("button", {
		render,
		className,
		style
	}, {
		state,
		stateAttrMap,
		ref: [forwardedRef, triggerRef],
		props: [
			{ type: "button" },
			{
				...restTriggerProps,
				onFocus: onFocusIn,
				onBlur: onFocusOut
			},
			elementProps
		]
	});
});
//#endregion
export { TooltipTrigger };

//# sourceMappingURL=tooltip-trigger.js.map