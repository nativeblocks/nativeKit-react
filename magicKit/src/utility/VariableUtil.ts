import { NativeJsonPath } from "@nativeblocks/nativeblocks-react";

/*
 * given => {counter}
 * replace counter key with runtime value like 1
 * return => 1
 * */
export function getVariableValue(
  variable: string,
  key: string,
  value: string
): string {
  if (!variable) return "";
  return variable.replace(`{${key}}`, value);
}

export function getJsonPathValue(variable: string, query: string) {
  try {
    return new NativeJsonPath().query(variable, query) as any;
  } catch (e) {
    return {} as any;
  }
}
