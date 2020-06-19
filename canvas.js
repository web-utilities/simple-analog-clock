const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

class Clock {
	draw = () => {
		ctx.save();

		const time = new Date();
		const hour = time.getHours() % 12;
		const minute = time.getMinutes();
		const second = time.getSeconds();

		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

		ctx.save();

		// Labels
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#000';
		for (let i = 0; i < 60; i++) {
			ctx.beginPath();
			ctx.moveTo(0, -CANVAS_WIDTH / 2 + 15);
			if (i % 5 == 0) {
				ctx.lineTo(0, -CANVAS_WIDTH / 2 + 40);
			} else {
				ctx.lineTo(0, -CANVAS_WIDTH / 2 + 20);
			}
			ctx.stroke();
			ctx.rotate(Math.PI * 2 / 60);
		}

		ctx.restore();
		ctx.save();

		// Outer circle of clock
		ctx.beginPath();
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#eb3474';
		ctx.arc(0, 0, CANVAS_WIDTH / 2 - 5, 0, Math.PI * 2, false);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Hour needle
		ctx.beginPath();
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#000';
		ctx.rotate(Math.PI * 2 / 12 * (hour + minute / 60 + second / 3600));
		ctx.moveTo(0, 15);
		ctx.lineTo(0, -80);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Minute clock
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#000';
		ctx.rotate(Math.PI * 2 / 60 * (minute + second / 60));
		ctx.moveTo(0, 15);
		ctx.lineTo(0, -100);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Second clock
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#eb3474';
		ctx.rotate(Math.PI * 2 / 60 * second);
		ctx.moveTo(0, 20);
		ctx.lineTo(0, -120);
		ctx.stroke();

		ctx.restore();
		ctx.save();

		// Center Dot
		ctx.beginPath();
		ctx.fillStyle = '#eb3474';
		ctx.arc(0, 0, 7, 0, Math.PI * 2, false);
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