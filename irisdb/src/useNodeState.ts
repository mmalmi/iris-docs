import { JsonValue, localState, Node, Unsubscribe } from 'irisdb';
import { useCallback, useEffect, useState } from 'react';

import { TypeGuard } from './types.ts';

/**
 * Similar to React's useState, but for a Node's value. Lets you easily persist your application state locally or sync it over the network.
 * @param node
 * @param key
 * @param initialValue
 * @param once
 * @example const [value, setValue] = useNodeState(publicState, 'apps/canvas/documents/test/name', 'Untitled Canvas'})
 */
export function useNodeState<T = JsonValue>(
  node: Node,
  key: string,
  initialValue: T,
  typeGuard: TypeGuard<T> = (value: JsonValue) => value as T,
  once = false,
): [T, (value: JsonValue) => void] {
  useEffect(() => {
    if (!initialValue) {
      node.get(key).once((val: JsonValue) => {
        initialValue = typeGuard(val);
      });
    }
  }, [node, key, initialValue]);
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const unsub = node
      .get(key)
      .on(
        (
          new_value: JsonValue,
          _key: string,
          _updatedAt: number | undefined,
          unsubscribe: Unsubscribe,
        ) => {
          setValue(typeGuard(new_value));
          if (once) {
            unsubscribe();
          }
        },
      );
    return unsub;
  }, [node, key, once]);
  const setter = useCallback(
    (new_value: JsonValue) => {
      console.log('setting', key, new_value);
      node.get(key).put(new_value);
    },
    [node, key],
  );
  return [value, setter];
}

export function useLocalState<T>(
  key: string,
  initialValue: T,
  typeGuard: TypeGuard<T> = (value: JsonValue) => value as T,
): [T, (value: JsonValue) => void] {
  return useNodeState(localState, key, initialValue, typeGuard);
}