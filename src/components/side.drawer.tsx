// // /* eslint-disable @typescript-eslint/no-explicit-any */

// // import AIForecast from "@/pages/customer.intelligence/home.module/side-drawer/ai.forecast";
// // import IndividualForecast from "@/pages/customer.intelligence/home.module/side-drawer/individual-forecast/individual.forecast";

// // import AlertSidebar from "@/pages/customer.intelligence/service-control.module/pages/manager-view/master-groups/pages/alerts/sidebar-item";
// // import DemographicSideBar from "@/pages/customer.intelligence/service-control.module/pages/manager-view/master-groups/pages/overview/demographics-sidebar";
// import {
//   DrawerKey,
//   resetGlobal,
//   updateGlobalState,
// } from "@/store/features/global";
// import { RootState } from "@/store/store";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

// const SideDrawer = () => {
//   const dispatch = useDispatch();
//   const { pathname } = useLocation();
//   // const { drawerKey } = useSelector((state: RootState) => state.global) as {
//   //   drawerKey: DrawerKey;
//   // };

//   // const DrawerMap: Record<DrawerKey, React.ReactNode> = {
//   //   AIForecast: <AIForecast />,
//   //   forecastLeader: <IndividualForecast />,
//   //   demographics: <DemographicSideBar />,
//   //   alerts: <AlertSidebar />,
//   // };

//   return (
//     <motion.div
//       initial={{ x: 100 }}
//       animate={{ x: 0 }}
//       exit={{ x: -100, transition: { delay: 0.9 } }}
//       className="w-full dark:bg-[#202124] overflow-hidden bg-white shadow rounded-xl p-3 relative"
//     >
//       <button
//         onClick={() => {
//           dispatch(updateGlobalState({ sideDrawerTrigger: false }));
//           dispatch(resetGlobal());
//         }}
//         className="hover:scale-[1.05] hover:text-red-300 dark:text-[#929292] text-gray-600 absolute right-0 mr-1"
//       >
//         {pathname === "" && <Icon icon="ion:close" fontSize={23} />}
//       </button>

//       <div className="mt-4">{DrawerMap[drawerKey]}</div>
//     </motion.div>
//   );
// };

// export default SideDrawer;
