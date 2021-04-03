import {
    useCallback,
    useMemo,
    useEffect,
    useRef,
    MutableRefObject,
} from 'react';

interface UseReactTabTrapProps<T extends HTMLElement> {
    focusable?: string;
    cleanUp: () => void;
    trigger: boolean;
    ref: MutableRefObject<T|null>;
}
// HTML DIVELEMENT FORMELEMENT
const UseReactTabTrap = <T extends HTMLElement>({
    cleanUp,
    focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',
    trigger,
    ref
}: UseReactTabTrapProps<T>) => {
    const lastFocused = useRef(-1);
    // 
    const focusables = useMemo(() => {
        const target = ref.current;
        if(target && trigger) {
            return Array.from(target.querySelectorAll<HTMLElement>(focusable));
        } else {
            return null;
        }
    },[
        ref,
        trigger
    ]);
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        const target = ref.current;
        // if DOM is rendered and trigger is true
        // start to listen keyDown event
        if( target && trigger && focusables) {
            // if key is 'Esc' on Window
            // or key is 'Escape' on Mac
            if(e.key === 'Esc' || e.key === 'Escape') {
                // blur first focusables and
                // invoke cleanUp function
                lastFocused.current = -1;
                focusables[0].blur();
                cleanUp();
                // for shift + tab
            } else if(e.shiftKey && e.key === 'Tab') {
                if(document.activeElement === focusables[0]) {
                    // focus the last elements of focusables
                    lastFocused.current = focusables.length -1;
                    focusables[focusables.length -1].focus();   
                    e.preventDefault(); 
                } else if(!focusables.includes(document.activeElement as HTMLElement)) {
                    e.preventDefault();
                    focusables[lastFocused.current].focus();
                    // Actually, you don't need this code to move focus on the next element 
                    // just pressing 'Shfit+ Tab' moves focus to the previous. It's natural behavior on browsers
                    // but in order to do testing, need this code.
                } else if(document.activeElement !== focusables[0]) {
                    const id = Array.from(focusables).findIndex( element => document.activeElement === element);
                    if(id > -1) {
                        lastFocused.current = id-1;
                        focusables[id-1].focus();
                    }
                    e.preventDefault(); 
                }
            } else if (e.key === 'Tab') {
                if(document.activeElement === focusables[focusables.length - 1]) {
                    focusables[0].focus();
                    lastFocused.current = 0;
                    e.preventDefault();
                } else if(!focusables.includes(document.activeElement as HTMLElement)) {
                    e.preventDefault();
                    focusables[lastFocused.current].focus();
                    // as same as Shift+Tab case,
                    // you don't need this code to move focus on the next element 
                    // just pressing 'Tab' moves focus to the next. It's natural behavior on browsers
                    // but in order to do testing, need this code.
                } else {
                    const id = Array.from(focusables).findIndex( element => document.activeElement === element);
                    if(id > -1) {
                        lastFocused.current = id + 1;
                        focusables[id+1].focus();
                    }
                    e.preventDefault();
                }
            } else if (e.key === 'ArrowDown') {
                // if focus is on the last element on arrowDown
                // focus the first element
                if(document.activeElement === focusables[focusables.length -1]) {
                    lastFocused.current = 0;
                    focusables[0].focus();
                } else if(!focusables.includes(document.activeElement as HTMLElement)) {
                    focusables[lastFocused.current].focus();
                } else {
                    const id = Array.from(focusables).findIndex( element => document.activeElement === element);
                    if(id > -1) {
                        lastFocused.current = id + 1;
                        focusables[id+1].focus();
                    }
                }
            } else if(e.key === 'ArrowUp') {
                if(document.activeElement === focusables[0]) {
                    lastFocused.current = focusables.length -1;
                    focusables[focusables.length -1].focus();
                } else if(!focusables.includes(document.activeElement as HTMLElement)) {
                    focusables[lastFocused.current].focus();
                }else if(document.activeElement !== focusables[0]) {
                    const id = Array.from(focusables).findIndex( element => document.activeElement === element);
                    if(id > -1) {
                        lastFocused.current = id-1;
                        focusables[id-1].focus();
                    }
                }
            }

        }
    },[
        cleanUp,
        trigger,
        ref,
        focusables
    ]);
    // useEffect for focusing first elements 
    // when triggered
    useEffect(() => {
        window.addEventListener('keydown',onKeyDown);
        if(trigger && focusables) {
            lastFocused.current = 0;
            focusables[0].focus();
        }
        return () => {
            window.removeEventListener('keydown',onKeyDown);
        }
    },[
        trigger,
        focusables
    ]);
    return onKeyDown;
};  

export default UseReactTabTrap;