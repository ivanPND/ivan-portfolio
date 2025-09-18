import { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

function TargetCursor({ targetSelector = '.cursor-target', hideDefaultCursor = true }) {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const dotRef = useRef(null);

  const isActiveRef = useRef(false);
  const activeTargetRef = useRef(null);
  const currentTargetMoveRef = useRef(null);
  const currentLeaveHandlerRef = useRef(null);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    }),
    [],
  );

  const setCursorVisible = useCallback((visible) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      autoAlpha: visible ? 1 : 0,
      duration: 0.15,
      ease: 'power2.out',
    });
  }, []);

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current || !isActiveRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.08,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return undefined;

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      autoAlpha: 0,
      rotate: 0,
    });

    const originalCursor = document.body.style.cursor;

    const cleanupTarget = (target) => {
      const move = currentTargetMoveRef.current;
      const leave = currentLeaveHandlerRef.current;
      if (move) target.removeEventListener('mousemove', move);
      if (leave) target.removeEventListener('mouseleave', leave);
      currentTargetMoveRef.current = null;
      currentLeaveHandlerRef.current = null;
    };

    const moveHandler = (event) => {
      if (isActiveRef.current) moveCursor(event.clientX, event.clientY);
    };
    window.addEventListener('mousemove', moveHandler);

    const mouseDownHandler = () => {
      if (!dotRef.current || !cursorRef.current || !isActiveRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.2, ease: 'power3.out' });
      gsap.to(cursorRef.current, { scale: 0.95, duration: 0.15, ease: 'power3.out' });
    };
    const mouseUpHandler = () => {
      if (!dotRef.current || !cursorRef.current || !isActiveRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.2, ease: 'power3.out' });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.15, ease: 'power3.out' });
    };
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    const scrollHandler = () => {
      const activeTarget = activeTargetRef.current;
      if (!activeTarget || !cursorRef.current) return;

      const mouseX = Number(gsap.getProperty(cursorRef.current, 'x'));
      const mouseY = Number(gsap.getProperty(cursorRef.current, 'y'));
      const el = document.elementFromPoint(mouseX, mouseY);
      const stillOver =
        el && (el === activeTarget || el.closest(targetSelector) === activeTarget);

      if (!stillOver && currentLeaveHandlerRef.current) {
        currentLeaveHandlerRef.current();
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    const enterHandler = (event) => {
      const directTarget = event.target;
      if (!(directTarget instanceof Element)) return;

      let current = directTarget;
      let target = null;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          target = current;
          break;
        }
        current = current.parentElement;
      }
      if (!target || !cursorRef.current || !cornersRef.current) return;

      if (activeTargetRef.current === target) return; 

      if (activeTargetRef.current) {
        cleanupTarget(activeTargetRef.current);
      }

      isActiveRef.current = true;
      activeTargetRef.current = target;
      setCursorVisible(true);
      if (hideDefaultCursor) document.body.style.cursor = 'none';

      const corners = Array.from(cornersRef.current);
      corners.forEach((corner) => gsap.killTweensOf(corner));
      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX, mouseY) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [topLeft, topRight, bottomRight, bottomLeft] = Array.from(cornersRef.current);
        const { borderWidth, cornerSize, parallaxStrength } = constants;

        let topLeftOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let topRightOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let bottomRightOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };
        let bottomLeftOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          topLeftOffset.x += mouseOffsetX; topLeftOffset.y += mouseOffsetY;
          topRightOffset.x += mouseOffsetX; topRightOffset.y += mouseOffsetY;
          bottomRightOffset.x += mouseOffsetX; bottomRightOffset.y += mouseOffsetY;
          bottomLeftOffset.x += mouseOffsetX; bottomLeftOffset.y += mouseOffsetY;
        }

        const offsets = [topLeftOffset, topRightOffset, bottomRightOffset, bottomLeftOffset];
        const tl = gsap.timeline();
        [topLeft, topRight, bottomRight, bottomLeft].forEach((corner, idx) => {
          tl.to(corner, { x: offsets[idx].x, y: offsets[idx].y, duration: 0.18, ease: 'power2.out' }, 0);
        });
      };

      updateCorners();

      let rAF = null;
      const targetMove = (ev) => {
        if (!isActiveRef.current) return;
        if (rAF) return;
        rAF = requestAnimationFrame(() => {
          moveCursor(ev.clientX, ev.clientY);
          updateCorners(ev.clientX, ev.clientY);
          rAF = null;
        });
      };

      const leaveHandler = () => {
        isActiveRef.current = false;
        activeTargetRef.current = null;

        if (rAF) cancelAnimationFrame(rAF), (rAF = null);
        cleanupTarget(target);

        if (cornersRef.current) {
          const cornerElements = Array.from(cornersRef.current);
          gsap.killTweensOf(cornerElements);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const resetTl = gsap.timeline();
          cornerElements.forEach((corner, index) => {
            resetTl.to(corner, { x: positions[index].x, y: positions[index].y, duration: 0.22, ease: 'power3.out' }, 0);
          });
        }

        setCursorVisible(false);
        document.body.style.cursor = originalCursor;
      };

      currentTargetMoveRef.current = targetMove;
      currentLeaveHandlerRef.current = leaveHandler;

      target.addEventListener('mousemove', targetMove);
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('mouseover', enterHandler);

      const activeTarget = activeTargetRef.current;
      if (activeTarget) cleanupTarget(activeTarget);

      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, moveCursor, constants, setCursorVisible, hideDefaultCursor]);

  return (
    <div className="target-cursor-wrapper" ref={cursorRef}>
      <div className="target-cursor-dot" ref={dotRef} />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
}

TargetCursor.propTypes = {
  targetSelector: PropTypes.string,
  hideDefaultCursor: PropTypes.bool,
};

export default TargetCursor;
