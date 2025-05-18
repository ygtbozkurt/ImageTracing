AFRAME.registerComponent('gesture-control', {
    init: function () {
      this.initialScale = this.el.getAttribute('scale').clone();
      this.scaleFactor = 1;
      this.isDragging = false;
      const el = this.el;
  
      // Döndürme
      el.addEventListener('onefingermove', (e) => {
        if (this.isDragging) return;
        const rotation = el.getAttribute('rotation');
        el.setAttribute('rotation', {
          x: rotation.x,
          y: rotation.y + e.detail.positionChange.x * 3,
          z: rotation.z
        });
      });
  
      // Zoom
      el.addEventListener('twofingerstart', () => {
        this.scaleFactor = el.getAttribute('scale').x / this.initialScale.x;
      });
  
      el.addEventListener('twofingermove', (e) => {
        this.scaleFactor *= 1 + (e.detail.spreadChange / 200);
        this.scaleFactor = Math.min(Math.max(0.2, this.scaleFactor), 5);
        el.setAttribute('scale', {
          x: this.initialScale.x * this.scaleFactor,
          y: this.initialScale.y * this.scaleFactor,
          z: this.initialScale.z * this.scaleFactor
        });
      });
  
      // Taşıma
      el.addEventListener('grab-start', () => {
        this.isDragging = true;
      });
  
      el.addEventListener('grab-end', () => {
        this.isDragging = false;
      });
  
      el.addEventListener('pan', (e) => {
        if (!this.isDragging) return;
        const position = el.getAttribute('position');
        el.setAttribute('position', {
          x: position.x + e.detail.deltaX * 0.005,
          y: position.y - e.detail.deltaY * 0.005,
          z: position.z
        });
      });
    }
  });
  