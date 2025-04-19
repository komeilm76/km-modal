type IShape<DATA extends any> = { state: boolean; data: DATA | undefined };
type Ref<SHAPE extends IShape<DATA>, DATA extends any = any> = <T1 extends SHAPE>(
  initialValue: T1
) => {
  value: T1;
};

const install = <
  DATA extends any,
  SHAPE extends IShape<DATA>,
  ADAPTER extends Ref<SHAPE>,
  REF extends ReturnType<ADAPTER>
>(
  adapter: ADAPTER
) => {
  const _open = <R extends REF>(ref: R, newData?: R['value']['data']) => {
    if (newData) {
      ref.value.data = newData;
      ref.value.state = true;
    } else {
      ref.value.state = true;
    }
  };
  const _close = <R extends REF>(ref: R, clearData: boolean = false) => {
    if (clearData == true) {
      ref.value.data = undefined;
    } else {
      ref.value.state = false;
    }
  };
  const make = <D extends any>(entryData?: D) => {
    // @ts-ignore
    const modal = adapter<IShape<D>>({ state: false, data: entryData });

    return {
      open: (entryDAta?: D) => {
        // @ts-ignore
        _open(modal, entryDAta);
      },
      close(clearDAta?: boolean) {
        // @ts-ignore
        _close(modal, clearDAta);
      },
      modal,
    };
  };

  return {
    open: _open,
    close: _close,
    make,
  };
};

export const defineKmModalService = install;

export default {
  install,
};
