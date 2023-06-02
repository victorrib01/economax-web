import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center justify-between h-full py-1">
      <Input placeholder={"valor"} />
      <Input placeholder={"categoria"} />
      <Input placeholder={"descrição"} />
      <Button title={"cadastrar"} />
    </div>
  );
}
