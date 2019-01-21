import {
  assert,
} from 'ts-assertions';
import {
  isValidVolume,
} from './isValidVolume';

export function drawVolumeLevel(options: {
  ctx: CanvasRenderingContext2D,
  value: number,
  width: number,
  height: number,
  color?: string,
})
{
  assert(options);

  const {
    color,
    ctx,
    height,
    value,
    width,
  } = options;

  assert(ctx);
  assert(isValidVolume(value));
  assert(width);
  assert(height);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color || 'rgb(255, 0, 0)';
  ctx.fillRect(
    0,
    height * (1 - value),
    width,
    height,
  );
}