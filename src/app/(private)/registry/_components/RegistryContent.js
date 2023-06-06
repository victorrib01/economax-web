import ButtonsContainer from "./ButtonsContainer";
import Resume from "./Resume";

export default function RegistryContent({ loginCookie }) {
  return (
    <div className="h-full ">
      <Resume loginCookie={loginCookie} />
      <ButtonsContainer />
    </div>
  );
}
