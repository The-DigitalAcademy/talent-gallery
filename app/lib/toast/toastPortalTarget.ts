let target: HTMLElement | null = null;
const listeners = new Set<() => void>();

export function setToastPortalTarget(node: HTMLElement | null) {
  target = node;
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return target;
}