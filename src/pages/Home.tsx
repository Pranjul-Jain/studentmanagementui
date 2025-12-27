import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import ReactTable from "../components/ReactTable/ReactTable";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";

const Home = () => {
  const role = useAppSelector((state) => state.auth.role);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (role) {
      const getStudentsData = async () => {
        const q = query(collection(db, "students"));

        const result = await getDocs(q);
        const data = result.docs;
        const filteredData = data.map((item) => item.data());
        setData(filteredData || []);
      };
      getStudentsData();
    }
  }, [role]);

  return (
    <ReactTable
      initialData={data}
      key={data?.length}
      tableData={{
        "Student Name": "name",
        "Fathers Name": "fatherName",
        age: "age",
        Gender: "gender",
        "Phone Number": "number",
        Status: "status",
      }}
    />
  );
};

export default Home;
