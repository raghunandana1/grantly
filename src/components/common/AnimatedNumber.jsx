import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedNumber({
  value,
  prefix = '$',
  className = '',
  duration = 0.6,
}) {
  const spanRef = useRef(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    const startVal = prevValueRef.current;
    const endVal = value;
    prevValueRef.current = value;

    const obj = { val: startVal };

    gsap.to(obj, {
      val: endVal,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (node) {
          node.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}`;
        }
      },
    });
  }, [value, prefix, duration]);

  return (
    <span ref={spanRef} className={`tabular-nums ${className}`}>
      {prefix}
      {Number(value).toLocaleString()}
    </span>
  );
}

export default AnimatedNumber;
