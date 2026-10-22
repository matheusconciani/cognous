import { animate, random } from 'animejs';

export const triggerSchoolCelebration = (originX?: number, originY?: number) => {
  // Respect prefers-reduced-motion
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = 28;
  const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F97316'];
  const symbols = ['★', '✦', '●', '▲', '✿', '✏️', '✨'];

  const x = originX ?? window.innerWidth / 2;
  const y = originY ?? window.innerHeight / 2;

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const elements: HTMLElement[] = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    el.textContent = symbol;
    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = color;
    el.style.fontSize = `${16 + Math.random() * 18}px`;
    el.style.fontWeight = 'bold';
    el.style.userSelect = 'none';
    el.style.transform = 'translate(-50%, -50%)';

    container.appendChild(el);
    elements.push(el);
  }

  animate(elements, {
    translateX: () => random(-180, 180),
    translateY: () => random(-220, 120),
    scale: [0.2, 1.4, 0],
    rotate: () => random(-360, 360),
    opacity: [1, 1, 0],
    duration: 1000,
    ease: 'outExpo',
    onComplete: () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    },
  });
};
