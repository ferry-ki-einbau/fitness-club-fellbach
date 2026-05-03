import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Goal = 'masse' | 'fett' | 'kondition' | 'stress' | null;

interface GoalData {
  id: Goal;
  emoji: string;
  title: string;
  subtitle: string;
  weeks: number;
  weeksLabel: string;
}

const GOALS: GoalData[] = [
  {
    id: 'masse',
    emoji: '💪',
    title: 'MASSE AUFBAUEN',
    subtitle: 'Mehr Muskeln, mehr Volumen',
    weeks: 12,
    weeksLabel: 'ersten Muskelmasse-Zuwachs',
  },
  {
    id: 'fett',
    emoji: '🔥',
    title: 'FETT VERLIEREN',
    subtitle: 'Lean werden, Körper definieren',
    weeks: 8,
    weeksLabel: 'sichtbare Definition',
  },
  {
    id: 'kondition',
    emoji: '🏃',
    title: 'KONDITION STEIGERN',
    subtitle: 'Ausdauer, Energie, Fitness',
    weeks: 6,
    weeksLabel: 'spürbar mehr Ausdauer',
  },
  {
    id: 'stress',
    emoji: '🧘',
    title: 'STRESS ABBAUEN',
    subtitle: 'Mentale Stärke, Regeneration',
    weeks: 3,
    weeksLabel: 'besseren Schlaf & weniger Stress',
  },
];

const RECOMMENDATIONS: Record<NonNullable<Goal>, (days: number) => string[]> = {
  masse: (days) => {
    if (days <= 3) {
      return [
        'Ganzkörper-Training 3× pro Woche mit Fokus auf Grundübungen (Kniebeugen, Bankdrücken, Kreuzheben)',
        'Proteinzufuhr mind. 1,6g pro kg Körpergewicht — Hühnchen, Eier, Whey nach dem Training',
        'Kaloriensurplus von 200–300 kcal täglich für sauberen Muskelaufbau ohne unnötig Fett',
      ];
    }
    return [
      'Push/Pull/Legs Split — maximale Muskelgruppen-Frequenz für schnellen Aufbau',
      'Progressive Überlastung: jede Woche 2,5kg mehr Gewicht oder 1–2 Reps mehr',
      'Ausreichend Schlaf (7–9h) ist entscheidend — 80% der Muskeln wachsen in der Nacht',
    ];
  },
  fett: (days) => {
    if (days <= 3) {
      return [
        'HIIT-Training 2× pro Woche kombiniert mit 1× Kraft — maximale Fettverbrennung in weniger Zeit',
        'Kaloriendefizit 300–400 kcal täglich — kein Crash-Diät, sonst verlierst du Muskeln',
        'Eiweißreiche Ernährung hält dich satt und schützt deine Muskelmasse beim Abnehmen',
      ];
    }
    return [
      '4–5 Trainingstage: 3× Kraft + 1–2× Cardio für optimale Fettverbrennung',
      'Krafttraining behält deine Muskeln beim Abnehmen — mehr Muskeln = mehr Kalorien im Ruhezustand',
      'Zone 2 Cardio (locker laufen, Fahrrad) verbrennt Fett ohne dich auszulaugen',
    ];
  },
  kondition: (days) => {
    if (days <= 3) {
      return [
        '2× Ausdauer (Laufen, Rad, Rudern) + 1× Kraft für ein starkes, leistungsfähiges Herz',
        'Intervallmethode: 30s Vollgas, 90s locker — verbessert deine Kondition 3× schneller',
        'Nach 4 Wochen: Distanzen oder Intensität erhöhen, damit dein Körper sich weiterentwickelt',
      ];
    }
    return [
      'Kombination aus HIIT, Zone 2 Cardio und Kraft — dein Körper wird von allen Seiten gefordert',
      'VO2max steigern durch Intervallläufe — nach 6 Wochen merkst du den Unterschied bei jedem Treppensteigen',
      'Aktive Erholung: Spazierengehen, leichtes Stretching an Ruhetagen für schnellere Regeneration',
    ];
  },
  stress: (days) => {
    if (days <= 3) {
      return [
        'Yoga oder Mobility-Training 1× pro Woche senkt Cortisol messbar nach nur 2 Sitzungen',
        'Kraft- oder Cardiotraining löst nach 20 Minuten Endorphine aus — natürliches Anti-Stress-Mittel',
        'Atemübungen direkt nach dem Training: 4s ein, 7s halten, 8s aus — aktiviert das Ruhesystem',
      ];
    }
    return [
      'Strukturierte Trainingsroutine gibt dem Körper Sicherheit und reduziert Angstzustände',
      'Kombination aus Kraft + Yoga: Körper stark machen, Geist beruhigen — die wirksamste Methode',
      'Digitale Auszeit beim Training: Handy weg, nur du und die Übung — 45 Minuten echte Pause vom Stress',
    ];
  },
};

const RESULT_HEADLINES: Record<NonNullable<Goal>, (days: number) => string> = {
  masse: (days) => `DEIN ${days}-TAGE MASSE-PLAN`,
  fett: (days) => `DEIN ${days}-TAGE FAT-LOSS-PLAN`,
  kondition: (days) => `DEIN ${days}-TAGE KONDITIONS-PLAN`,
  stress: (days) => `DEIN ${days}-TAGE BALANCE-PLAN`,
};

export default function ZielRechner() {
  const [selectedGoal, setSelectedGoal] = useState<Goal>(null);
  const [days, setDays] = useState(3);

  const goalData = GOALS.find((g) => g.id === selectedGoal);
  const showResult = selectedGoal !== null;
  const recommendations = selectedGoal ? RECOMMENDATIONS[selectedGoal](days) : [];
  const resultHeadline = selectedGoal ? RESULT_HEADLINES[selectedGoal](days) : '';

  return (
    <section
      style={{
        background: '#0F1419',
        padding: '100px 24px',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
          DEIN ZIEL
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
            marginBottom: '56px',
            letterSpacing: '-0.5px',
          }}
        >
          WAS WILLST DU ERREICHEN?
        </motion.h2>

        {/* Step 1: Goal Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {GOALS.map((goal, i) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedGoal(goal.id)}
                style={{
                  background: isSelected ? 'rgba(196, 69, 82, 0.12)' : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${isSelected ? '#C44552' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  padding: '28px 20px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isSelected
                    ? '0 0 24px rgba(196, 69, 82, 0.25), inset 0 0 0 1px rgba(196,69,82,0.15)'
                    : 'none',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                  outline: 'none',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{goal.emoji}</div>
                <div
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: isSelected ? '#C44552' : '#F5F0E8',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                    transition: 'color 0.2s',
                  }}
                >
                  {goal.title}
                </div>
                <div
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(245,240,232,0.55)',
                    lineHeight: 1.4,
                  }}
                >
                  {goal.subtitle}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Step 2: Days Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '15px',
                color: 'rgba(245,240,232,0.7)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Wie viele Tage pro Woche?
            </span>
            <span
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '28px',
                fontWeight: 700,
                color: '#C44552',
              }}
            >
              {days} {days === 1 ? 'Tag' : 'Tage'}
            </span>
          </div>

          <input
            type="range"
            min={2}
            max={5}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            style={{
              width: '100%',
              appearance: 'none',
              height: '4px',
              borderRadius: '2px',
              background: `linear-gradient(to right, #C44552 0%, #C44552 ${((days - 2) / 3) * 100}%, rgba(255,255,255,0.15) ${((days - 2) / 3) * 100}%, rgba(255,255,255,0.15) 100%)`,
              cursor: 'pointer',
              outline: 'none',
              border: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            {[2, 3, 4, 5].map((d) => (
              <span
                key={d}
                style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '13px',
                  color: d === days ? '#C44552' : 'rgba(245,240,232,0.35)',
                  fontWeight: d === days ? 700 : 400,
                  transition: 'color 0.2s',
                }}
              >
                {d}x
              </span>
            ))}
          </div>
        </motion.div>

        {/* Step 3: Result Panel */}
        <AnimatePresence>
          {showResult && goalData && (
            <motion.div
              key={`${selectedGoal}-${days}`}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                background: 'rgba(10, 14, 20, 0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '4px solid #C44552',
                borderRadius: '12px',
                padding: '36px',
              }}
            >
              {/* Result Headline */}
              <h3
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: 'clamp(22px, 4vw, 32px)',
                  fontWeight: 700,
                  color: '#F5F0E8',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {resultHeadline}
              </h3>

              {/* Weeks counter */}
              <motion.p
                key={`weeks-${selectedGoal}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '14px',
                  color: '#B8924A',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '28px',
                }}
              >
                In {goalData.weeks} Wochen {goalData.weeksLabel}
              </motion.p>

              {/* Recommendations */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {recommendations.map((rec, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.1 }}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      marginBottom: '16px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#C44552',
                        marginTop: '8px',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '16px',
                        color: 'rgba(245,240,232,0.8)',
                        lineHeight: 1.5,
                      }}
                    >
                      {rec}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="#preise"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.45 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-block',
                  background: '#C44552',
                  color: '#F5F0E8',
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '14px 36px',
                  borderRadius: '6px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#E15464';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#C44552';
                }}
              >
                JETZT STARTEN
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slider thumb styles */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C44552;
          cursor: pointer;
          border: 2px solid #F5F0E8;
          box-shadow: 0 0 8px rgba(196,69,82,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C44552;
          cursor: pointer;
          border: 2px solid #F5F0E8;
          box-shadow: 0 0 8px rgba(196,69,82,0.5);
        }
      `}</style>
    </section>
  );
}
