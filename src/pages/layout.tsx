import { Outlet } from "react-router-dom";
import { PageWrapper } from "./styles";

export default function Layout() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
