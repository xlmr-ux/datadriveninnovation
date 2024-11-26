var particleAlphabet = { 
	Particle: function(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 3.5;
		this.draw = function(ctx) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, this.radius, this.radius);
			ctx.restore();
		};
	},
	init: function() {
		particleAlphabet.canvas = document.querySelector('canvas');
		particleAlphabet.ctx = particleAlphabet.canvas.getContext('2d');
		particleAlphabet.W = window.innerWidth;
		particleAlphabet.H = window.innerHeight;
		particleAlphabet.particlePositions = [];
		particleAlphabet.particles = [];
		particleAlphabet.tmpCanvas = document.createElement('canvas');
		particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext('2d');

		particleAlphabet.canvas.width = particleAlphabet.W;
		particleAlphabet.canvas.height = particleAlphabet.H;

		setInterval(function() {
			particleAlphabet.changeText();
			particleAlphabet.getPixels(particleAlphabet.tmpCanvas, particleAlphabet.tmpCtx);
		}, 2000);

		particleAlphabet.makeParticles(1200);
		particleAlphabet.animate();
	}, 
	currentIndex: 0,
	textArray: ["AFRICA", "TECHNOLOGIES"],
	changeText: function() {
		particleAlphabet.currentText = particleAlphabet.textArray[particleAlphabet.currentIndex];
		particleAlphabet.currentIndex = (particleAlphabet.currentIndex + 1) % particleAlphabet.textArray.length;
	},
	makeParticles: function(num) {
		for (var i = 0; i <= num; i++) {
			particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 - 200));
		}
	},
	getPixels: function(canvas, ctx) {
		var keyword = particleAlphabet.currentText,
			gridX = 6,
			gridY = 6;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.fillStyle = 'white';
		ctx.font = 'italic bold 150px Noto Serif';
		ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2);
		var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var buffer32 = new Uint32Array(idata.data.buffer);
		particleAlphabet.particlePositions = [];
		for (var y = 0; y < canvas.height; y += gridY) {
			for (var x = 0; x < canvas.width; x += gridX) {
				if (buffer32[y * canvas.width + x]) {
					particleAlphabet.particlePositions.push({x: x, y: y});
				}
			}
		}
	},
	animateParticles: function() {
		var p, pPos;
		for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
			p = particleAlphabet.particles[i];
			pPos = particleAlphabet.particlePositions[i];
			if (particleAlphabet.particles.indexOf(p) === particleAlphabet.particlePositions.indexOf(pPos)) {
				p.x += (pPos.x - p.x) * 0.3;
				p.y += (pPos.y - p.y) * 0.3;
				p.draw(particleAlphabet.ctx);
			}
		}
	},
	animate: function() {
		requestAnimationFrame(particleAlphabet.animate);
		particleAlphabet.ctx.fillStyle = 'rgba(0, 31, 63, 0.8)'; // Dark blue background
		particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
		particleAlphabet.animateParticles();
	}
};

window.onload = particleAlphabet.init;
