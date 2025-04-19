import { ref, UnwrapRef } from 'vue';
import { ref as kmRef } from 'km-fresh';
type IShape<DATA extends any> = { state: boolean; data: DATA | undefined };

const makeVueModal = <DATA extends any>(entryData: DATA) => {
  const defaultConfig: IShape<DATA> = { state: false, data: entryData };
  const modal = ref<IShape<DATA>>({ ...defaultConfig });
  const open = (entryData?: DATA) => {
    if (entryData) {
      modal.value.data = entryData as UnwrapRef<DATA>;
    }
    modal.value.state = true;
  };
  const close = (clearData: boolean = false) => {
    if (clearData == true) {
      modal.value.data = undefined;
    }
    modal.value.state = false;
  };
  const reset = () => {
    modal.value = defaultConfig;
  };
  return {
    type: 'vue',
    open,
    close,
    modal,
    reset,
  };
};
const makeFreshModal = <DATA extends any>(entryData: DATA) => {
  const defaultConfig: IShape<DATA> = { state: false, data: entryData };
  const modal = kmRef<IShape<DATA>>({ ...defaultConfig });
  const open = (entryData?: DATA) => {
    if (entryData) {
      modal.setHard({ ...modal.get(), data: entryData });
    }
    modal.value.state = true;
  };
  const close = (clearData: boolean = false) => {
    if (clearData == true) {
      modal.value.data = undefined;
      modal.setHard({ ...modal.get(), data: undefined });
    }
    modal.value.state = false;
  };
  const reset = () => {
    modal.setHard(defaultConfig);
  };
  return {
    type: 'fresh',
    open,
    close,
    modal,
    reset,
  };
};

const open = <MODAL extends unknown>(
  modal: MODAL,
  // @ts-ignore
  entryData?: MODAL['modal']['value']['data']
) => {
  // @ts-ignore
  modal.open(entryData);
};

const close = <MODAL extends unknown>(modal: MODAL, clearData: boolean = false) => {
  // @ts-ignore
  modal.close(clearData);
};

export const makeModal = <DATA extends any>(entryData?: DATA) => {
  return {
    vue: () => makeVueModal(entryData),
    fresh: () => makeFreshModal(entryData),
  };
};

export default {
  make: makeModal,
  open,
  close,
};
