import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignalEffect, type Signal } from "@preact/signals";
import { useEffect } from "https://esm.sh/v128/preact@10.15.1/hooks/src/index.js";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  let timeout = 0;

  if (IS_BROWSER) {
    useSignalEffect(() => {
      const _subscribe = props.count.value;
      if (_subscribe <= 3) {
        console.log('skip');
        return;
      }
      console.log(_subscribe);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log('timeout')
      }, 500);
    });
    useEffect(() => {
      console.log('effect');
      return () => {
        console.log('cleanup');
      }
    })
  }

  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => props.count.value -= 1}>-1</Button>
      <p class="text-3xl">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>+1</Button>
    </div>
  );
}
