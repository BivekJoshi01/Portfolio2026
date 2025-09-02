import React, { useState, useEffect, useRef } from 'react';
import './MouseMovementAvatar.css';

const MouseMovementAvatar = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [legMovement, setLegMovement] = useState(0);
  const [eyeRotation, setEyeRotation] = useState(0);
  const lastMouseMoveTime = useRef(Date.now());
  const animationRef = useRef(null);
  const movementTimeout = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      lastMouseMoveTime.current = Date.now();
      
      if (!isVisible) setIsVisible(true);
      if (!isMoving) setIsMoving(true);
      
      // Clear any existing timeout and set a new one
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }
      movementTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movementTimeout.current) {
        clearTimeout(movementTimeout.current);
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, isMoving]);

  useEffect(() => {
    const moveAvatar = () => {
      setPosition(prev => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only move if distance is significant
        if (distance > 2) {
          return {
            x: prev.x + dx * 0.08, // Slower movement for more realism
            y: prev.y + dy * 0.08
          };
        }
        return prev;
      });

      // Calculate eye rotation based on mouse position
      const dx = targetPosition.x - position.x;
      const dy = targetPosition.y - position.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setEyeRotation(angle);

      // Animate legs when moving
      if (isMoving) {
        setLegMovement(prev => (prev + 12) % 360);
      }

      animationRef.current = requestAnimationFrame(moveAvatar);
    };

    animationRef.current = requestAnimationFrame(moveAvatar);
    return () => cancelAnimationFrame(animationRef.current);
  }, [position, targetPosition, isMoving]);

  // Calculate leg positions with more realistic articulation
  const calculateLegPosition = (side, index, totalLegs, movementPhase) => {
    const angle = (index / (totalLegs - 1)) * Math.PI / 2 - Math.PI / 4;
    const legLength = 30 + index * 3;
    const movement = Math.sin(movementPhase + index * 0.5) * 10;
    
    return {
      x1: side === 'left' ? -5 : 5,
      y1: 0,
      x2: side === 'left' 
        ? -legLength * Math.cos(angle) - movement
        : legLength * Math.cos(angle) + movement,
      y2: legLength * Math.sin(angle) + movement
    };
  };

  return (
    <div 
      className="spider-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        transform: `rotate(${eyeRotation - 90}deg)`
      }}
    >
      {/* Spider Body with realistic segmentation */}
      <div className="spider-body">
        <div className="cephalothorax">
          <div className="eyes">
            <div className="eye-group main-eyes">
              <div className="eye left-main-eye" style={{ transform: `rotate(${-eyeRotation}deg)` }}>
                <div className="pupil"></div>
              </div>
              <div className="eye right-main-eye" style={{ transform: `rotate(${-eyeRotation}deg)` }}>
                <div className="pupil"></div>
              </div>
            </div>
            <div className="eye-group secondary-eyes">
              <div className="eye secondary-eye"></div>
              <div className="eye secondary-eye"></div>
              <div className="eye secondary-eye"></div>
              <div className="eye secondary-eye"></div>
            </div>
          </div>
        </div>
        <div className="abdomen">
          <div className="segmentation"></div>
          <div className="segmentation"></div>
          <div className="segmentation"></div>
        </div>
      </div>
      
      {/* Spider Legs with realistic joints */}
      <div className="legs-container">
        {/* Left legs */}
        {[0, 1, 2, 3].map(i => {
          const { x1, y1, x2, y2 } = calculateLegPosition('left', i, 4, legMovement * Math.PI / 180);
          return (
            <div key={`left-${i}`} className="leg left-leg" style={{ 
              transform: `translate(${x1}px, ${y1}px) rotate(${Math.atan2(y2, x2) * (180/Math.PI)}deg)`,
              width: `${Math.sqrt(x2*x2 + y2*y2)}px`
            }}>
              <div className="leg-joint"></div>
              <div className="leg-segment"></div>
            </div>
          );
        })}
        
        {/* Right legs */}
        {[0, 1, 2, 3].map(i => {
          const { x1, y1, x2, y2 } = calculateLegPosition('right', i, 4, legMovement * Math.PI / 180 + Math.PI);
          return (
            <div key={`right-${i}`} className="leg right-leg" style={{ 
              transform: `translate(${x1}px, ${y1}px) rotate(${Math.atan2(y2, -x2) * (180/Math.PI)}deg)`,
              width: `${Math.sqrt(x2*x2 + y2*y2)}px`
            }}>
              <div className="leg-joint"></div>
              <div className="leg-segment"></div>
            </div>
          );
        })}
      </div>
      
      {/* Subtle shadow for realism */}
      <div className="spider-shadow"></div>
    </div>
  );
};

export default MouseMovementAvatar;