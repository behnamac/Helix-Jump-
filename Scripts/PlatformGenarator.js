import { Quaternion, Vec3 } from "cannon-es";
import { Objects } from "./Objects";
import { Physic } from "./Physic";

export class PlatformGenarator
{
    static numberPlatform = 8;
    static numberFloor = 10;
    
    static GenaratePlatform = (scene) =>
    {
    
        var cylinderRadius = 1;
        var cylinderHeight = 10;
    
        var platforms = []
        for (let i = 0; i < this.numberFloor; i++) 
        {
            var randomNumberRemove = Math.floor((Math.random() * 3) + 1);
            var indexRemove = [];
            for (let j = 0; j < randomNumberRemove; j++) 
            {
                var chooseIndex =  Math.floor((Math.random() * this.numberPlatform) + 0);
                indexRemove.push(chooseIndex);
            }
            for (let j = 0; j < this.numberPlatform; j++) 
            {
                if(i != 0)
                {
                    var findIndexRemove = false;
                    for (let k = 0; k < indexRemove.length; k++) 
                    {
                        if(j == indexRemove[k])
                            findIndexRemove = true;
                    }
                    if(findIndexRemove && i < this.numberFloor - 1)
                        continue;
                }
                else
                {
                    if(j == 3)
                        continue;
                }
                var platform = Objects.createPlatform();
    
                // Calculate Position
                var angle = (j / this.numberPlatform) * Math.PI * 2;
                var platformX = cylinderRadius * Math.cos(angle);
                var platformY = cylinderHeight / 2 - (3 * (i + 1));
                var platformZ = cylinderRadius * Math.sin(angle);
    
                platform.position.set(platformX, platformY, platformZ);
    
                // Calculate Rotation
                var rotationAngle = Math.atan2(platformX, platformZ);
                platform.rotation.set(0, rotationAngle, 0);
                var extraRad = 90 * Math.PI / 180;
                platform.rotation.y += extraRad;
    
                platforms.push(platform);
                scene.add(platform);
            }
        }
        return platforms;
    }
    
    static GenaratePlatformBody = (platforms = [], world) => 
    {
        var plaRigidBodys = [];
        for (let i = 0; i < platforms.length; i++) 
        {
            var pla = platforms[i];
              
            var size = new Vec3(1.5, 0.15, 1);
            var pos = new Vec3(pla.position.x, pla.position.y, pla.position.z);
            var qua = new Quaternion(
                pla.quaternion.x,
                pla.quaternion.y,
                pla.quaternion.z,
                pla.quaternion.w
            );
              
            var boxRigidbody = Physic.BoxCollider(size, pos, qua, 0);
            var possibilityBadPlatform = Math.random() * 100;
            if(i >= platforms.length - this.numberPlatform)
            {
                boxRigidbody.name = "FinishPlatform";
                pla.material.color.setHex(0x00FF6C);
                boxRigidbody.position.y -= 0.01;
            }
            else if(possibilityBadPlatform < 30 && i > this.numberPlatform - 2)
            {
                boxRigidbody.name = "BadPlatform";
                pla.material.color.setHex(0xFF3131);
                boxRigidbody.position.y -= 0.05;
            }
            else
            {
                boxRigidbody.name = "GoodPlatform";
            }
            world.addBody(boxRigidbody);
              
            plaRigidBodys.push(boxRigidbody);
        }
        return plaRigidBodys;
    }
}
