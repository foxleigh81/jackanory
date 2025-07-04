export const fakeEvent = (value: unknown) => {
  return {
    target: {
      value
    }
  } as React.ChangeEvent<HTMLInputElement>;
};

export default fakeEvent;
