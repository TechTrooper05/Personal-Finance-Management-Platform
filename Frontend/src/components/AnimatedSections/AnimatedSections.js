import { useEffect, useRef, useState } from "react";

function AnimatedSection({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} ${visible ? "animate-show" : "animate-hidden"}`}
            style={{
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
}

export default AnimatedSection;