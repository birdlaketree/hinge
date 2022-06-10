import { Group } from "three";

const tickedGroup = () => {
  const group = new Group();
  const speed = Math.random() * 0.4 + 0.2;

  group.tick = (delta) => {
    // group.rotation.z += delta * speed;

    if (group.body) {
      const velocityRange = 50;
      const velocity = Math.random() * velocityRange - velocityRange/2;
      const torqueRange = 3;
      const torque = Math.random() * torqueRange - torqueRange/2;
      const treshold = Math.random();
      // console.log(rv);

      if (treshold < 0.02) {
        // group.body.applyTorque(0, 0, torque);
        group.body.applyTorqueImpulse(0, 0, torque);
        // group.body.setAngularVelocityZ(velocity);
        group.body.needUpdate = true;
      }
    }
    
  };

  return group;
}

export { tickedGroup };