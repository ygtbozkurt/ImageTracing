AFRAME.registerComponent('gesture-control', {
    init: function() {
        this.initialScale = this.el.getAttribute('scale').clone();
        this.scaleFactor = 1;
        this.isDragging = false;
        const el = this.el;

        // Döndürme için tek parmak
        el.addEventListener('onefingermove', (e) => {
            if(this.isDragging) return;
            
            const rotation = el.getAttribute('rotation');
            el.setAttribute('rotation', {
                y: rotation.y + e.detail.positionChange.x * 3,
                x: rotation.x,
                z: rotation.z
            });
        });

        // Zoom için iki parmak
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

        // Taşıma için basılı tutma
        el.addEventListener('grab-start', () => {
            this.isDragging = true;
        });

        el.addEventListener('grab-end', () => {
            this.isDragging = false;
        });

        el.addEventListener('pan', (e) => {
            if(!this.isDragging) return;
            
            const position = el.getAttribute('position');
            const sensitivity = 0.005;
            
            el.setAttribute('position', {
                x: position.x + e.detail.deltaX * sensitivity,
                y: position.y - e.detail.deltaY * sensitivity,
                z: position.z
            });
        });
    }
});