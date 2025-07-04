import { Event, eventManager } from './event-manager';
import { ToastProps } from '@/components/feedback/toast';

type ToastOptions = Omit<ToastProps, 'children' | 'show'>;

const DEFAULT_AUTO_CLOSE_DELAY = 5000;
let TOAST_ID = 1;

const isNum = (v: number | undefined): v is number =>
  typeof v === 'number' && !isNaN(v);

function getAutoCloseDelay(userProvidedAutoClose?: false | number) {
  return userProvidedAutoClose === false ||
    (isNum(userProvidedAutoClose) && userProvidedAutoClose > 0)
    ? userProvidedAutoClose
    : DEFAULT_AUTO_CLOSE_DELAY;
}

function mergeOptions(
  type: ToastProps['type'],
  options?: ToastOptions
): ToastProps {
  const toastId = `${TOAST_ID++}`;
  return {
    ...options,
    type: (options && options.type) || type,
    toastId: `${TOAST_ID++}`,
    autoClose: getAutoCloseDelay(options?.autoClose),
    closeToast: () => {
      console.log('closeToast');
      eventManager.emit(Event.Clear, toastId);
    },
    pauseOnFocusLoss: options?.pauseOnFocusLoss ?? true,
    pauseOnHover: options?.pauseOnHover ?? true,
    closeOnClick: options?.closeOnClick ?? true
  };
}

function createToastByType(type: ToastProps['type']) {
  return (content: React.ReactNode, options?: ToastOptions) =>
    dispatchToast(content, mergeOptions(type, options));
}

function dispatchToast(content: React.ReactNode, options: ToastOptions) {
  eventManager.emit(Event.Show, content, options);
}

export function createToast(content: React.ReactNode, options?: ToastOptions) {
  dispatchToast(content, mergeOptions('default', options));
}

createToast.success = createToastByType('success');
createToast.info = createToastByType('info');
createToast.warning = createToastByType('warning');
createToast.error = createToastByType('error');

export default createToast;
