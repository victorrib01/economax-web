import { Button } from "@/components/Button";

export default function ProfileContent() {
  return (
    <div className="flex flex-col h-full p-8 items-center justify-between">
      <p>ID: 1</p>
      <p>usuario: teste</p>
      <Button title={"Sair"} />
      <p>v{process.env.VERSION}</p>
    </div>
  );
}
