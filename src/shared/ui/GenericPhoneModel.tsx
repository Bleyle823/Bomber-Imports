import { FC, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
    modelPath: string;
    scale?: number;
}

const GenericPhoneModel: FC<Props> = ({ modelPath, scale = 0.15 }) => {
    const { scene } = useGLTF(modelPath);
    const groupRef = useRef<THREE.Group>(null);

    // Slow rotation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });

    return (
        <primitive
            ref={groupRef}
            object={scene}
            scale={scale}
            position={[0, 0, 0]}
        />
    );
};

export default GenericPhoneModel;
