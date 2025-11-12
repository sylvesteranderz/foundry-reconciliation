// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useDisclosure } from "@nextui-org/react";
// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import { Row } from "@tanstack/react-table";
// import EditProspectModal from "../../pages/customer.intelligence/prospects.module/components/edit.item.modal";
// import EditOpportunityModal from "../../pages/customer.intelligence/opportunity.module/components/edit.item.modal";
// import { useCallback } from "react";
// import DeleteOpportunityModal from "../../pages/customer.intelligence/opportunity.module/components/delete.item.modal";
// import DeleteProspectModal from "../../pages/customer.intelligence/prospects.module/components/delete.item.modal";
// import EditSalesPersonModal from "../../pages/customer.intelligence/sales team/components/edit.item.modal";
// import EditCasesModal from "../../pages/customer.intelligence/cases/components/edit.item.modal";
// import EditLeadModal from "../../pages/customer.intelligence/lead.module/components/edit.item.modal";
// import DeleteLeadModal from "../../pages/customer.intelligence/lead.module/components/delete.item.modal";
// import DeleteSalesPersonModal from "../../pages/customer.intelligence/sales team/components/delete.item.modal";
// import DeleteCasesModal from "../../pages/customer.intelligence/cases/components/delete.item.modal";
// import DeleteForecastLeaderModal from "../../pages/customer.intelligence/home.module/forecasy-by-leader/components/delete.item.modal";
// import EditForecastLeaderModal from "../../pages/customer.intelligence/home.module/forecasy-by-leader/components/edit.item.modal";
// import EditSubscriptionPlanModal from "@/pages/subscription.management/subscription.plan.module/components/edit.item.modal";
// import EditSubscriptionModal from "@/pages/subscription.management/subscribers.module/components/edit.item.modal";
// import DeleteSubscriptionModal from "@/pages/subscription.management/subscribers.module/components/delete.item.modal";
// import DeleteSubscriptionPlanModal from "@/pages/subscription.management/subscription.plan.module/components/delete.item.modal";
// import DeleteClientModal from "@/pages/customer.intelligence/clients.module/components/delete.item.modal";
// import EditClientModal from "@/pages/customer.intelligence/clients.module/components/edit.item.modal";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
//   type: string;
// }

// export function DataTableRowActions<TData>({
//   row,
//   type,
// }: DataTableRowActionsProps<TData>) {
//   const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

//   const {
//     isOpen: deleteIsOpen,
//     onClose: onDeleteclose,
//     onOpen: onDeleteOpen,
//     onOpenChange: onDeleteOpenChange,
//   } = useDisclosure();

//   const renderEditModal = useCallback(() => {
//     switch (type) {
//       case "opportunity":
//         return (
//           <EditOpportunityModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );
//       case "prospect":
//         return (
//           <EditProspectModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );

//       case "lead":
//         return (
//           <EditLeadModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );
//       case "salesPerson":
//         return (
//           <EditSalesPersonModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );
//       case "cases":
//         return (
//           <EditCasesModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );
//       case "client":
//         return (
//           <EditClientModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );
//       case "delegation":
//         return (
//           <EditForecastLeaderModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );
//       case "subscription-plan":
//         return (
//           <EditSubscriptionPlanModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );
//       case "subscription":
//         return (
//           <EditSubscriptionModal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             onClose={onClose}
//             row={row.original}
//           />
//         );

//       default:
//         return null; // Optionally, handle unknown types
//     }
//   }, [isOpen, onClose, onOpenChange, row.original, type]);

//   const renderDeleteModal = useCallback(() => {
//     switch (type) {
//       case "opportunity":
//         return (
//           <DeleteOpportunityModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );
//       case "prospect":
//         return (
//           <DeleteProspectModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );
//       case "lead":
//         return (
//           <DeleteLeadModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );
//       case "salesPerson":
//         return (
//           <DeleteSalesPersonModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );
//       case "cases":
//         return (
//           <DeleteCasesModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );

//       case "client":
//         return (
//           <DeleteClientModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );

//       case "delegation":
//         return (
//           <DeleteForecastLeaderModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );

//       case "subscription-plan":
//         return (
//           <DeleteSubscriptionPlanModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );

//       case "subscription":
//         return (
//           <DeleteSubscriptionModal
//             isOpen={deleteIsOpen}
//             onOpenChange={onDeleteOpenChange}
//             onClose={onDeleteclose}
//             row={row.original}
//           />
//         );

//       default:
//         return null; // Optionally, handle unknown types
//     }
//   }, [deleteIsOpen, onDeleteOpenChange, onDeleteclose, row.original, type]);

//   return (
//     <div className="flex items-center gap-3">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//           >
//             <DotsHorizontalIcon className="h-4 w-4" />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent align="end" className="w-[160px]">
//           <DropdownMenuItem onClick={() => onOpen()}>
//             Edit
//             <DropdownMenuShortcut>
//               <Icon icon="cil:pencil" />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>

//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={() => onDeleteOpen()}
//             className="text-red-600"
//           >
//             Delete
//             <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {renderEditModal()}

//       {renderDeleteModal()}
//     </div>
//   );
// }
