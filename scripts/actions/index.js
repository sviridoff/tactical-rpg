export function enableCell({ cell }) {
  return {
    type: 'ENABLE_CELL',
    data: { cell },
  };
}

export function disableCell({ cell }) {
  return {
    type: 'DISABLE_CELL',
    data: { cell },
  };
}
