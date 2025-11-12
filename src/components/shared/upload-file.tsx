// /* eslint-disable react-hooks/exhaustive-deps */
// import { RootState } from "@/store/store";
// import { Icon } from "@iconify/react";
// import { Spinner } from "@nextui-org/react";
// import axios from "axios";
// import { isEmpty, isNil } from "lodash";
// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { useQuery } from "react-query";
// import { useDispatch, useSelector } from "react-redux";
// // import { updateInventoryFields } from "@/pages/business.analytics/_store/inventory.slice";

// interface UploadFile {
//   url?: string;
//   label?: string;
//   required?: boolean;
// }

// const UploadFile: React.FC<UploadFile> = ({ url = "", label, required }) => {
//   const dispatch = useDispatch();

//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [fileName, setFileName] = useState("");
//   const { uploadedImage } = useSelector((state: RootState) => state.inventory);
//   console.log(
//     "🚀🚀 -> file: upload-file.tsx:23 -> uploadedImage:",
//     uploadedImage
//   );

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       const file = acceptedFiles[0];

//       if (file) {
//         if (file.size > 4 * 1024 * 1024) {
//           setErrorMessage("File size exceeds the maximum limit (4MB).");
//         } else {
//           setFileName(file.name);
//           dispatch(
//             updateInventoryFields({
//               uploadedImage: file,
//             })
//           );

//           setErrorMessage(null);
//         }
//       }
//     },
//     [dispatch]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: { "image/*": [".jpeg", ".png"] },
//   });

//   const { isLoading } = useQuery({
//     queryKey: ["download-file", url],
//     queryFn: () =>
//       axios.get(`${url}`, {
//         responseType: "blob",
//       }),
//     onSuccess: (data) => {
//       dispatch(updateInventoryFields({ uploadedImage: data?.data }));
//     },
//     enabled: !isEmpty(url),
//     refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//     dispatch(updateInventoryFields({ uploadedImage: null }));
//   }, []);

//   return (
//     <div>
//       <h2 className="font-medium text-xs uppercase">
//         {/* {label || "Item Image"} <span className="text-red-500">*</span> */}
//         {required ? (
//           <span>
//             {label || "Item Image"} <span className="text-red-500">*</span>
//           </span>
//         ) : (
//           label || "Item Image"
//         )}
//       </h2>
//       <div
//         className="flex flex-col w-full dark:bg-[#161616] bg-gray-100/80  relative overflow-hidden justify-center items-center rounded-md"
//         style={{
//           border: "1px dashed #858484",
//           padding: "12px",
//         }}
//       >
//         <input {...getInputProps()} />
//         {fileName || !isNil(uploadedImage) ? (
//           <div className="flex items-center w-full justify-between relative">
//             <div className="flex flex-col items-center mx-auto">
//               {!isNil(uploadedImage) && (
//                 <React.Fragment>
//                   <img
//                     src={URL.createObjectURL(uploadedImage)}
//                     className="w-[10rem] aspect-square object-contain"
//                   />
//                 </React.Fragment>
//               )}
//             </div>
//             <button
//               onClick={() => {
//                 dispatch(updateInventoryFields({ uploadedImage: null }));
//                 setFileName("");
//               }}
//               className="hover:shadow-none hover:text-red-500 transition-all ml-auto absolute right-0 top-0"
//             >
//               <Icon icon="maki:cross" fontSize={15} />
//             </button>
//           </div>
//         ) : (
//           <div {...getRootProps()}>
//             <div className="flex gap-2 items-center justify-center text-sm hover:cursor-pointer">
//               {isLoading ? (
//                 <div className="flex flex-col items-center gap-y-1">
//                   <Spinner color="current" size="sm" />
//                   <p className="text-xs">loading item image...</p>
//                 </div>
//               ) : (
//                 <React.Fragment>
//                   <Icon icon="fluent:image-add-24-regular" fontSize={23} />
//                   Add photo
//                 </React.Fragment>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       {errorMessage && (
//         <p className="text-red-500 text-center">{errorMessage}</p>
//       )}
//     </div>
//   );
// };

// export default UploadFile;
