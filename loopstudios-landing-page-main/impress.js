class SmoothScrollAnimator {
  constructor(options) {
    // Default options
    this.options = {
      container: '#container',
      items: '.item',
      ease: 0.1,
      maxSkew: 10,
      translateYAmount: 5, // Default translateY amount for images
      ...options
    };

    this.current = 0;
    this.target = 0;
    this.skew = 0;
    this.windowWidth = 0;
    this.containerHeight = 0;
    this.imageHeight = 0;

    this.container = document.querySelector(this.options.container);
    this.images = document.querySelectorAll(this.options.items);

    if (!this.container || this.images.length === 0) {
      console.error('Container or items not found');
      return;
    }

    this.init();
  }

  lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  transform(el, trans) {
    el.style.transform = trans;
  }

  setAnimation() {
    this.windowWidth = window.innerWidth;
    this.containerHeight = this.container.getBoundingClientRect().height;
    this.imageHeight = this.containerHeight / (this.windowWidth > 760 ? this.images.length / 2 : this.images.length);
    document.body.style.height = `${this.containerHeight}px`;

    this.smoothScroll();
  }

  smoothScroll() {
    this.current = this.lerp(this.current, this.target, this.options.ease);
    this.current = parseFloat(this.current.toFixed(2));
    this.skew = (this.target - this.current) * 0.15;

    if (Math.abs(this.skew) > this.options.maxSkew) {
      this.skew = this.options.maxSkew * Math.sign(this.skew);
    }

    this.target = window.scrollY;
    this.transform(this.container, `translateY(${-this.current}px) skewY(${this.skew}deg)`);
    this.updateImages();

    requestAnimationFrame(this.smoothScroll.bind(this));
  }

  updateImages() {
    let ratio = this.current / this.imageHeight;
    this.images.forEach((image, idx) => {
      let intersectionRatioIndex = this.windowWidth > 760 ? parseInt(idx / 2) : idx;
      let intersectionRatioValue = ratio - intersectionRatioIndex;
      this.transform(image, `translateY(${intersectionRatioValue * this.options.translateYAmount}px)`);
    });
  }

  onResize() {
    this.setAnimation();
  }

  init() {
    window.addEventListener('resize', this.onResize.bind(this));
    this.setAnimation();
  }
}

