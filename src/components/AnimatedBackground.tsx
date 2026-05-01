import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    const mouse = { x: -1000, y: -1000, radius: 250 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 12000); 
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Slow, deliberate movement
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 1.5 + 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        let dxMouse = mouse.x - p.x;
        let dyMouse = mouse.y - p.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        // Interactive mouse connection and repulsion
        if (distMouse < mouse.radius) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(67, 56, 202, ${0.4 * (1 - distMouse / mouse.radius)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Repulsion physics: move away from mouse
          let force = (mouse.radius - distMouse) / mouse.radius;
          let dirX = dxMouse / distMouse;
          let dirY = dyMouse / distMouse;
          
          // Push particle away
          p.x -= dirX * force * 3;
          p.y -= dirY * force * 3;
        }

        // Connect with other particles
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx2 = p.x - p2.x;
          let dy2 = p.y - p2.y;
          let dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < 120) {
            ctx.beginPath();
            // Default lines are subtle brand-primary, near mouse they light up blue
            if (distMouse < mouse.radius) {
              ctx.strokeStyle = `rgba(67, 56, 202, ${0.2 * (1 - dist2 / 120)})`;
            } else {
              ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 * (1 - dist2 / 120)})`;
            }
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes on top of lines
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        let dxMouse = mouse.x - p.x;
        let dyMouse = mouse.y - p.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (distMouse < mouse.radius) {
          ctx.fillStyle = `rgba(67, 56, 202, ${Math.max(0.2, 1 - distMouse / mouse.radius)})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(67, 56, 202, 0.8)';
        } else {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-brand-light">
      <NeuralNetwork />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-accent/5 blur-[140px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.6, 1],
          x: [0, -100, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-brand-primary/5 blur-[180px] rounded-full"
      />



      {/* Pulse Nodes at Intersections */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 2, 3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut"
          }}
          className="absolute w-4 h-4 bg-brand-accent/20 rounded-full blur-sm"
          style={{
            left: `${15 + (i * 15) % 70}%`,
            top: `${10 + (i * 20) % 80}%`,
          }}
        />
      ))}

      {/* Floating Data Nodes (Refined) */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -250],
            height: [20, 80, 20]
          }}
          transition={{
            duration: 8 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
          className="absolute w-[1px] bg-gradient-to-t from-transparent via-brand-accent/50 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${-10}%`,
          }}
        />
      ))}

      {/* Data Scanner Sweep */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 5
        }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand-accent/5 to-transparent skew-x-12"
      />


    </div>
  );
}
