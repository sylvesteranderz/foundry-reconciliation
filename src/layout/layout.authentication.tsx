type IAuthenticationLayout = {
  children: React.ReactNode;
};

const AuthenticationLayout: React.FC<IAuthenticationLayout> = ({
  children,
}) => {
  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-12">
      <div className="col-span-6">{children}</div>
      <div className="col-span-6 bg-primary-green relative grid items-center">
        <img
          src="/images/line-pattern.svg"
          className="absolute right-0  top-0"
        />
        <img
          src="/images/line-pattern.svg"
          className="absolute left-0 bottom-[-3rem]  "
        />
        <img
          src="/icons/auth.svg"
          className=" rounded-xl   z-20 ml-[5rem] aspect-w-[120vh] object-cover "
        />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
