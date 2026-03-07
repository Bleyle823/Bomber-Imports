import { FC, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import Lights from "@/features/iphone-3d-overview/ui/Lights";
import GenericPhoneModel from "./GenericPhoneModel";

interface Props {
    modelPath: string;
}

const Phone3DPreview: FC<Props> = ({ modelPath }) => {
    return (
        <div className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true }}
            >
                <Suspense fallback={null}>
                    <Lights />
                    <group position={[0, 0, 0]}>
                        <GenericPhoneModel modelPath={modelPath} scale={1} />
                    </group>
                    <ContactShadows
                        position={[0, -2, 0]}
                        opacity={0.4}
                        scale={20}
                        blur={2}
                        far={4.5}
                    />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Phone3DPreview;
