AFRAME.registerComponent('gesture-control', {
    init: function () {
      const el = this.el;
      this.initialScale = el.getAttribute('scale') || { x: 1, y: 1, z: 1 };
      this.scaleFactor = 1;
      this.isDragging = false;
  
      // Döndürme
      el.addEventListener('onefingermove', (e) => {
        if (this.isDragging) return;
        const rotation = el.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
        el.setAttribute('rotation', {
          x: rotation.x,
          y: rotation.y + e.detail.positionChange.x * 3,
          z: rotation.z
        });
      });
  
      // Zoom
      el.addEventListener('twofingerstart', () => {
        const currentScale = el.getAttribute('scale');
        this.scaleFactor = currentScale.x / this.initialScale.x;
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
        const factor = 0.005;
        el.setAttribute('position', {
          x: position.x + e.detail.deltaX * factor,
          y: position.y - e.detail.deltaY * factor,
          z: position.z
        });
      });
    }
  });
  