import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, stagger as fmStagger, useInView } from "framer-motion";

/**
 * Scroll-triggered reveal. Animates direct children (or a `selector`) up + fade
 * as they enter the viewport. Uses Framer Motion's imperative `animate` so it
 * works on arbitrary children without wrapping them (keeps grid/bento layouts intact).
 */
const Reveal = ({
  children,
  as: Tag = "div",
  className = "",
  y = 36,
  duration = 0.9,
  stagger = 0.09,
  delay = 0,
  selector,
  once = true,
  ...rest
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });

  const getTargets = () =>
    ref.current
      ? Array.from(
          selector ? ref.current.querySelectorAll(selector) : ref.current.children
        )
      : [];

  // Hide before reveal to avoid a flash of unstyled content.
  useLayoutEffect(() => {
    getTargets().forEach((el) => {
      el.style.opacity = "0";
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView) return;
    const targets = getTargets();
    if (!targets.length) return;
    animate(
      targets,
      { opacity: [0, 1], y: [y, 0], filter: ["blur(8px)", "blur(0px)"] },
      {
        duration,
        delay: fmStagger(stagger, { startDelay: delay }),
        ease: [0.16, 1, 0.3, 1],
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
