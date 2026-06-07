import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Pointer-reactive 3D tilt + cursor spotlight position, built on Framer Motion
 * motion values. Spread the returned `style` onto a `motion.*` element and wire
 * the handlers. Pairs with the `.spotlight` CSS (reads --mx / --my).
 */
export const useTilt = (max = 10) => {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 150,
    damping: 18,
  });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--my", `${y * 100}%`);
  };

  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return { style: { rotateX, rotateY, transformPerspective: 1000 }, onMouseMove, onMouseLeave };
};

/** Magnetic pull toward the cursor — for primary buttons / chips. */
export const useMagnetic = (strength = 0.3) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { x: sx, y: sy }, onMouseMove, onMouseLeave };
};
