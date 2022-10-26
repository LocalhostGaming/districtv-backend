export function prismaSelect<K extends PropertyKey>(...keys: K[]) {
  return Object.fromEntries(keys.map((k) => [k, true])) as unknown as {
    [P in K]: boolean;
  };
}
