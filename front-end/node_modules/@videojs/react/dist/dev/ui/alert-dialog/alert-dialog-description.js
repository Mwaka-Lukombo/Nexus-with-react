"use client";
import { useAlertDialogContext } from "./context.js";
import { createContextPart } from "../create-context-part.js";
//#region src/ui/alert-dialog/alert-dialog-description.tsx
const AlertDialogDescription = createContextPart({
	displayName: "AlertDialogDescription",
	tag: "p",
	useContext: useAlertDialogContext,
	getProps: (state) => ({ id: state.descriptionId })
});
//#endregion
export { AlertDialogDescription };

//# sourceMappingURL=alert-dialog-description.js.map