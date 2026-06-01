"use client";
import { renderElement } from "../../utils/use-render.js";
import { usePopoverContext } from "./context.js";
import { forwardRef, useCallback } from "react";
import { supportsAnchorPositioning } from "@videojs/utils/dom";
//#region src/ui/popover/popover-trigger.tsx
/** Button that toggles the popover visibility. Renders a `<button>` element. */
const PopoverTrigger = forwardRef(function PopoverTrigger({ render, className, style, ...elementProps }, forwardedRef) {
	const { core, popover, state, stateAttrMap, anchorName, popupId } = usePopoverContext();
	const triggerRef = useCallback((el) => {
		popover.setTriggerElement(el);
		if (el && supportsAnchorPositioning()) el.style.setProperty("anchor-name", `--${anchorName}`);
	}, [popover, anchorName]);
	const { onFocusIn, onFocusOut, ...restTriggerProps } = popover.triggerProps;
	return renderElement("button", {
		render,
		className,
		style
	}, {
		state,
		stateAttrMap,
		ref: [forwardedRef, triggerRef],
		props: [
			{
				type: "button",
				...core.getTriggerAttrs(state, popupId)
			},
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
export { PopoverTrigger };

//# sourceMappingURL=popover-trigger.js.map