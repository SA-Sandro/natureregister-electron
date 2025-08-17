import { useNotification } from '@kyvg/vue3-notification';

 class PopupNotifierManagement {
  private readonly notifier = useNotification();

  constructor() {
    this.notifier = useNotification();
  }

  createNotification(title: string, text: string, type: string = 'info', duration: number = 5000) {
    this.notifier.notify({
      title,
      text,
      type,
      duration,
    });
  }
}

//SINGLETON
// This ensures that the same instance is used throughout the application
export const popupNotifier = new PopupNotifierManagement();
