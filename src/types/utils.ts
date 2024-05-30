export type KeyOf<T> = T extends T ? keyof T : never;

export type ValueOf<T> = {
  [K in KeyOf<T>]: T[K];
}[KeyOf<T>];
