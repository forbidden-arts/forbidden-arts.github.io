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

document.addEventListener('alpine:init', () => {
	Alpine.data('carousel', () => ({
		active: 0,
		autorotate: true,
		autorotateTiming: 7000,
		items: [
			{
				img: 'world-user-01.jpg',
				alt: 'Testimonial 01',
				quote: '“ I feel grateful that Open PRO pushed me to expand my horizons and strive to accomplish more, not only in my career but in education as well.“',
				name: 'Darya Semenova',
				role: 'Backend Developer'
			},
			{
				img: 'world-user-02.jpg',
				alt: 'Testimonial 02',
				quote: '“ Not only in my career but in education as well, I feel grateful that Open PRO pushed me to expand my horizons and strive to accomplish more.“',
				name: 'Greg Sebastian',
				role: 'Head of Design'
			},
			{
				img: 'world-user-03.jpg',
				alt: 'Testimonial 03',
				quote: '“ I feel grateful that Open PRO pushed me to expand my horizons and strive to accomplish more, not only in my career but in education as well.“',
				name: 'Dominik Prasad',
				role: 'Backend Lead'
			}
		],
		init() {
			if (this.autorotate) {
				this.autorotateInterval = setInterval(() => {
					this.active = this.active + 1 === this.items.length ? 0 : this.active + 1
				}, this.autorotateTiming)
			}
			this.$watch('active', callback => this.heightFix())
		},
		stopAutorotate() {
			clearInterval(this.autorotateInterval)
			this.autorotateInterval = null
		},
		heightFix() {
			this.$nextTick(() => {
				this.$refs.testimonials.style.height = this.$refs.testimonials.children[this.active + 1].offsetHeight + 'px'
			})
		}
	}))
})