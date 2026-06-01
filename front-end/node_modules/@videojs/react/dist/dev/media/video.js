"use client";
import { useComposedRefs } from "../utils/use-composed-refs.js";
import { useMediaAttach } from "../player/context.js";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/media/video.tsx
const Video = forwardRef(function Video({ children, ...props }, ref) {
	return /* @__PURE__ */ jsx("video", {
		ref: useComposedRefs(ref, useMediaAttach()),
		...props,
		children
	});
});
//#endregion
export { Video };

//# sourceMappingURL=video.js.map