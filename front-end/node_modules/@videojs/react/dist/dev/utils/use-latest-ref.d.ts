//#region src/utils/use-latest-ref.d.ts
/**
 * Keep a ref that always points to the latest value.
 *
 * Useful for capturing callbacks or derived values inside closures
 * that are created once (e.g. factory callbacks) without stale reads.
 */
declare function useLatestRef<Value>(value: Value): Readonly<{
  current: Value;
}>;
declare namespace useLatestRef {
  type Result<Value> = Readonly<{
    current: Value;
  }>;
}
//#endregion
export { useLatestRef };
//# sourceMappingURL=use-latest-ref.d.ts.map