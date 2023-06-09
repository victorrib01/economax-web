import ButtonsContainer from "./ButtonsContainer";
import Resume from "./Resume";

export default function RegistryContent() {
  return (
    <div className="flex flex-col justify-between items-center w-full h-full">
      <Resume />
      <ButtonsContainer />
    </div>
  );
}
