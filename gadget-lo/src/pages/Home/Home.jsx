import { useSelector } from "react-redux";

export const Home = () => {
  const userSlice = useSelector((state) => state.users);
  console.log({ userSlice });
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};
