import React, { useState } from 'react';
import UseReactTabTrap from '../src';
const MockModal:React.FC<{
    initialTrigger?: boolean;
    cleanUp?: () => void;
}> = ({
    initialTrigger = false,
    cleanUp
}) => {
    const ref = React.useRef<HTMLFormElement|null>(null);
    const [ trigger, setTrigger ] = useState(initialTrigger);
    const onTabTrap = UseReactTabTrap<HTMLFormElement>({
        trigger,
        ref,
        cleanUp :  cleanUp? cleanUp : () => ({})
    });
    return <div>
        <h1>Hello World</h1>
        <button
            onClick={() => setTrigger(true)}
            data-testid="onModal"
        >TOGGLE MODAL</button>
        <form
            data-testid="modal"
            ref={ref}
            style={{
                display: trigger ? 'flex' : 'none',
                position: 'absolute',
                top: 0,
                left: 0
            }}
            onKeyDown={onTabTrap}
        >
            <input />
            <button
                onClick={() => setTrigger(false)}
                data-testid="offModal"
            >OFF Modal</button>
            <textarea />
            <div
                contentEditable={true}
            ></div>
        </form>
    </div>
} 

export default MockModal;
