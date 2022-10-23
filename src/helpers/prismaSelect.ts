type SelectObj<T> = {
  [K in keyof T]: boolean;
};

export function prismaSelect<T>(keys: (keyof T)[]) {
  const selectObj: SelectObj<T> = {} as SelectObj<T>;

  for (const key of keys) {
    selectObj[key] = true;
  }

  return selectObj;
}
