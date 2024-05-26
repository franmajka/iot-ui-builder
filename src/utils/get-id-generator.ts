export function* getIdGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}
