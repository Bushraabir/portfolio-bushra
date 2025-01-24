
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('assets/3d_model/ball.gltf');
  return (
    <group {...props} dispose={null} scale={1.5}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Icosphere002_0.geometry} material={materials['ballz2.002']} rotation={[0.081, 1.315, 0.904]} scale={1.251} />
        <mesh geometry={nodes.Icosphere003_0.geometry} material={materials['Lightballz.002']} rotation={[0.081, 1.315, 0.904]} scale={1.251} />
        <mesh geometry={nodes.Cube002_0.geometry} material={materials['Wireframy.002']} rotation={[-2.551, 0.868, -3.138]} scale={1.251} />
        <mesh geometry={nodes.Cube003_0.geometry} material={materials['Ballz.002']} rotation={[-0.568, 0.997, 1.709]} scale={1.251} />
      </group>
    </group>
  )
}

useGLTF.preload('assets/3d_model/ball.gltf')
