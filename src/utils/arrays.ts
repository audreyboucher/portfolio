export const shuffleExceptFirst = <T>(arr: Array<T>): Array<T> => {
  const temp = arr[0];

  const newArr = arr.reduce((r, e, i) => {
    const pos = Number(Math.random() * (i + 1));
    r.splice(pos, 0, e as never);
    return r;
  }, []);

  newArr.unshift(newArr.splice(newArr.indexOf(temp as never), 1)[0]);

  return newArr
};

export const firstGoesLast = <T>(arr: Array<T>): Array<T> => {
  const firstItem = arr[0];

  return [...(arr.slice(1)), firstItem];
};
