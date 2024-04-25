AOS.init({
	once: true,
	disable: 'phone',
	duration: 600,
	easing: 'ease-out-sine',
});

document.addEventListener('alpine:init', () => {
	Alpine.data('counter', (target = 0, duration = 3000) => ({
		startTimestamp: null,
		step: null,
		rawValue: 0,
		counterValue: 0,
		target: target,
		precision: (target % 1 === 0) ? 0 : (target.toString().split('.')[1] || []).length,
		animationRequestId: null,
		animationCompleted: false,
		observer: null,
		init() {
			// Intersection observer to watch visibility
			this.observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					// Check if element is in view
					if (entry.isIntersecting && !this.animationCompleted) {
						this.startAnimation()
					}
				})
			})
			this.observer.observe(this.$el)
		},
		startAnimation() {
			this.step = (timestamp) => {
				if (!this.startTimestamp) this.startTimestamp = timestamp
				const progress = Math.min((timestamp - this.startTimestamp) / duration, 1)
				const easedProgress = this.easeOut(progress)
				this.rawValue = parseFloat((easedProgress * this.target).toFixed(this.precision))
				this.counterValue = this.rawValue.toFixed(this.precision)
				if (progress < 1) {
					this.animationRequestId = window.requestAnimationFrame(this.step)
				} else {
					this.animationCompleted = true
				}
			}
			this.animationRequestId = window.requestAnimationFrame(this.step);
		},
		easeOut(t) {
			return 1 - Math.pow(1 - t, 5)
		},
		destroy() {
			// Detach the handler, avoiding memory and side-effect leakage
			this.animationRequestId && window.cancelAnimationFrame(this.step)
			this.observer && this.observer.disconnect()
		},
	}))
})