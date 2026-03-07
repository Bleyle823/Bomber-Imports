import type { FC, RefObject } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import Lights from "./Lights";
import IPhone from "./IPhone";
import { IphoneModelType } from "../types/params.types";
import GenericPhoneModel from "@/shared/ui/GenericPhoneModel";

interface Props {
  index: number;
  model: IphoneModelType;
  controlRef: RefObject<any>;
}

const ModelView: FC<Props> = ({ index, controlRef, model }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        autoRotate
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
      />
      {model.modelPath && model.modelPath !== "/models/scene.glb" ? (
        <GenericPhoneModel modelPath={model.modelPath} scale={index === 1 ? 2 : 2.2} />
      ) : (
        <IPhone model={model} scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} />
      )}
    </>
  );
};

export default ModelView;
