import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties; 
}

export default function Card({ children, style } : CardProps) {
  return <div className="card" style={style}>{children}</div>;
};
