export const Content = ({
  title,
  subText,
  children,
}: {
  title: string;
  subText: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p className="text-[#929292] text-xs mb-1.5">{subText}</p>
      <div className="border border-primary-black dark:border-[#929292] dark:bg-primary-gray bg-gray-100/80 rounded-md">
        <p className="p-3 px-5">{children}</p>
      </div>
    </div>
  );
};
