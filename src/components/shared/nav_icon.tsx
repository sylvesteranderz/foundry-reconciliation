import * as Icons from 'iconsax-react';
import { FC } from 'react';

const NavIcon: FC<
  {
    name: keyof typeof Icons;
  } & Icons.IconProps
> = ({ name, ...rest }) => {
  const IconComponent = Icons[name];

  return <IconComponent {...rest} />;
};

export default NavIcon;
