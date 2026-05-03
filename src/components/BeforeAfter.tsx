import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const IMAGE_SRC = '/images/real-trainingsbereich-md.webp';

const STATS = [
  { value: 'Ø 8kg', label: 'verloren in 90 Tagen' },
  { value: 'Ø +12%', label: 'Muskelmasse' },
  { value: '94%', label: 'kommen wieder' },
];

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percent
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateSlider(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDragging.current) updateSlider(e.clientX);
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [updateSlider]);

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updateSlider(e.touches[0].clientX);
  };

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        e.preventDefault();
        updateSlider(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [updateSlider]);

  return (
    <section
      style={{
        background: '#111820',
        padding: '100px 24px',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            color: '#C44552',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontFamily: 'Barlow Condensed, sans-serif',
          }}
        >
          ECHTE ERGEBNISSE
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            color: '#F5F0E8',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}
        >
          WAS MÖGLICH IST.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '18px',
            color: 'rgba(245,240,232,0.55)',
            marginBottom: '56px',
            letterSpacing: '0.5px',
          }}
        >
          Unsere Mitglieder sprechen für sich.
        </motion.p>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(320px, 50vw, 700px)',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: 'ew-resize',
            userSelect: 'none',
            marginBottom: '48px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* NACHHER — right side (full color) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${IMAGE_SRC})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* VORHER — left side (grayscale, clipped) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              backgroundImage: `url(${IMAGE_SRC})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) brightness(0.6)',
            }}
          />

          {/* Labels */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              borderRadius: '6px',
              padding: '6px 14px',
              fontFamily: 'Oswald, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              pointerEvents: 'none',
            }}
          >
            VORHER
          </div>

          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(196,69,82,0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '6px',
              padding: '6px 14px',
              fontFamily: 'Oswald, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              pointerEvents: 'none',
            }}
          >
            NACHHER
          </div>

          {/* Divider line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              width: '2px',
              background: 'rgba(255,255,255,0.9)',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#C44552',
              border: '3px solid #ffffff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              gap: '2px',
            }}
          >
            <span
              style={{
                color: '#ffffff',
                fontSize: '14px',
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              ◀▶
            </span>
          </div>
        </motion.div>

        {/* Stat Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#C44552',
                  letterSpacing: '1px',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(245,240,232,0.55)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
