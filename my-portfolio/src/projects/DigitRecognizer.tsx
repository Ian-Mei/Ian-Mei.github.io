import { useRef, useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

const MODEL_URL = '/digit_model/model.json';

const CANVAS_SIZE = 280;
const MODEL_SIZE = 28;

export default function DigitRecognizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [modelError, setModelError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidences, setConfidences] = useState<number[] | null>(null);

  useEffect(() => {
    tf.loadLayersModel(MODEL_URL)
      .then(setModel)
      .catch((err) => {
        console.error('Failed to load model:', err);
        setModelError('Could not load model. Make sure public/digit_model/ exists.');
      });
  }, []);

  const clearCanvas = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setPrediction(null);
    setConfidences(null);
  }, []);

  useEffect(() => { clearCanvas(); }, [clearCanvas]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const src = 'touches' in e ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing]);

  const stopDraw = useCallback(() => setIsDrawing(false), []);

  const predict = useCallback(async () => {
    if (!model || !canvasRef.current) return;

    const offscreen = document.createElement('canvas');
    offscreen.width = MODEL_SIZE;
    offscreen.height = MODEL_SIZE;
    const offCtx = offscreen.getContext('2d')!;
    offCtx.drawImage(canvasRef.current, 0, 0, MODEL_SIZE, MODEL_SIZE);
    const { data } = offCtx.getImageData(0, 0, MODEL_SIZE, MODEL_SIZE);

    const scores = tf.tidy(() => {
      const pixels = new Float32Array(MODEL_SIZE * MODEL_SIZE);
      for (let i = 0; i < pixels.length; i++) {
        const gray = (data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / 3;
        pixels[i] = (255 - gray) / 255;
      }
      const input = tf.tensor(pixels, [1, MODEL_SIZE, MODEL_SIZE, 1]);
      return model.predict(input) as tf.Tensor;
    });

    const values = await scores.data();
    scores.dispose();

    const valuesArr = Array.from(values);
    const best = valuesArr.indexOf(Math.max(...valuesArr));
    setPrediction(best);
    setConfidences(valuesArr);
  }, [model]);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Digit Recognizer</h2>

      {modelError && <p style={styles.error}>{modelError}</p>}
      {!model && !modelError && <p style={styles.loading}>Loading model...</p>}

      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={styles.canvas}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />

      <div style={styles.buttons}>
        <button style={styles.btn} onClick={clearCanvas}>Clear</button>
        <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={predict} disabled={!model}>
          Predict
        </button>
      </div>

      {prediction !== null && confidences && (
        <div style={styles.result}>
          <span style={styles.digit}>{prediction}</span>
          <div style={styles.bars}>
            {confidences.map((c, i) => (
              <div key={i} style={styles.barRow}>
                <span style={styles.barLabel}>{i}</span>
                <div style={styles.barBg}>
                  <div style={{
                    ...styles.barFill,
                    width: `${(c * 100).toFixed(1)}%`,
                    background: i === prediction ? '#4caf50' : '#90caf9',
                  }} />
                </div>
                <span style={styles.barPct}>{(c * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, gap: 16 },
  title: { margin: 0 },
  loading: { color: '#888', fontSize: 14 },
  error: { color: '#d32f2f', fontSize: 14 },
  canvas: { border: '2px solid #333', cursor: 'crosshair', touchAction: 'none', borderRadius: 4 },
  buttons: { display: 'flex', gap: 12 },
  btn: { padding: '8px 20px', fontSize: 16, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', background: '#f5f5f5' },
  btnPrimary: { background: '#1976d2', color: '#fff', border: 'none' },
  result: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  digit: { fontSize: 72, fontWeight: 'bold', lineHeight: 1 },
  bars: { width: 260, display: 'flex', flexDirection: 'column', gap: 4 },
  barRow: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 },
  barLabel: { width: 12, textAlign: 'right', fontWeight: 'bold' },
  barBg: { flex: 1, height: 14, background: '#eee', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3, transition: 'width 0.2s' },
  barPct: { width: 42, textAlign: 'right', color: '#555' },
};
