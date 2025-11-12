import { Separator } from "../ui/separator";

const NotFound = () => {
  return (
    <div className="flex dark:bg-[#161616] justify-center items-center h-screen">
      <div className="flex gap-2 h-[30px]">
        <div className="font-semibold text-[17px]">404</div>
        <Separator orientation="vertical" />
        <div>This page could not be found.</div>
      </div>
    </div>
  );
};

export default NotFound;
