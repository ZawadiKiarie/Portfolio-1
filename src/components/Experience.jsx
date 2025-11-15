import * as THREE from "three";
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  GradientTexture,
  MeshDistortMaterial,
  RoundedBox,
  useCursor,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion-3d";

import { Avatar } from "./Avatar";
import { SectionTitle } from "./SectionTitle";
import Star from "./Star";
import Macbook from "./Macbook";
import { PalmTree } from "./PalmTree";
import { config } from "../config";
import { BookCase } from "./Bookcase";
import { CouchSmall } from "./CouchSmall";
import { Lamp } from "./Lamp";
import { ComputerScreen } from "./ComputerScreen";
import { ParkBench } from "./ParkBench";
import { Balloon } from "./Balloon";
import { Mailbox } from "./Mailbox";
import { Pigeon } from "./Pigeon";
import { MonitorScreen } from "./MonitorScreen";
import { useMobile } from "../hooks/useMobile";
import { MacBookPro } from "./MacBookPro";

const SECTIONS_DISTANCE = 10;

export const Experience = () => {
  //Mobile responsiveness
  //position our sections horizontally and follow the scroll on the x axis
  const { isMobile, scaleFactor } = useMobile();

  const sceneContainer = useRef();
  const scrollData = useScroll();

  const distortMaterial = useRef();
  //   const [hovered, setHovered] = useState(false);
  const hovered = useRef(false);
  useCursor(hovered);

  //Reveal sections logic
  const [section, setSection] = useState(config.sections[0]);

  useFrame(() => {
    if (isMobile) {
      sceneContainer.current.position.x =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
      sceneContainer.current.position.z = 0;
    } else {
      //Move the scene
      sceneContainer.current.position.z =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1); // percentage of scroll position btwn 0 and 1 * total distance to move the scene to.
      sceneContainer.current.position.x = 0;
    }

    //Change distortion of sphere
    distortMaterial.current.distort = THREE.MathUtils.lerp(
      distortMaterial.current.distort,
      hovered.current ? 0.6 : 0.4,
      hovered.current ? 0.05 : 0.01
    );

    //Determine which section we are in based on offset(position of scroll)
    setSection(
      config.sections[Math.round(scrollData.offset * (scrollData.pages - 1))]
    );
  });

  //Listen to hash changes in url
  useEffect(() => {
    const handleHashChange = () => {
      const sectionIndex = config.sections.indexOf(
        window.location.hash.replace("#", "")
      );
      if (sectionIndex !== -1) {
        scrollData.el.scrollTo(
          0,
          (sectionIndex / (config.sections.length - 1)) *
            (scrollData.el.scrollHeight - scrollData.el.clientHeight)
        );
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Environment preset="sunset" />
      <Avatar position-z={isMobile ? -5 : 0} />

      {/* SHADOWS & FLOOR */}
      <ContactShadows opacity={0.5} scale={[30, 30]} color="#9c8e66" />
      <mesh position-y={-0.001} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#FBF9E9" />
      </mesh>

      {/* STRUCTURE OF OUR SCENE */}
      <motion.group ref={sceneContainer} animate={section}>
        {/* HOME */}
        <motion.group
          position-y={-5}
          variants={{
            home: {
              y: 0,
            },
          }}
        >
          {/* <Ruby position-y={1.95} position-x={0.05} scale={0.15} /> */}
          <Star position-z={isMobile ? -5 : 0} position-y={2.2} scale={0.3} />
          <Float>
            {/* <Macbook
              scale={isMobile ? 0.2 : 0.3}
              position-x={isMobile ? -0.5 : -1.6}
              position-y={isMobile ? 0.7 : 0.5}
              position-z={isMobile ? -1.5 : 0}
              rotation-y={Math.PI / 4}
            /> */}
            <MacBookPro
              position-x={isMobile ? -0.5 : -1}
              position-y={isMobile ? 1 : 0.5}
              position-z={isMobile ? -2 : 0}
              scale={0.3}
              rotation-y={Math.PI / 4}
            />
          </Float>
          <PalmTree
            scale={isMobile ? 0.11 : 0.13}
            position={isMobile ? [1, 0, -4] : [scaleFactor * 3, -0.3, -4.5]}
            // position-x={3}
            // position-y={-0.3}
            // position-z={-4.5}
          />
          <group scale={isMobile ? 0.3 : 1}>
            <Float
              floatIntensity={0.3}
              floatingRange={[0.15, 0.2]}
              rotationIntensity={0.5}
            >
              <Center disableY disableZ>
                <SectionTitle
                  position-y={1.3}
                  position-z={-3}
                  size={0.8}
                  bevelEnabled
                  bevelThickness={0.3}
                >
                  {config.home.title}
                </SectionTitle>
              </Center>
            </Float>
            <Center disableY disableZ>
              <SectionTitle
                position-x={-2.6}
                position-z={-3}
                size={1.2}
                bevelEnabled
                bevelThickness={0.3}
                rotation-y={Math.PI / 10}
              >
                {config.home.subtitle}
              </SectionTitle>
            </Center>
          </group>
        </motion.group>
        {/* SKILLS */}
        <motion.group
          position-x={isMobile ? SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -4 : SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            skills: {
              y: 0,
            },
          }}
        >
          <group position-x={isMobile ? -0.5 : -2}>
            <SectionTitle position-z={1.55} rotation-y={Math.PI / 6}>
              SKILLS
            </SectionTitle>
            <BookCase position-z={-2} />
            <CouchSmall
              position-x={-0.2}
              rotation-y={Math.PI / 3}
              scale={0.4}
            />
            <Lamp position-x={-0.4} position-z={1.2} scale={1.4} />
          </group>
          <mesh
            position={[2, 2, -4]}
            onPointerOver={() => (hovered.current = true)}
            onPointerOut={() => (hovered.current = false)}
          >
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              ref={distortMaterial}
              speed={5}
              opacity={0.7}
              transparent
              distort={1}
            >
              <GradientTexture
                stops={[0.4, 0.9, 1]}
                colors={["#FFE0C3", "#F9E46F", "#F9E46F"]}
                size={100}
                // type={GradientType.Radial}
              />
            </MeshDistortMaterial>
          </mesh>
        </motion.group>
        {/* PROJECTS */}
        <motion.group
          position-x={isMobile ? 2 * SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -3 : SECTIONS_DISTANCE * 2}
          position-y={-5}
          variants={{
            projects: {
              y: 0,
            },
          }}
        >
          <group
            position-x={isMobile ? -0.25 : 0.76}
            position-z={isMobile ? 0.5 : 0}
          >
            <SectionTitle position-x={-0.5} rotation-y={-Math.PI / 6}>
              PROJECTS
            </SectionTitle>
            <group
              scale={0.8}
              position-x={0.5}
              rotation-y={-Math.PI / 6}
              position-z={-1}
            >
              <ComputerScreen
                scale={3}
                position-y={1}
                position-x={-0.5}
                position-z={-1}
                rotation-y={Math.PI}
              />
              <MonitorScreen
                position-z={-1.1}
                position-y={1.515}
                position-x={isMobile ? 0.12 : 0.1}
                rotation-x={-0.18}
                rotation-z={0.004}
              />
              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color="white" />
              </RoundedBox>
            </group>
          </group>
        </motion.group>
        {/* CONTACT */}
        <motion.group
          position-x={isMobile ? 3 * SECTIONS_DISTANCE : 0}
          position-z={isMobile ? -4 : SECTIONS_DISTANCE * 3}
          position-y={-5}
          variants={{
            contact: {
              y: 0,
            },
          }}
        >
          <SectionTitle
            position-x={isMobile ? -1.1 : -2 * scaleFactor}
            position-z={0.6}
          >
            CONTACT
          </SectionTitle>
          <group position-x={-2 * scaleFactor}>
            <ParkBench
              scale={0.5}
              position-x={-0.5}
              position-z={-2.5}
              rotation-y={-Math.PI / 4}
            />
            <group position-y={2.2} position-z={-0.5}>
              <Float floatIntensity={2} rotationIntensity={1.5}>
                <Balloon scale={1.5} position-x={-0.5} color="#F9E46F" />
              </Float>
              <Float
                floatIntensity={1.5}
                rotationIntensity={2}
                position-z={0.5}
              >
                <Balloon scale={1.3} color="#FFE0C3" />
              </Float>
              <Float speed={2} rotationIntensity={2}>
                <Balloon scale={1.6} position-x={0.4} color="#D6E499" />
              </Float>
            </group>
          </group>
          <Mailbox
            scale={0.25}
            rotation-y={1.25 * Math.PI}
            position-x={1}
            position-y={0.25}
            position-z={0.5}
          />
          <Float floatIntensity={1.5} speed={3}>
            <Pigeon
              position-x={isMobile ? 0 : 2 * scaleFactor}
              position-y={isMobile ? 2.2 : 1.5}
              position-z={-0.5}
              scale={0.3}
            />
          </Float>
        </motion.group>
      </motion.group>
    </>
  );
};
