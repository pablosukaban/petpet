import { onMounted, onUnmounted } from "vue";

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  callback: (event: WindowEventMap[K]) => void,
): void;
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  callback: (event: DocumentEventMap[K]) => void,
): void;
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  event: K,
  callback: (event: HTMLElementEventMap[K]) => void,
): void;
export function useEventListener(target: EventTarget, event: string, callback: EventListener) {
  onMounted(() => {
    target.addEventListener(event, callback);
  });

  onUnmounted(() => {
    target.removeEventListener(event, callback);
  });
}
