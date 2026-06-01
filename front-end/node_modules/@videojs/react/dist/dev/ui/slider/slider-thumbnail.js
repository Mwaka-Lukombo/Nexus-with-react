"use client";
import { useSliderContext } from "./context.js";
import { Thumbnail } from "../thumbnail/thumbnail.js";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/ui/slider/slider-thumbnail.tsx
const SliderThumbnail = forwardRef(function SliderThumbnail(componentProps, forwardedRef) {
	const { pointerValue } = useSliderContext();
	return /* @__PURE__ */ jsx(Thumbnail, {
		ref: forwardedRef,
		...componentProps,
		time: pointerValue
	});
});
//#endregion
export { SliderThumbnail };

//# sourceMappingURL=slider-thumbnail.js.map