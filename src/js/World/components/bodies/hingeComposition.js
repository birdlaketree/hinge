import { Color } from "three";
import { tickedGroup } from "../meshes/tickedGroup";
import { cube } from "../meshes/cube";
import { sphere } from "../meshes/sphere";
import { defaultColorMattPlastic } from "../materials/defaultColorMattPlastic";
import { defaultColorShinyPlastic } from "../materials/defaultColorShinyPlastic";
import { defaultColorWithNoise } from "../materials/defaultColorWithNoise";
import { bentPlane } from "../materials/bentPlane"

const hingeComposition = (
  position = {x:0, y:3, z:0},
  hue,
  scene,
  loop,
  physics,
  envmap
  ) => {

  console.log('hingeComposition');

  // const hueShift = hue + Math.random() * 0.2 - 0.1;
  // const hueShift = 0.2;
  const hueShift = 0.6;
  // const s1 = 0.96;
  // const l1 = 0.55 + Math.random() * 0.2 - 0.1;
  const s1 = 0.8;
  const l1 = Math.random() * 0.1 - 0.05;
  const s2 = 0.8;
  const l2 = 0.4 + Math.random() * 0.1;

  const color1 = new Color();
  color1.setHSL(hueShift, s1, l1);

  const color2 = new Color();
  color2.setHSL(hueShift, s2, l2);

  const materialAPhysical = defaultColorShinyPlastic(color1, envmap);
  const materialBPhysical = defaultColorWithNoise(color2, envmap);
  const materialWhite = defaultColorMattPlastic(0xffffff, envmap);

  const baseX = position.x;
  const baseY = position.y;
  const baseZ = position.z;

  const widthMax = 1.6;
  const widthMin = 0.3;

  const heightDepthMax = 0.4;
  const heightDepthMin = 0.05;

  const baseWidth = Math.random() * widthMax + widthMin;
  const baseHeightDepth = Math.random() * heightDepthMax + heightDepthMin;
  // const baseWidth = 0.5;
  // const baseHeightDepth = 0.5;

  const base = cube(materialAPhysical, baseWidth, baseHeightDepth, baseHeightDepth);
  // const base = cylinder(materialAPhysical, baseWidth, baseHeightDepth);
  base.castShadow = true;
  base.position.x = baseX;
  base.position.y = baseY;
  base.position.z = baseZ;
  base.rotation.x = Math.random();
  base.rotation.y = Math.random();
  base.rotation.z = Math.random();
  scene.add(base);

  // const bodyAWidth = Math.random() * widthMax + widthMin;
  // const bodyHeightDepth = Math.random() * heightDepthMax + heightDepthMin;
  // const bodyAWidth = 1;
  // const bodyHeightDepth = 0.1;
  const boxSize = 0.3 + Math.random() * 0.5;
  // const bodyAWidth = boxSize;
  // const bodyHeightDepth = boxSize;
  const bodyAWidth = Math.random() * widthMax + widthMin;
  const bodyHeightDepth = Math.random() * heightDepthMax + heightDepthMin;

  const handleA = tickedGroup();
  handleA.position.x = baseX -baseWidth/2 + baseHeightDepth/2;
  handleA.position.y = baseY;
  handleA.position.z = baseZ + baseHeightDepth/2 + bodyHeightDepth/2;
  scene.add(handleA);

  // should not colide with an object so it is inside of the base
  let markerA = sphere(materialWhite, 0.05);
  markerA.position.x = 0;
  markerA.position.y = 0;
  markerA.position.z = -(baseHeightDepth/2 + bodyHeightDepth/2);
  markerA.visible = false;
  handleA.add(markerA);

  const handleABody = cube(materialBPhysical, bodyHeightDepth, bodyAWidth, bodyHeightDepth);
  // const handleABody = cylinder(materialBPhysical, bodyAWidth, bodyHeightDepth);
  handleABody.castShadow = true;
  handleABody.position.x = 0;
  handleABody.position.y = -bodyAWidth/2 + bodyHeightDepth/2;
  handleABody.position.z = 0;
  handleA.add(handleABody);

  loop.updatables.push(handleA);

  physics.add.existing(base);
  physics.add.existing(handleA);
  base.body.setBounciness(0.8);
  handleA.body.setBounciness(0.8);

  physics.add.constraints.hinge(base.body, handleA.body, {
    pivotA: { x: -baseWidth/2 + baseHeightDepth/2, z: baseHeightDepth/2 },
    pivotB: { y: 0,  z: -bodyHeightDepth/2 },
    axisA: { z: 1 },
    axisB: { z: 1 }
  }, true);
}

export { hingeComposition };