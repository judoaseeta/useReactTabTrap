import React from 'react';
import MockModal from '../mock/mockModal';

import { 
    render,
    fireEvent,
} from '@testing-library/react';

describe('Testing use-react-tabtrap', () => {
    it('should focus the first focusable element when trigger is true', () => {
        const { getByTestId } = render(<MockModal />);
        const modal = getByTestId('modal');
        const modalOn = getByTestId('onModal');
        const focusables = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
        // when trigger is off
        // the first element should not be focused.
        expect(focusables[0]).not.toHaveFocus();
        expect(document.body).toHaveFocus();
        fireEvent.click(modalOn);
        // the first element should not be focused.
        // because trigger is on.
        expect(focusables[0]).toHaveFocus();
    });
    it('should focus the next element when \'Tab\' is pressed', () => {
        const { getByTestId } = render(<MockModal 
        />);
        const modal = getByTestId('modal');
        
        const modalOn = getByTestId('onModal');
        fireEvent.click(modalOn);
        const focusables = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
        fireEvent.keyDown(window,{
            key: 'Tab'
        });
        expect(focusables[1]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'Tab'
        });
        expect(focusables[2]).toHaveFocus();;
        fireEvent.keyDown(window,{
            key: 'Tab'
        });
        expect(focusables[3]).toHaveFocus();
        
        // fire keydown with focused on the last focusable element.
        fireEvent.keyDown(window,{
            key: 'Tab'
        });
        // focus should return to the first element.
        expect(focusables[0]).toHaveFocus();
    });
    it('should focus the next when press \'ArrowDown\'',() => {
        const { getByTestId } = render(<MockModal 
        />);
        const modal = getByTestId('modal');
        
        const modalOn = getByTestId('onModal');
        fireEvent.click(modalOn);
        const focusables = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
        fireEvent.keyDown(window,{
            key: 'ArrowDown'
        });
        expect(focusables[1]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'ArrowDown'
        });
        expect(focusables[2]).toHaveFocus();;
        fireEvent.keyDown(window,{
            key: 'ArrowDown'
        });
        expect(focusables[3]).toHaveFocus();
        
        // fire keydown with focused on the last focusable element.
        fireEvent.keyDown(window,{
            key: 'ArrowDown'
        });
        // focus should return to the first element.
        expect(focusables[0]).toHaveFocus();
    });
    it('should focus the reverse order of element when press \'ArrowUp\'', () => {
        const { getByTestId } = render(<MockModal 
                
        />);
        const modal = getByTestId('modal');
        
        const modalOn = getByTestId('onModal');
        fireEvent.click(modalOn);
        const focusables = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
        // initial render, the first element should be focused
        expect(focusables[0]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'ArrowUp'
        });
        // ArrowUp focus the element reversely, 
        // should focus the last element.
        expect(focusables[focusables.length -1]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'ArrowUp'
        });
        // should focus the second last element
        expect(focusables[focusables.length -2]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'ArrowUp'
        });
        // should focuse the third last element
        expect(focusables[focusables.length -3]).toHaveFocus();
    });
    it('should focus the reverse order of element when press shift+tab', () => {
        const { getByTestId } = render(<MockModal      
        />);
        const modal = getByTestId('modal');
        
        const modalOn = getByTestId('onModal');
        fireEvent.click(modalOn);
        const focusables = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
        // initial render, the first element should be focused
        expect(focusables[0]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'Tab',
            shiftKey: true
        });
        // Shift+tab focus the element reversely, 
        // should focus the last element.
        expect(focusables[focusables.length -1]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'Tab',
            shiftKey: true
        });
        // should focus the second last element
        expect(focusables[focusables.length -2]).toHaveFocus();
        fireEvent.keyDown(window,{
            key: 'Tab',
            shiftKey: true
        });
        // should focuse the third last element
        expect(focusables[focusables.length -3]).toHaveFocus();
    });
    it('should call \'cleanUp prop\' when Esc or Escape is pressed',() => {
        const mockCleanUp = jest.fn();
        const { getByTestId } = render(<MockModal   
            cleanUp={mockCleanUp}   
        />);
        const modal = getByTestId('modal');
        const modalOn = getByTestId('onModal');
        // press 'Esc' 
        fireEvent.keyDown(window, {
            key: 'Esc'
        });
        // mock CleanUp should not be called because trigger is false yet.
        expect(mockCleanUp).not.toHaveBeenCalled();
        // click OnModal button to trigger modal
        fireEvent.click(modalOn);
        // press 'Esc' again
        fireEvent.keyDown(window, {
            key: 'Esc'
        });
        // this time mockCleanUp should be called trigger is true.
        expect(mockCleanUp).toHaveBeenCalled();
    });
});