export const getIdGenerator = (startId = 0) => {
  let id = startId;
  function* generator() {
    while (true) {
      yield ++id;
    }
  }

  const gen: ReturnType<typeof generator> & { setStartId?: (newStartId: number) => void} = generator();
  gen.setStartId = (newStartId: number) => {
    id = newStartId;
  };

  return gen as Required<typeof gen>;
}
