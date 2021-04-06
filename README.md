[![Build Status](https://travis-ci.com/judoaseeta/useReactTabTrap.svg?branch=main)](https://travis-ci.com/judoaseeta/useReactTabTrap)
[![Coverage Status](https://coveralls.io/repos/github/judoaseeta/useReactTabTrap/badge.svg?branch=main)](https://coveralls.io/github/judoaseeta/useReactTabTrap?branch=main)
# use-react-tabtrap

## React hook for adding Tab-trapping functionality.
    use-react-tabtrap will give a React Component Tab-trapping functionality by
    adding 'keydown' listener window. 
### Props 
```tsx
    {
        cleanUp: () => void // 
        ref: MutableObject<T extends HTMLElement | null>
        trigger: boolean //  a boolean value represents whether tabtrap needs
        focusable?: string // comma seperated string of querySelectorAll
        // usually you don't need to pass it, default value of focusable deals with the most case of focusable elements.
    }
```

### Usage
    create a React.MutableRefObject by useRef. and give the ref to both the target component and prop of use-react-tabtrap hook.
``` tsx
    UseReactTabTrap({
        ref,
        trigger,
        cleanUp,
    });
    /*
    ....
    */
   <div
    ref={ref}
   >
   </div>
```

### Supported key list

- ESC or ESCAPE: will excute cleanUp function. cleanUp could be a function to toggle modal or focus on specific element 

- Tab or Shift+Tab : will focus the next or the previous focusable elements

- ArrowDown or ArrowUp : will focus the next or the previous focusable elements

<<<<<<< HEAD
#### Fix logs
- Version 1.0.5: use-react-tabtrap now can focus again the last focused element, when a user presses one of supported keys again in the situation tab-trapped component loses focus.
- Version 1.0.6: Support lower version of react(>=16.13.0)
=======

>>>>>>> parent of 5dd1ea8... FIX lose focus
#### Coming up next
- Version 1.0.7: Reduce bundle size.
- some more keys will be added
- a custom key map could be available.
- a custom key handler code.

