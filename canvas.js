const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// dimentions
const CANVAS_SIZE = 500;

// colors
const LABEL_COLOR = '#000';
const DIAL_COLOR = '#eb3474';
const SECOND_COLOR = '#eb3474';
const MINUTE_COLOR = '#000';
const HOUR_COLOR = '#000';

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

class Clock {
	draw = () => {
		ctx.save();

		const time = new Date();
		const hour = time.getHours() % 12;
		const minute = time.getMinutes();
		const second = time.getSeconds();

		ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
		ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);

		ctx.save();

		// Labels
		ctx.lineWidth = CANVAS_SIZE * 0.01;
		ctx.strokeStyle = LABEL_COLOR;
		for (let i = 0; i < 60; i++) {
			ctx.beginPath();
			ctx.moveTo(0, -CANVAS_SIZE * 0.48 + 5);
			if (i % 5 == 0) {
				ctx.lineTo(0, -CANVAS_SIZE * 0.45 + 10);
			} else {
				ctx.lineTo(0, -CANVAS_SIZE * 0.47 + 4);
			}
			ctx.stroke();
			ctx.rotate(Math.PI * 2 / 60);
		}

		ctx.restore();
		ctx.save();

		// Outer circle of clock
		ctx.beginPath();
		ctx.lineWidth = CANVAS_SIZE * 0.02;
		ctx.strokeStyle = DIAL_COLOR;
		ctx.arc(0, 0, CANVAS_SIZE / 2 - 5, 0, Math.PI * 2, false);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Hour needle
		ctx.beginPath();
		ctx.lineWidth = CANVAS_SIZE * 0.02;
		ctx.strokeStyle = HOUR_COLOR;
		ctx.rotate(Math.PI * 2 / 12 * (hour + minute / 60 + second / 3600));
		ctx.moveTo(0, CANVAS_SIZE * 0.04);
		ctx.lineTo(0, -CANVAS_SIZE * 0.25);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Minute clock
		ctx.beginPath();
		ctx.lineWidth = CANVAS_SIZE * 0.01;
		ctx.strokeStyle = MINUTE_COLOR;
		ctx.rotate(Math.PI * 2 / 60 * (minute + second / 60));
		ctx.moveTo(0, CANVAS_SIZE * 0.04);
		ctx.lineTo(0, -CANVAS_SIZE * 0.38);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Second clock
		ctx.beginPath();
		ctx.lineWidth = CANVAS_SIZE * 0.003 + 1;
		ctx.strokeStyle = SECOND_COLOR;
		ctx.rotate(Math.PI * 2 / 60 * second);
		ctx.moveTo(0, CANVAS_SIZE * 0.07);
		ctx.lineTo(0, -CANVAS_SIZE * 0.42);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Center Dot
		ctx.beginPath();
		ctx.fillStyle = SECOND_COLOR;
		ctx.arc(0, 0, CANVAS_SIZE * 0.02, 0, Math.PI * 2, false);
		ctx.fill();

		ctx.restore();

		ctx.restore();
	}

	animate = () => {
		this.draw();
		window.requestAnimationFrame(this.animate);
	}
}

const clock = new Clock();
clock.animate();