import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('assets/3d_model/crystal.gltf')
  return (
    <group {...props} dispose={null} scale={[1, 1, 1]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <lineSegments geometry={nodes.Object_2.geometry} material={materials.Material_0} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Material_0} />
      </group>
    </group>
  )
}

useGLTF.preload('assets/3d_model/crystal.gltf')
