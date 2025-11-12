/* eslint-disable no-mixed-spaces-and-tabs */
import { Outlet, useNavigate } from 'react-router-dom';

import SidebarComponent from './main.sidebar';
import useOrganizationSetupDetails from '@/hooks/useOrganizationDetails';
import { useSelector } from 'react-redux';

import { useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const MainLayout = () => {
  useOrganizationSetupDetails();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="grid md:grid-cols-[14rem,1fr] h-full  scrollbar-hide">
      <div className="flex md:hidden items-center mt-4 h-fit">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden transition-all top-4 left-2 z-50  p-2 "
        >
          <Icon
            className="transition-all"
            icon={isOpen ? 'mdi:close' : 'mdi:menu'}
            fontSize={24}
          />
        </button>
        <div
          onClick={() => navigate('/')}
          className="grid grid-cols-[2rem,1fr] gap-x-2 place-items-center hover:cursor-pointer"
        >
          <img src="/icons/logo-dark.svg" className="w-[50%]" />

          <div className="flex flex-col mr-auto text-gray-600">
            <h1 className="font-medium capitalize">Foundry</h1>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-40 w-[250px] md:hidden  h-full bg-white border-r transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}
      >
        <SidebarComponent />
      </div>
      <div className="hidden md:flex">
        <SidebarComponent />
      </div>

      <div className="w-full  flex flex-col min-h-full overflow-x-scroll  overflow-y-auto  scrollbar-hide  ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
