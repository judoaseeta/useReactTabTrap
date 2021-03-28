import { MutableRefObject, KeyboardEventHandler } from 'react';
interface UseReactTabTrapProps<T extends HTMLElement> {
    focusable?: string;
    cleanUp: () => void;
    trigger: boolean;
    ref: MutableRefObject<T | null>;
}
declare const UseReactTabTrap: <T extends HTMLElement>({ cleanUp, focusable, trigger, ref }: UseReactTabTrapProps<T>) => KeyboardEventHandler<T>;
export default UseReactTabTrap;
