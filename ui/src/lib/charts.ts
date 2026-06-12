// Pure, framework-agnostic canvas drawing helpers ported from the original
// drawSparkline / drawPie. They stay DPR-correct exactly as before.

export function drawSparkline(
  canvas: HTMLCanvasElement,
  points: number[],
  color: string,
): void {
  const ctx = canvas.getContext("2d");
  const parent = canvas.parentElement;
  if (!ctx || !parent) return;

  const dpr = window.devicePixelRatio || 1;
  const width = parent.offsetWidth;
  const height = parent.offsetHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const step = width / (points.length - 1);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  points.forEach((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, color + "15");
  grad.addColorStop(1, color + "00");
  ctx.fillStyle = grad;
  ctx.fill();
}

export function drawPie(canvas: HTMLCanvasElement, data: number[]): void {
  const ctx = canvas.getContext("2d");
  const parent = canvas.parentElement;
  if (!ctx || !parent) return;

  const dpr = window.devicePixelRatio || 1;
  const width = parent.offsetWidth;
  const height = parent.offsetHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(dpr, dpr);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 2;

  const colors = [
    "rgba(92, 224, 208, 0.25)",
    "rgba(92, 224, 208, 0.45)",
    "rgba(92, 224, 208, 0.65)",
    "rgba(92, 224, 208, 1)",
  ];

  let currentAngle = -0.5 * Math.PI;
  data.forEach((val, i) => {
    const sliceAngle = 2 * Math.PI * val;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    ctx.strokeStyle = "#141819";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    currentAngle += sliceAngle;
  });

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.72, 0, 2 * Math.PI);
  ctx.fillStyle = "#141819";
  ctx.fill();
}
