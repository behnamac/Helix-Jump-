import * as THREE from "three";

export class TrailRenderer
{
    trailLength = 100; // Number of particles in the trail
    trailGeometry = new THREE.BufferGeometry();
    positions = new Float32Array(trailLength * 3); // x, y, z for each particle

    constructor(scene)
    {
        this.trailGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        
        const trailMaterial = new THREE.MeshStandardMaterial({ color: 0x0f00ff });
        const trail = new THREE.Points(this.trailGeometry, trailMaterial);
        scene.add(trail);
    }
    
    updateTrail(movingObject) {
        // Shift positions back
        for (let i = this.trailLength - 1; i > 0; i--) {
            this.positions[i * 3] = this.positions[(i - 1) * 3]; // x
            this.positions[i * 3 + 1] = this.positions[(i - 1) * 3 + 1]; // y
            this.positions[i * 3 + 2] = this.positions[(i - 1) * 3 + 2]; // z
        }
    
        // Add current position of the moving object
        this.positions[0] = movingObject.position.x;
        this.positions[1] = movingObject.position.y;
        this.positions[2] = movingObject.position.z;
    
        this.trailGeometry.attributes.position.needsUpdate = true;
    }
}