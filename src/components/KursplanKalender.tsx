import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CourseEntry = {
  time: string;
  name: string;
  duration: number;
};

type Schedule = {
  [key: string]: CourseEntry[];
};

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const DAY_LABELS: { [key: string]: string } = {
  Mo: 'Montag',
  Di: 'Dienstag',
  Mi: 'Mittwoch',
  Do: 'Donnerstag',
  Fr: 'Freitag',
  Sa: 'Samstag',
  So: 'Sonntag',
};

const COURSE_COLORS: { [key: string]: string } = {
  BodyPump: '#C44552',
  Yoga: '#0d9488',
  Pilates: '#B8924A',
  Spinning: '#6366f1',
  Rückenfit: '#22c55e',
  BoxFit: '#f97316',
  Zirkel: '#C44552',
  Functional: '#6366f1',
  Stretching: '#0d9488',
};

const SCHEDULE: Schedule = {
  Mo: [
    { time: '06:30', name: 'Rückenfit', duration: 45 },
    { time: '09:00', name: 'Yoga', duration: 60 },
    { time: '17:30', name: 'BodyPump', duration: 50 },
    { time: '19:00', name: 'Zirkel', duration: 45 },
  ],
  Di: [
    { time: '07:00', name: 'Pilates', duration: 50 },
    { time: '10:00', name: 'Stretching', duration: 45 },
    { time: '18:00', name: 'Spinning', duration: 45 },
    { time: '20:00', name: 'BoxFit', duration: 60 },
  ],
  Mi: [
    { time: '06:30', name: 'Rückenfit', duration: 45 },
    { time: '09:30', name: 'Yoga', duration: 60 },
    { time: '17:00', name: 'BodyPump', duration: 50 },
    { time: '19:30', name: 'Functional', duration: 45 },
  ],
  Do: [
    { time: '07:00', name: 'Pilates', duration: 50 },
    { time: '10:00', name: 'Rückenfit', duration: 45 },
    { time: '18:00', name: 'Spinning', duration: 45 },
    { time: '20:00', name: 'Zirkel', duration: 45 },
  ],
  Fr: [
    { time: '06:30', name: 'Rückenfit', duration: 45 },
    { time: '09:00', name: 'Yoga', duration: 60 },
    { time: '17:30', name: 'BodyPump', duration: 50 },
    { time: '19:00', name: 'BoxFit', duration: 60 },
  ],
  Sa: [
    { time: '09:00', name: 'Yoga', duration: 60 },
    { time: '10:30', name: 'Pilates', duration: 50 },
    { time: '11:30', name: 'Zirkel', duration: 45 },
  ],
  So: [
    { time: '10:00', name: 'Yoga', duration: 60 },
    { time: '11:00', name: 'Stretching', duration: 45 },
  ],
};

// JS day: 0=So,1=Mo,...,6=Sa -> our DAYS index
const JS_DAY_TO_IDX: { [key: number]: number } = {
  1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6,
};

function parseTime(timeStr: string): { h: number; m: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { h, m };
}

function getNextCourse(): { dayKey: string; course: CourseEntry; minutesUntil: number } | null {
  const now = new Date();
  const nowDay = JS_DAY_TO_IDX[now.getDay()];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  for (let offset = 0; offset < 7; offset++) {
    const dayIdx = (nowDay + offset) % 7;
    const dayKey = DAYS[dayIdx];
    const courses = SCHEDULE[dayKey];
    for (const course of courses) {
      const { h, m } = parseTime(course.time);
      const courseMinutes = h * 60 + m;
      const totalMinutesUntil = offset * 1440 + courseMinutes - nowMinutes;
      if (totalMinutesUntil > 0) {
        return { dayKey, course, minutesUntil: totalMinutesUntil };
      }
    }
  }
  return null;
}

function getTodayKey(): string {
  return DAYS[JS_DAY_TO_IDX[new Date().getDay()]];
}

function isNextCourse(
  dayKey: string,
  course: CourseEntry,
  nextInfo: ReturnType<typeof getNextCourse>
): boolean {
  if (!nextInfo) return false;
  return (
    nextInfo.dayKey === dayKey &&
    nextInfo.course.time === course.time &&
    nextInfo.course.name === course.name
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '255, 255, 255';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export default function KursplanKalender() {
  const todayKey = getTodayKey();
  const [activeDay, setActiveDay] = useState<string>(todayKey);
  const [nextCourse, setNextCourse] = useState<ReturnType<typeof getNextCourse>>(getNextCourse());

  useEffect(() => {
    const interval = setInterval(() => {
      setNextCourse(getNextCourse());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const courses = SCHEDULE[activeDay] || [];

  function formatCountdown(minutesUntil: number): string {
    if (minutesUntil < 60) return `${minutesUntil} Min.`;
    const h = Math.floor(minutesUntil / 60);
    const m = minutesUntil % 60;
    if (m === 0) return `${h} Std.`;
    return `${h} Std. ${m} Min.`;
  }

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0F1419 0%, #111820 100%)',
        padding: 'clamp(64px, 10vh, 96px) clamp(16px, 4vw, 48px)',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C44552',
            marginBottom: '16px',
            margin: '0 0 16px 0',
          }}
        >
          Kursprogramm
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display, "Oswald", sans-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#F5F0E8',
            lineHeight: 1,
            marginBottom: '40px',
            margin: '0 0 40px 0',
          }}
        >
          Dein Wochenplan.
        </h2>

        {/* Live Countdown Badge */}
        <div style={{ marginBottom: '40px' }}>
          {nextCourse ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(196, 69, 82, 0.12)',
                border: '1px solid rgba(196, 69, 82, 0.3)',
                borderRadius: '100px',
                padding: '10px 20px',
              }}
            >
              <span style={{ position: 'relative', display: 'flex', width: 10, height: 10, flexShrink: 0 }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#C44552',
                    opacity: 0.4,
                    animation: 'kk-pulse-ring 1.5s ease-out infinite',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#C44552',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: '#F5F0E8',
                }}
              >
                Nächster Kurs:{' '}
                <strong style={{ color: '#C44552' }}>{nextCourse.course.name}</strong>
                {' '}in{' '}
                <strong style={{ color: '#F5F0E8' }}>{formatCountdown(nextCourse.minutesUntil)}</strong>
                {nextCourse.dayKey !== todayKey && (
                  <span style={{ color: '#9ca3af', fontSize: '13px', marginLeft: 4 }}>
                    ({DAY_LABELS[nextCourse.dayKey]})
                  </span>
                )}
              </span>
            </div>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px',
                padding: '10px 20px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
                  fontSize: '15px',
                  color: '#9ca3af',
                }}
              >
                Keine weiteren Kurse diese Woche
              </span>
            </div>
          )}
        </div>

        {/* Day Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {DAYS.map((day) => {
            const isToday = day === todayKey;
            const isActive = day === activeDay;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                style={{
                  fontFamily: 'var(--font-display, "Oswald", sans-serif)',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: isActive
                    ? '2px solid #C44552'
                    : isToday
                    ? '2px solid rgba(196, 69, 82, 0.4)'
                    : '2px solid rgba(255,255,255,0.08)',
                  background: isActive ? '#C44552' : 'transparent',
                  color: isActive ? '#fff' : isToday ? '#C44552' : '#9ca3af',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {day}
                {isToday && !isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#C44552',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Day Label */}
        <div style={{ marginBottom: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#6b7280',
            }}
          >
            {DAY_LABELS[activeDay]}
          </span>
        </div>

        {/* Course Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {courses.length === 0 ? (
              <div
                style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#6b7280',
                  fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
                  fontSize: '18px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Heute kein Kurs — Erholung ist auch Training.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {courses.map((course, idx) => {
                  const color = COURSE_COLORS[course.name] || '#C44552';
                  const isNext = isNextCourse(activeDay, course, nextCourse);
                  return (
                    <motion.div
                      key={`${course.time}-${course.name}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '20px 24px',
                        borderRadius: '12px',
                        background: isNext
                          ? `rgba(${hexToRgb(color)}, 0.1)`
                          : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isNext ? `rgba(${hexToRgb(color)}, 0.3)` : 'rgba(255,255,255,0.07)'}`,
                        borderLeft: `4px solid ${color}`,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Time */}
                      <div style={{ minWidth: '64px', flexShrink: 0 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display, "Oswald", sans-serif)',
                            fontSize: '22px',
                            fontWeight: 600,
                            color: '#F5F0E8',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {course.time}
                        </span>
                      </div>

                      {/* Course Name */}
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display, "Oswald", sans-serif)',
                            fontSize: '18px',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: '#F5F0E8',
                          }}
                        >
                          {course.name}
                        </span>
                      </div>

                      {/* Duration Tag */}
                      <div style={{ flexShrink: 0 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#6b7280',
                            background: 'rgba(255,255,255,0.06)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                          }}
                        >
                          {course.duration} Min
                        </span>
                      </div>

                      {/* NEXT Badge */}
                      {isNext && (
                        <div style={{ flexShrink: 0 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              color: color,
                              background: `rgba(${hexToRgb(color)}, 0.15)`,
                              border: `1px solid rgba(${hexToRgb(color)}, 0.4)`,
                              padding: '4px 10px',
                              borderRadius: '4px',
                              animation: 'kk-badge-pulse 2s ease-in-out infinite',
                            }}
                          >
                            Next
                          </span>
                        </div>
                      )}

                      {/* Glow for next course */}
                      {isNext && (
                        <div
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '120px',
                            background: `linear-gradient(to left, rgba(${hexToRgb(color)}, 0.06), transparent)`,
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(184, 146, 74, 0.1)',
              border: '1px solid rgba(184, 146, 74, 0.25)',
              borderRadius: '100px',
              padding: '8px 16px',
            }}
          >
            <span style={{ fontSize: '14px', color: '#B8924A' }}>✓</span>
            <span
              style={{
                fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#B8924A',
              }}
            >
              Alle Kurse inkl. im Mitgliedsbeitrag
            </span>
          </div>

          <a
            href="#kontakt"
            style={{
              fontFamily: 'var(--font-condensed, "Barlow Condensed", sans-serif)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9ca3af',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Kursplan herunterladen
            <span>↓</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes kk-pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes kk-badge-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
