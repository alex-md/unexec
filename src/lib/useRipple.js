import { useCallback } from 'react';

export const useRipple = () => {
    const createRipple = useCallback((event) => {
        const button = event.currentTarget;
        const ripple = document.createElement('span');

        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.className = 'ripple';

        // Remove existing ripples
        const existingRipple = button.getElementsByClassName('ripple')[0];
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        // Clean up ripple
        const removeRipple = () => ripple.remove();
        ripple.addEventListener('animationend', removeRipple);

        return () => {
            ripple.removeEventListener('animationend', removeRipple);
            ripple.remove();
        };
    }, []);

    return createRipple;
};
