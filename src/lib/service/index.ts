import { ref } from 'km-fresh';

const make = <SCHEMA>(_data: SCHEMA) => {
  let state = ref(false);
  let data = ref(_data);
  const close = () => {
    state.set(false);
  };
  const open = (_data?: SCHEMA) => {
    state.set(true);
    if (_data) {
      setData(_data);
    }
  };
  const setData = (_data: SCHEMA) => {
    data.set(_data);
  };

  return {
    open,
    close,
    setData,
    data,
    state,
  };
};

export default {
  make,
};
