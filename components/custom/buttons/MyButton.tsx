"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// interface Data {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: {
//       lat: string;
//       lng: string;
//     };
//   };
//   phone: string;
//   website: string;
//   company: {
//     name: string;
//     catchPhrase: string;
//     bs: string;
//   };
// }

// interface MyButtonProps {
//   data: Data;
// }

interface MyButtonProps {
  viewData: () => Promise<void>;
}

export const MyButton = ({ viewData }: MyButtonProps) => {
  // const [users, setUsers] = useState<Data | null>(null);

  // const viewData = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   // event.preventDefault();
  //   // setUsers(data);
  // };
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await viewData();
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        {loading ? "Loading..." : "Click Me"}
      </Button>
      {/* {users && <pre>{JSON.stringify(users, null, 2)}</pre>} */}
    </div>
  );
};
