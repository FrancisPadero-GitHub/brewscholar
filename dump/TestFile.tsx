"use client";
import { useCallback, useState } from "react";
import { MyButton } from "@/components/custom/buttons/MyButton";

interface UsersData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface ApiResponse {
  result: UsersData[];
}

const fetchData = async (): Promise<ApiResponse[] | null> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/");
    if (!res.ok) throw new Error(res.statusText);
    return (await res.json()) as ApiResponse[];
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
};

const TestFile = () => {
  const [users, setUsers] = useState<ApiResponse[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetched = await fetchData();
      if (fetched) setUsers(fetched);
      else setError("No data found");
    } catch (err) {
      console.log("Error fetching data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("Users state:", users);

  return (
    <div>
      <h1>Testing Page</h1>
      <p>This is a testing page for development purposes.</p>
      <MyButton viewData={showData} />

      {users && (
        <div>
          <h2>User Data:</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* {users?.map((user) => (
            <div key={user.id} style={{ marginBottom: "20px" }}>
              <h3>{user.name}</h3>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>
                Address: {user.address.street}, {user.address.suite},{" "}
                {user.address.city}, {user.address.zipcode}
              </p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              <p></p>Company: {user.company.name}
              <p>Catch Phrase: {user.company.catchPhrase}</p>
              <p>BS: {user.company.bs}</p>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default TestFile;
