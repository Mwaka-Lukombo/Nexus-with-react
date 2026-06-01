"use client";
import { createContext, useContext } from "react";
//#region src/ui/alert-dialog/context.tsx
const AlertDialogContext = createContext(null);
const AlertDialogContextProvider = AlertDialogContext.Provider;
function useAlertDialogContext() {
	const ctx = useContext(AlertDialogContext);
	if (!ctx) throw new Error("AlertDialog compound components must be used within an AlertDialog.Root");
	return ctx;
}
//#endregion
export { AlertDialogContextProvider, useAlertDialogContext };

//# sourceMappingURL=context.js.map