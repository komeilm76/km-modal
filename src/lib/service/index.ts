import * as kmFresh from 'km-fresh';

// declare const RefSymbol: unique symbol;
// declare const ShallowRefMarker: unique symbol;
// declare const RawSymbol: unique symbol;
// declare const ShallowReactiveMarker: unique symbol;

// export type ShallowRef<T = any, S = T> = Ref<T, S> & {
//   [ShallowRefMarker]?: true;
// };
// export type Ref<T = any, S = T> = {
//   value: T | S;
//   /**
//    * Type differentiator only.
//    * We need this to be in public d.ts but don't want it to show up in IDE
//    * autocomplete, so we use a private Symbol instead.
//    */
//   [RefSymbol]: true;
// };
// export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
// export type UnwrapRef<T> = T extends ShallowRef<infer V, unknown>
//   ? V
//   : T extends Ref<infer V, unknown>
//   ? UnwrapRefSimple<V>
//   : UnwrapRefSimple<T>;
// type Primitive = string | number | boolean | bigint | symbol | undefined | null;

// type Builtin = Primitive | Function | Date | Error | RegExp;
// export interface RefUnwrapBailTypes {}

// type UnwrapRefSimple<T> = T extends
//   | Builtin
//   | Ref
//   | RefUnwrapBailTypes[keyof RefUnwrapBailTypes]
//   | {
//       [RawSymbol]?: true;
//     }
//   ? T
//   : T extends Map<infer K, infer V>
//   ? Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Map<any, any>>>
//   : T extends WeakMap<infer K, infer V>
//   ? WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakMap<any, any>>>
//   : T extends Set<infer V>
//   ? Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Set<any>>>
//   : T extends WeakSet<infer V>
//   ? WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakSet<any>>>
//   : T extends ReadonlyArray<any>
//   ? {
//       [K in keyof T]: UnwrapRefSimple<T[K]>;
//     }
//   : T extends object & {
//       [ShallowReactiveMarker]?: never;
//     }
//   ? {
//       [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>;
//     }
//   : T;

// type VueRefFunction = <T>(
//   value: T
// ) => [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T>;

type IShape<DATA extends any> = { state: boolean; data: DATA | undefined };

const installVueAdapter = <ADAPTER>(adapter: ADAPTER) => {
  const ref = adapter;
  const make = <DATA extends any>(entryData: DATA) => {
    // @ts-ignore
    const modal = ref<IShape<DATA>>({ state: false, data: entryData }) as {
      value: IShape<DATA>;
    };
    const openModal = (entryData?: DATA) => {
      if (entryData) {
        modal.value = { ...modal.value, data: entryData };
      }
      modal.value = { ...modal.value, state: true };
    };
    const closeModal = (clearData: boolean = false) => {
      if (clearData) {
        modal.value = { ...modal.value, data: undefined };
      }
      modal.value = { ...modal.value, state: false };
    };

    return {
      _open: openModal,
      _close: closeModal,
      config: modal,
    };
  };

  return {
    make,
  };
};

const installFreshAdapter = <ADAPTER extends typeof kmFresh.ref>(adapter: ADAPTER) => {
  const ref = adapter;
  const make = <DATA extends any>(entryData: DATA) => {
    const modal = ref<IShape<DATA>>({ state: false, data: entryData });
    const openModal = (entryData?: DATA) => {
      if (entryData) {
        modal.value = { ...modal.value, data: entryData };
      }
      modal.value = { ...modal.value, state: true };
    };
    const closeModal = (clearData: boolean = false) => {
      if (clearData) {
        modal.value = { ...modal.value, data: undefined };
      }
      modal.value = { ...modal.value, state: false };
    };

    return {
      _open: openModal,
      _close: closeModal,
      config: modal,
    };
  };

  return {
    make,
  };
};

const install = <ADAPTER>(adapter: ADAPTER) => {
  return {
    vue: () => installVueAdapter(adapter),
    fresh: () => installFreshAdapter(adapter as typeof kmFresh.ref),
  };
};
export default {
  install,
};
