interface props {
  dotColor: string;
  title: string;
}
const TableStatus = ({ dotColor, title }: props) => {
  return (
    <div className="rounded-xl border-2 flex items-center justify-center gap-2 px-2 w-fit  ">
      <div>
        <div
          className="h-2 w-2 rounded-full "
          style={{ backgroundColor: dotColor }}
        ></div>
      </div>
      <p className="text-[0.8rem] font-light text-left">{title}</p>
    </div>
  );
};

export default TableStatus;
