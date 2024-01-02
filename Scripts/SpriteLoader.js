import * as THREE from "three";

export class SpriteLoader
{
    static CreateSpriteSplash = (scene) =>
    {
        const map = new THREE.TextureLoader().load('Assets/Sprites/splash1.png');
        const material = new THREE.SpriteMaterial({ map : map });

        const sprite = new THREE.Sprite( material );
        scene.add(sprite);

        return sprite;
    }
}