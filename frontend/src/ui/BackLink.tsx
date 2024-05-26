import { NavLink } from "react-router-dom";

const BackLink = ({ to }: { to: string }) => {
  return <NavLink to={to}>назад</NavLink>;
};

export default BackLink;
