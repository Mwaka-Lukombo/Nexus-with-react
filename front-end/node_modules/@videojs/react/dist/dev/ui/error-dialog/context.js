"use client";
import { createContext, useContext } from "react";
//#region src/ui/error-dialog/context.tsx
const ErrorDialogContext = createContext(null);
const ErrorDialogContextProvider = ErrorDialogContext.Provider;
function useErrorDialogContext() {
	const ctx = useContext(ErrorDialogContext);
	if (!ctx) throw new Error("ErrorDialog compound components must be used within an ErrorDialog.Root");
	return ctx;
}
//#endregion
export { ErrorDialogContextProvider, useErrorDialogContext };

//# sourceMappingURL=context.js.map