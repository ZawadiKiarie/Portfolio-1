import { Text3D } from "@react-three/drei";

export const SectionTitle = ({ children, ...props }) => {
  return (
    <Text3D font={"fonts/Nighty DEMO_Regular.json"} size={0.4} {...props}>
      {children}
      <meshStandardMaterial color="#FFCCC3" />
    </Text3D>
  );
};
