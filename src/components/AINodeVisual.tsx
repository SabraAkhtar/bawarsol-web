import React, { useEffect, useRef } from 'react';

export const AINodeVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node definitions
    interface Node {
      x: number;
      y: number;
      radius: number;
      label: string;
      color: string;
      vx: number;
      vy: number;
      pulse: number;
    }

    const labels = [
      'Agentic AI',
      'LLM Router',
      'RAG Vector DB',
      'Vision YOLO',
      'NLP Pipeline',
      'Auto Tool Call',
      'PostgreSQL',
      'Human Guardrail',
    ];

    const colors = ['#00F0FF', '#00A3FF', '#38BDF8', '#818CF8', '#0066FF'];

    const nodes: Node[] = Array.from({ length: 14 }).map((_, i) => ({
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 100) + 50,
      radius: Math.random() * 4 + 4,
      label: labels[i % labels.length],
      color: colors[i % colors.length],
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Data packet animations along connections
    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
    }

    const packets: Packet[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 40 || node.x > width - 40) node.vx *= -1;
        if (node.y < 40 || node.y > height - 40) node.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.35;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Spawn packet occasionally
            if (Math.random() < 0.005) {
              packets.push({
                fromIndex: i,
                toIndex: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.01,
                color: nodes[i].color,
              });
            }
          }
        }
      }

      // Update and draw packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        const from = nodes[packet.fromIndex];
        const to = nodes[packet.toIndex];

        if (from && to) {
          const px = from.x + (to.x - from.x) * packet.progress;
          const py = from.y + (to.y - from.y) * packet.progress;

          ctx.fillStyle = packet.color;
          ctx.shadowColor = packet.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (packet.progress >= 1) {
          packets.splice(p, 1);
        }
      }

      // Draw nodes and badges
      nodes.forEach((node, idx) => {
        const currentRadius = node.radius + Math.sin(node.pulse) * 1.5;

        // Glow
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label pill on key nodes
        if (idx < 8) {
          ctx.font = '500 10px sans-serif';
          const textWidth = ctx.measureText(node.label).width;
          const padX = 8;

          ctx.fillStyle = 'rgba(5, 5, 5, 0.9)';
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
          ctx.lineWidth = 1;

          const rectX = node.x - textWidth / 2 - padX;
          const rectY = node.y + currentRadius + 8;
          const rectW = textWidth + padX * 2;
          const rectH = 18;
          const r = 4;

          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(rectX, rectY, rectW, rectH, r);
          } else {
            ctx.moveTo(rectX + r, rectY);
            ctx.lineTo(rectX + rectW - r, rectY);
            ctx.quadraticCurveTo(rectX + rectW, rectY, rectX + rectW, rectY + r);
            ctx.lineTo(rectX + rectW, rectY + rectH - r);
            ctx.quadraticCurveTo(rectX + rectW, rectY + rectH, rectX + rectW - r, rectY + rectH);
            ctx.lineTo(rectX + r, rectY + rectH);
            ctx.quadraticCurveTo(rectX, rectY + rectH, rectX, rectY + rectH - r);
            ctx.lineTo(rectX, rectY + r);
            ctx.quadraticCurveTo(rectX, rectY, rectX + r, rectY);
            ctx.closePath();
          }
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#F0F0F0';
          ctx.fillText(node.label, rectX + padX, rectY + 13);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden bg-slate-50/90 border border-slate-200 shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-50/90 backdrop-blur px-3 py-1.5 rounded-full border border-blue-600/30 text-xs text-blue-600 font-medium shadow-md">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
        <span>Live Neural Workflow Swarm</span>
      </div>
    </div>
  );
};
