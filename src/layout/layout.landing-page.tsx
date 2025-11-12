import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Features from '@/pages/landing-page/_components/features-section';
import { updateGlobalState } from '@/store/features/global';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Call, Heart, SearchNormal1, User } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onLogout as logOut } from '@/store/features/auth.slice';
import useOrganizationSetupDetails from '@/hooks/useOrganizationDetails';
import { useAuth0 } from '@auth0/auth0-react';

const LandingPageLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useOrganizationSetupDetails();
  const auth = useAuth0();

  async function onLogout() {
    try {
      auth.logout({ logoutParams: { returnTo: window.location.origin } });
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  }
  const pages = [
    {
      href: '/dashboard/accounting',
      module: 'accounting',
      title: 'Accounting',
    },
    // {
    //   href: '/dashboard/hrms-payroll',
    //   module: 'hrms-payroll',
    //   title: 'HRMS & Payroll',
    // },
    // {
    //   href: '/dashboard/fund-management',
    //   module: 'fund-management',
    //   title: 'Fund Management',
    // },
  ];

  const icons = [
    // {
    //   icon: <Heart size="24" color="rgba(39, 39, 39, 1)" />,
    // },
    // {
    //   icon: <SearchNormal1 size="24" color="rgba(39, 39, 39, 1)" />,
    // },
    {
      icon: <Call size="24" color="rgba(39, 39, 39, 1)" />,
    },
    // {
    //   icon: <User size="24" color="rgba(39, 39, 39, 1)" />,
    // },
  ];

  const dropDownItems = [
    {
      title: 'All Categories',
      children: [
        {
          title: 'Child 1',
          onClick: () => {},
        },
        {
          title: 'Child 3',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Features Selected',
      children: [
        {
          title: 'Child 1',
          onClick: () => {},
        },
        {
          title: 'Child 3',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Trade Assurance',
      children: [
        {
          title: 'Child 1',
          onClick: () => {},
        },
        {
          title: 'Child 3',
          onClick: () => {},
        },
      ],
    },
  ];

  const features = [
    {
      icon: 'solar:card-linear',
      title: 'Open Account',
    },
    {
      icon: 'clarity:piggy-bank-line',
      title: 'Save',
    },
    {
      icon: 'game-icons:pay-money',
      title: 'Get a loan',
    },
    {
      icon: 'tdesign:secured',
      title: 'Insure',
    },
    {
      icon: 'icon-park-outline:tree-two',
      title: 'Invest',
    },
    {
      icon: 'tabler:news',
      title: 'News',
    },
  ];

  const otherProducts = [
    {
      title: 'Secure a loan',
      subTitle: 'and pay in 30, 60 or 90 days',
      link: '',
    },
    {
      title: 'Get Insured',
      subTitle: 'asset | staff | stock | cash',
      link: '',
    },
    {
      title: 'Buy at wholesale',
      subTitle: 'Consumer electronics | Office Suppliers  ',
      link: '',
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-16 py-4 w-full grid grid-cols-[.1fr,.8fr,.1fr] gap-3">
        <div className="border-r-1 border-black">
          <img src="/icons/logo-dark.svg" className="w-[1rem] mx-auto" />
        </div>

        <div className="flex items-center  gap-3 ">
          {pages?.map((e) => {
            return (
              <p
                className={cn(
                  'cursor-pointer px-2',
                  'hover:text-primary-green border-b-[1px] hover:border-primary-green border-transparent'
                )}
                role="link"
                onClick={() => {
                  navigate(e.href);
                  dispatch(updateGlobalState({ module: e.module }));
                }}
              >
                {e.title}
              </p>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 ">
          {icons.map((e) => {
            return e.icon;
          })}
          <button
            className="flex items-center ml-2 text-white bg-primary-green py-1 px-2 rounded-md gap-4 hover:bg-primary-green/hover duration-700"
            onClick={() => {
              onLogout();
            }}
          >
            <Icon icon={'hugeicons:logout-02'} height={18} />
            <p className="text-[0.9rem] font-extralight">Logout</p>
          </button>
        </div>
      </div>

      <div className="bg-primary-green/10 px-16 flex gap-6 py-2">
        {dropDownItems.map((e) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="text-primary-green">{e.title}</p>
                  <Icon
                    icon="oui:arrow-down"
                    className="text-primary-green h-4"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                {e.children?.map((child) => {
                  return <DropdownMenuItem>{child.title}</DropdownMenuItem>;
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
      <div className="relative h-[80vh] min-h-[500px] grid place-items-center mb-0 bg-white">
        <img
          src="/images/landing-bg.svg"
          className="absolute top-0 left-0 object-cover w-full h-[80vh] min-h-[500px] z-[0]"
        />
        <div className="z-[1] flex flex-col items-center gap-4">
          <h4 className="text-center font-bold text-white text-[6.5rem] leading-none">
            Virtual <br /> Agent
          </h4>
          <div className="flex items-center gap-2 relative">
            <input
              type="text"
              className="bg-white/40 w-[50vw] rounded-md p-4 focus:ring-0 focus:outline-none"
            />
            <div className="absolute right-4 h-[80%] flex items-center justify-center bg-primary-green rounded-md px-4">
              <Icon icon="hugeicons:search-01" className="text-white" />
            </div>
          </div>
          <p className="text-[#272727] text-[1.2rem] font-extralight">
            Welcome to the virtual Agent, our cutting edge chief financial
            officer harnesses <br /> the power of artificial intelligence to
            unleash endless possibilities in your business.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3  z-0 px-16 py-14 divide-x-1">
        {otherProducts?.map((e) => {
          return (
            <div className="flex flex-col gap-2 items-center py-2 cursor-pointer">
              <h4 className="text-[1.7rem] font-medium text-[#575757]">
                {e.title}
              </h4>
              <p className="text-[1.2rem] font-extralight text-primary-green">
                {e.subTitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPageLayout;
