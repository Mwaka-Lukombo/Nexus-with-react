"use client";
import { renderElement } from "../../utils/use-render.js";
import { useSliderContext } from "./context.js";
import { getSliderPreviewStyle } from "@videojs/core/dom";
import { forwardRef, useEffect, useRef, useState } from "react";
//#region src/ui/slider/slider-preview.tsx
/** Positioning container for preview content that tracks the pointer along the slider. */
const SliderPreview = forwardRef(function SliderPreview(componentProps, forwardedRef) {
	const { render, className, style, overflow = "clamp", ...elementProps } = componentProps;
	const context = useSliderContext();
	const { state } = context;
	const measureRef = useRef(null);
	const [width, setWidth] = useState(0);
	useEffect(() => {
		const el = measureRef.current;
		if (!el) return;
		const observer = new ResizeObserver(([entry]) => {
			setWidth(entry.contentRect.width);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	const positionStyle = getSliderPreviewStyle(width, overflow);
	return renderElement("div", {
		render,
		className,
		style
	}, {
		state,
		stateAttrMap: context.stateAttrMap,
		ref: [forwardedRef, measureRef],
		props: [{ style: positionStyle }, elementProps]
	});
});
//#endregion
export { SliderPreview };

//# sourceMappingURL=slider-preview.js.map