"use client";
import { useAlertDialogContext } from "./context.js";
import { createContextPart } from "../create-context-part.js";
//#region src/ui/alert-dialog/alert-dialog-title.tsx
const AlertDialogTitle = createContextPart({
	displayName: "AlertDialogTitle",
	tag: "h2",
	useContext: useAlertDialogContext,
	getProps: (state) => ({ id: state.titleId })
});
//#endregion
export { AlertDialogTitle };

//# sourceMappingURL=alert-dialog-title.js.map