// "use client"
// import React, { useState } from 'react'
// import { object } from 'zod';

// const sta = {
//   "Maharashtra": { districts: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
//   "Uttar Pradesh": { districts: ["Lucknow", "Kanpur", "Varanasi", "Agra"] },
//   "Karnataka": { districts: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"] },
//   "Rajasthan": { districts: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
//   "Bihar": { districts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"] }
// };

// const DataShow = () => {
//   const [country, setCountry] = useState(sta);
//   const [selectedState, setSelectedState] = useState<string>("");
//   const [districts, setDistricts] = useState<string[]>([]);

//   // Handle state change
//   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const stateName = e.target.value;
//     setSelectedState(stateName);
//     setDistricts(country[stateName].districts);
//   };

//   return (
//     <div className='w-full h-50 bg-white'>
//       <div className='text-black'>
        
//         {/* State Dropdown */}
//         <select
//           className='ml-10 text-black border p-1'
//           onChange={handleStateChange}
//           value={selectedState}
//         >
//           <option value="">-- Select State --</option>
//           {
//             Object.keys(country).map((dist,index)=>(
//               <option value={dist}>{dist}</option>
//             ))
//           }
//         </select>

//         {/* District Dropdown */}
//         {districts.length > 0 && (
//           <select className='ml-10 text-black border p-1'>
//             {districts.map((dist, index) => (
//               <option key={index} value={dist}>
//                 {dist}
//               </option>
//             ))}
//           </select>
//         )}

//       </div>
//     </div>
//   )
// }

// export default DataShow;
