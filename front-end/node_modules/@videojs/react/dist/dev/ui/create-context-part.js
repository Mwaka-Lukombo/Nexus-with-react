"use client";
import { renderElement } from "../utils/use-render.js";
import { forwardRef } from "react";
//#region src/ui/create-context-part.tsx
function createContextPart(config) {
	const { displayName, tag, useContext, staticProps, getProps } = config;
	const Component = forwardRef(function ContextPart(componentProps, forwardedRef) {
		const { render, className, style, ...elementProps } = componentProps;
		const context = useContext();
		const dynamicProps = getProps?.(context.state);
		return renderElement(tag, {
			render,
			className,
			style
		}, {
			state: context.state,
			stateAttrMap: context.stateAttrMap,
			ref: forwardedRef,
			props: [
				staticProps,
				dynamicProps,
				elementProps
			].filter(Boolean)
		});
	});
	Component.displayName = displayName;
	return Component;
}
//#endregion
export { createContextPart };

//# sourceMappingURL=create-context-part.js.map