class ThemePark {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.gridSize = 40;
        this.player = {
            x: 0,
            y: 0,
            color: 'blue',
            size: 30,
            sprite: this.createPlayerSprite()
        };
        this.attractions = [
            { x: 5, y: 5, draw: this.drawFerrisWheel.bind(this), name: 'Ferris Wheel', visited: false },
            { x: 10, y: 8, draw: this.drawCarousel.bind(this), name: 'Carousel', visited: false },
            { x: 15, y: 12, draw: this.drawRollerCoaster.bind(this), name: 'Roller Coaster', visited: false }
        ];
        this.setupKeyboardListeners();
        this.draw();
    }

    setupKeyboardListeners() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.player.y = Math.max(0, this.player.y - 1);
                    break;
                case 'ArrowDown':
                    this.player.y = Math.min(this.canvas.height / this.gridSize - 1, this.player.y + 1);
                    break;
                case 'ArrowLeft':
                    this.player.x = Math.max(0, this.player.x - 1);
                    break;
                case 'ArrowRight':
                    this.player.x = Math.min(this.canvas.width / this.gridSize - 1, this.player.x + 1);
                    break;
            }
            this.checkInteractions();
            this.draw();
        });
    }

    checkInteractions() {
        this.attractions.forEach(attraction => {
            if (this.player.x === attraction.x && this.player.y === attraction.y && !attraction.visited) {
                alert(`You have reached the ${attraction.name}!`);
                attraction.visited = true;
                this.updateGameStatus();
            }
        });
    }

    updateGameStatus() {
        const status = document.getElementById('gameStatus');
        status.textContent = `You have visited ${this.attractions.filter(a => a.visited).length} attractions.`;
    }

    drawGrid() {
        for (let x = 0; x < this.canvas.width; x += this.gridSize) {
            for (let y = 0; y < this.canvas.height; y += this.gridSize) {
                this.context.strokeStyle = '#ccc';
                this.context.strokeRect(x, y, this.gridSize, this.gridSize);
            }
        }
    }

    createPlayerSprite() {
        const spriteCanvas = document.createElement('canvas');
        const spriteContext = spriteCanvas.getContext('2d');
        spriteCanvas.width = this.player.size;
        spriteCanvas.height = this.player.size;

        // Draw the player (simplified as a stick figure with shading)
        spriteContext.fillStyle = this.player.color;
        spriteContext.beginPath();
        spriteContext.arc(this.player.size / 2, this.player.size / 2, this.player.size / 4, 0, Math.PI * 2);
        spriteContext.fill();

        spriteContext.strokeStyle = 'black';
        spriteContext.lineWidth = 2;
        spriteContext.beginPath();
        spriteContext.moveTo(this.player.size / 2, this.player.size * 0.75);
        spriteContext.lineTo(this.player.size / 2, this.player.size);
        spriteContext.stroke();

        spriteContext.beginPath();
        spriteContext.moveTo(this.player.size / 2, this.player.size * 0.85);
        spriteContext.lineTo(this.player.size * 0.65, this.player.size * 0.95);
        spriteContext.stroke();

        spriteContext.beginPath();
        spriteContext.moveTo(this.player.size / 2, this.player.size * 0.85);
        spriteContext.lineTo(this.player.size * 0.35, this.player.size * 0.95);
        spriteContext.stroke();

        return spriteCanvas;
    }

    drawPlayer() {
        this.context.drawImage(this.player.sprite, this.player.x * this.gridSize, this.player.y * this.gridSize);
    }

    drawFerrisWheel(x, y) {
        const { context, gridSize } = this;

        // Draw base
        context.fillStyle = 'gray';
        context.fillRect(x * gridSize + gridSize * 0.3, y * gridSize + gridSize * 0.8, gridSize * 0.4, gridSize * 0.2);

        // Draw wheel with 3D effect
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, gridSize * 0.4, 0, Math.PI * 2);
        context.stroke();

        context.strokeStyle = 'black';
        context.beginPath();
        context.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, gridSize * 0.38, 0, Math.PI * 2);
        context.stroke();

        // Draw spokes
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            context.beginPath();
            context.moveTo(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2);
            context.lineTo(
                x * gridSize + gridSize / 2 + Math.cos(angle) * gridSize * 0.4,
                y * gridSize + gridSize / 2 + Math.sin(angle) * gridSize * 0.4
            );
            context.stroke();
        }

        // Draw cabins with 3D effect
        context.fillStyle = 'blue';
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            context.beginPath();
            context.arc(
                x * gridSize + gridSize / 2 + Math.cos(angle) * gridSize * 0.4,
                y * gridSize + gridSize / 2 + Math.sin(angle) * gridSize * 0.4,
                gridSize * 0.05,
                0,
                Math.PI * 2
            );
            context.fill();
            context.stroke();
        }
    }

    drawCarousel(x, y) {
        const { context, gridSize } = this;

        // Draw base
        context.fillStyle = 'yellow';
        context.fillRect(x * gridSize + gridSize * 0.3, y * gridSize + gridSize * 0.7, gridSize * 0.4, gridSize * 0.3);

        // Draw roof with 3D effect
        context.fillStyle = 'red';
        context.beginPath();
        context.moveTo(x * gridSize + gridSize * 0.3, y * gridSize + gridSize * 0.7);
        context.lineTo(x * gridSize + gridSize * 0.5, y * gridSize + gridSize * 0.5);
        context.lineTo(x * gridSize + gridSize * 0.7, y * gridSize + gridSize * 0.7);
        context.fill();
        context.stroke();

        // Draw poles with 3D effect
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x * gridSize + gridSize * 0.4, y * gridSize + gridSize * 0.7);
        context.lineTo(x * gridSize + gridSize * 0.4, y * gridSize + gridSize * 0.8);
        context.stroke();

        context.beginPath();
        context.moveTo(x * gridSize + gridSize * 0.6, y * gridSize + gridSize * 0.7);
        context.lineTo(x * gridSize + gridSize * 0.6, y * gridSize + gridSize * 0.8);
        context.stroke();
    }

    drawRollerCoaster(x, y) {
        const { context, gridSize } = this;

        // Draw base with 3D effect
        context.fillStyle = 'blue';
        context.fillRect(x * gridSize + gridSize * 0.2, y * gridSize + gridSize * 0.8, gridSize * 0.6, gridSize * 0.2);

        // Draw tracks with 3D effect
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x * gridSize + gridSize * 0.2, y * gridSize + gridSize * 0.8);
        context.quadraticCurveTo(
            x * gridSize + gridSize * 0.5,
            y * gridSize,
            x * gridSize + gridSize * 0.8,
            y * gridSize + gridSize * 0.8
        );
        context.stroke();

        // Draw supports
        context.strokeStyle = 'gray';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x * gridSize + gridSize * 0.4, y * gridSize + gridSize * 0.8);
        context.lineTo(x * gridSize + gridSize * 0.4, y * gridSize);
        context.stroke();

        context.beginPath();
        context.moveTo(x * gridSize + gridSize * 0.6, y * gridSize + gridSize * 0.8);
        context.lineTo(x * gridSize + gridSize * 0.6, y * gridSize);
        context.stroke();
    }

    drawAttractions() {
        this.attractions.forEach(attraction => {
            attraction.draw(attraction.x, attraction.y);
        });
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.drawPlayer();
        this.drawAttractions();
    }
}

const park = new ThemePark();
