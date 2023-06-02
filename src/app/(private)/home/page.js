import Container from "@/components/Container";
import RegisterForm from "./_components/RegisterForm";
import LastRegisters from "./_components/LastRegisters";

export default function HomePage() {
  return (
    <>
      <div className="h-[40%]">
        <RegisterForm />
      </div>
      <div className="h-[60%]">
        <LastRegisters />
      </div>
    </>
  );
}
