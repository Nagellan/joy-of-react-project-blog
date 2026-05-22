'use client';
import React from 'react';
import { MotionConfig } from 'motion/react';

function MotionProvider({ children }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}

export default MotionProvider;
