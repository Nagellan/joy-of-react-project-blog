'use client';
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import { motion } from 'motion/react';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();

  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(null);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    return () => {
      window.clearInterval(intervalId);
    }
  }, [intervalId])

  function handlePlay() {
    setIntervalId(
      window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000)
    )
  }

  function handlePause() {
    window.clearInterval(intervalId);
    setIntervalId(null);
  }

  function handleReset() {
    window.clearInterval(intervalId);
    setIntervalId(null);
    setTimeElapsed(0);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  layoutId={`outline-${id}`}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {intervalId === null ? (
            <button onClick={handlePlay}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          ) : (
            <button onClick={handlePause}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
