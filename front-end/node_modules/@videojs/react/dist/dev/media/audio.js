"use client";
import { useComposedRefs } from "../utils/use-composed-refs.js";
import { useMediaAttach } from "../player/context.js";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/media/audio.tsx
const Audio = forwardRef(function Audio({ children, ...props }, ref) {
	return /* @__PURE__ */ jsx("audio", {
		ref: useComposedRefs(ref, useMediaAttach()),
		...props,
		children
	});
});
//#endregion
export { Audio };

//# sourceMappingURL=audio.js.map