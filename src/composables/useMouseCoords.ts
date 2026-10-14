import { ref, type Ref } from "vue";
import { useEventListener } from "./useEventListener";

export const useMouseCoords = (): { x: Ref<number>; y: Ref<number> } => {
  const x = ref(0);
  const y = ref(0);

  const handleMouseMove = (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  };

  useEventListener(window, "mousemove", handleMouseMove);

  return { x, y };
};
