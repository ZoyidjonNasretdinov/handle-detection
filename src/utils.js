// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: 'yellow', size: 15 },
  1: { color: 'gold', size: 6 },
  2: { color: 'green', size: 10 },
  3: { color: 'gold', size: 6 },
  4: { color: 'gold', size: 6 },
  5: { color: 'purple', size: 10 },
  6: { color: 'gold', size: 6 },
  7: { color: 'gold', size: 6 },
  8: { color: 'gold', size: 6 },
  9: { color: 'blue', size: 10 },
  10: { color: 'gold', size: 6 },
  11: { color: 'gold', size: 6 },
  12: { color: 'gold', size: 6 },
  13: { color: 'red', size: 10 },
  14: { color: 'gold', size: 6 },
  15: { color: 'gold', size: 6 },
  16: { color: 'gold', size: 6 },
  17: { color: 'orange', size: 10 },
  18: { color: 'gold', size: 6 },
  19: { color: 'gold', size: 6 },
  20: { color: 'gold', size: 6 },
};

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction, index) => {
      const landmarks = prediction.landmarks;

      // Draw finger connections
      Object.keys(fingerJoints).forEach((finger) => {
        const joints = fingerJoints[finger];
        for (let i = 0; i < joints.length - 1; i++) {
          const [x1, y1] = landmarks[joints[i]];
          const [x2, y2] = landmarks[joints[i + 1]];

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = index === 0 ? 'aqua' : 'magenta'; // Different colors for left/right hands
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      });

      // Draw landmarks
      landmarks.forEach((landmark, i) => {
        const [x, y] = landmark;
        ctx.beginPath();
        ctx.arc(x, y, style[i].size, 0, 3 * Math.PI);
        ctx.fillStyle = style[i].color;
        ctx.fill();
      });
    });
  }
};
