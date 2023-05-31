import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center justify-between min-h-[180px] ">
      <Input placeholder={"valor"} />
      <Input placeholder={"categoria"} />
      <Button title={"cadastrar"} />
    </div>
  );
}
