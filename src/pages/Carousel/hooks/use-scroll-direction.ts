import { useState, useEffect } from 'react';

interface useScrollDirectionProps {
    threshold: number
}

export const useScrollDirection = ({ threshold }: useScrollDirectionProps) => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const updateScrollDirection = () => {
            const currentScrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? 'down' : 'up';
            console.log('🟢 скроллим', lastScrollY, currentScrollY, scrollY, scrollDirection);
            setScrollY(currentScrollY);

            if (Math.abs(currentScrollY - lastScrollY) > threshold) {
                setScrollDirection(direction);
                lastScrollY = currentScrollY;
            }

            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener('scroll', updateScrollDirection);

        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [threshold]);

    return { scrollDirection, scrollY };
};