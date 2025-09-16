import type { FunctionalComponent } from 'vue';
import type { Notifications } from '@kyvg/vue3-notification';

export {};

declare global {
  interface Window {
    electronAPI: {
      selectFolder: () => Promise<string | null>;
    };
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    Notifications: FunctionalComponent<typeof Notifications>;
  }
}
