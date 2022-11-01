export class PrismaSelect<T> {
  get<S extends T>(select: S) {
    return select;
  }
}
