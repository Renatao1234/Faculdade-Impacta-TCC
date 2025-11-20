declare module "expo-file-system/legacy" {
  export const documentDirectory: string | null;
  export const cacheDirectory: string | null;
  export function writeAsStringAsync(
    fileUri: string,
    contents: string,
    options?: { encoding?: "base64" | "utf8" }
  ): Promise<void>;
  export const EncodingType: { UTF8: "utf8"; Base64: "base64" };
}
