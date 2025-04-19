// import kmFresh, { ref as kmRef } from 'km-fresh';

// namespace VUE_REF {
//   declare const RefSymbol: unique symbol;
//   declare const ShallowRefMarker: unique symbol;
//   declare const RawSymbol: unique symbol;
//   declare const ShallowReactiveMarker: unique symbol;

//   export type ShallowRef<T = any, S = T> = Ref<T, S> & {
//     [ShallowRefMarker]?: true;
//   };
//   export interface Ref<T = any, S = T> {
//     get value(): T;
//     set value(_: S);
//     /**
//      * Type differentiator only.
//      * We need this to be in public d.ts but don't want it to show up in IDE
//      * autocomplete, so we use a private Symbol instead.
//      */
//     [RefSymbol]: true;
//   }
//   export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
//   export type UnwrapRef<T> = T extends ShallowRef<infer V, unknown>
//     ? V
//     : T extends Ref<infer V, unknown>
//     ? UnwrapRefSimple<V>
//     : UnwrapRefSimple<T>;
//   type Primitive = string | number | boolean | bigint | symbol | undefined | null;

//   type Builtin = Primitive | Function | Date | Error | RegExp;
//   export interface RefUnwrapBailTypes {}

//   type UnwrapRefSimple<T> = T extends
//     | Builtin
//     | Ref
//     | RefUnwrapBailTypes[keyof RefUnwrapBailTypes]
//     | {
//         [RawSymbol]?: true;
//       }
//     ? T
//     : T extends Map<infer K, infer V>
//     ? Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Map<any, any>>>
//     : T extends WeakMap<infer K, infer V>
//     ? WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakMap<any, any>>>
//     : T extends Set<infer V>
//     ? Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Set<any>>>
//     : T extends WeakSet<infer V>
//     ? WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakSet<any>>>
//     : T extends ReadonlyArray<any>
//     ? {
//         [K in keyof T]: UnwrapRefSimple<T[K]>;
//       }
//     : T extends object & {
//         [ShallowReactiveMarker]?: never;
//       }
//     ? {
//         [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>;
//       }
//     : T;

//   export declare function ref<T>(
//     value: T
//   ): [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T>;
// }

// const makeVueModal = <DATA extends any>(entryData: DATA) => {
//   const defaultConfig: IShape<DATA> = { state: false, data: entryData };
//   const modal = ref<IShape<DATA>>({ ...defaultConfig });
//   const open = (entryData?: DATA) => {
//     if (entryData) {
//       modal.value = { ...modal.value, data: entryData };
//     }
//     modal.value = { ...modal.value, state: true };
//   };
//   const close = (clearData: boolean = false) => {
//     if (clearData == true) {
//       modal.value = { ...modal.value, data: undefined };
//     }
//     modal.value = { ...modal.value, state: false };
//   };
//   const reset = () => {
//     modal.value = defaultConfig;
//   };
//   return {
//     open,
//     close,
//     modal,
//     reset,
//   };
// };
// const makeFreshModal = <DATA extends any>(entryData: DATA) => {
//   const defaultConfig: IShape<DATA> = { state: false, data: entryData };
//   const modal = kmRef<IShape<DATA>>({ ...defaultConfig });
//   const open = (entryData?: DATA) => {
//     if (entryData) {
//       modal.setHard({ ...modal.get(), data: entryData });
//     }
//     modal.value.state = true;
//   };
//   const close = (clearData: boolean = false) => {
//     if (clearData == true) {
//       modal.value.data = undefined;
//       modal.setHard({ ...modal.get(), data: undefined });
//     }
//     modal.value.state = false;
//   };
//   const reset = () => {
//     modal.setHard(defaultConfig);
//   };
//   return {
//     open,
//     close,
//     modal,
//     reset,
//   };
// };
// const open = <MODAL extends ReturnType<typeof makeFreshModal> | ReturnType<typeof makeVueModal>>(
//   modal: MODAL,
//   entryData?: MODAL['modal']['value']['data']
// ) => {
//   modal.open(entryData);
// };
// const close = <MODAL extends ReturnType<typeof makeFreshModal> | ReturnType<typeof makeVueModal>>(
//   modal: MODAL,
//   clearData: boolean = false
// ) => {
//   modal.close(clearData);
// };
// export const makeModal = <DATA extends any>(entryData?: DATA) => {
//   return {
//     vue: () => makeVueModal(entryData),
//     fresh: () => makeFreshModal(entryData),
//   };
// };

// const install = (adapter: typeof VUE_REF.ref | typeof kmFresh.ref) => {
//   const ref = adapter;
//   return {
//     ref,
//     open,
//     close,
//   };
// };

// export default {
//   make: makeModal,
//   open,
//   close,
// };
