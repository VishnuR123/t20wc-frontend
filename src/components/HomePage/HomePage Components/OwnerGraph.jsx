import React from "react";

import { parse, parseISO, format, isValid } from "date-fns";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
function OwnerGraph({ ownerPoints }) {
  // console.log('ownerPoints:', ownerPoints);
  // Reverse the order of ownerPoints documents
  const reversedOwnerPoints = [...ownerPoints].reverse();

  // Transform ownerPoints data
  const transformedData = reversedOwnerPoints.map((doc) => {
    const date = new Date(doc.date).toLocaleDateString();
    const pointsData = { date };

    // Use Object.entries to iterate over the points object
    for (const [owner, points] of Object.entries(doc.points)) {
      pointsData[owner] = points;
    }

    return pointsData;
  });

  // Determine unique owners
  const owners = Array.from(
    new Set(ownerPoints.flatMap((doc) => Object.keys(doc.points)))
  );
  const ownerColors = {
    Sakthi: "#33A8C7",
    Vishnu: "#52E3E1",
    Yukesh: "#A0E426",
    Subu: "#FDF148",
    Sathish: "#FFAB00",
    Shashwat: "#F77976",
    Sanjay: "#F050AE",
    Saran: "#D883FF",
    Shriman: "#9336FD",
  };

  return (
    <div>
      <h3>Points Progression</h3>
      <ResponsiveContainer
        width="100%"
        // height="100%"
        height={400}
      >
        <LineChart
          // width={500}
          // height={300}
          data={transformedData}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} opacity={0.5} />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "12px" }}
            // tickFormatter={(str) => {
            //   const date = parse(str, "MM/dd/yyyy", new Date());
            //   return format(date, "MMM, d");
            //   if(date.getDate() % 3 === 0){
            //     return format(date, "MMM, d")
            //     }
            //    return ("")
            // }}
            tickFormatter={(str) => {
              try {
                const date = parse(str, "MM/dd/yyyy", new Date());
                if (isValid(date)) {
                  return format(date, "MMM, d");
                } else {
                  console.error("Invalid date value:", str);
                  return str;
                }
              } catch (error) {
                console.error("Error parsing date:", str, error);
                return "";
              }
            }}
          />
          <YAxis
            style={{ fontSize: "12px" }}
            axisLine={false}
            tickLine={false}
            tickCount={4}
          />
          <Tooltip />
          <Legend
            height={20}
            wrapperStyle={{
              margin: "0 0 10px 0",
            }}
          />
          {owners.map((owner) => (
            <Line
              key={owner}
              type="monotone"
              dataKey={owner}
              stroke={ownerColors[owner]}
              // activeDot={{ r: 8 }}
              // activeDot={<CustomActiveDot />}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// const CustomToolTIp = ({ active, payload, label}) =>{
//   if(active && payload && payload.length){
//     return(
//       <div className="custom-tooltip">
//         <p>{label}</p>
//         <p></p>
//       </div>
//     );
//   }
// }

export default OwnerGraph;
