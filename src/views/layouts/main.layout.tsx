import { Header, Navigation } from "@components";
import { AuthPaths } from "@constants";
import { useAppSelector } from "@store";
import { LSTokenName } from "@utils/LocaStorage";
import { history } from "@utils/history";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<IProps> = (props): JSX.Element => {
  const { freezed } = useAppSelector((state) => state.app);
  const { token } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    if (token.trim() !== "") return;
    history.push(AuthPaths.login);
    localStorage.removeItem(LSTokenName);
  }, [token]);

  return (
    <div className="mainLayout">
      <Header disabled={freezed} />
      <Navigation disabled={freezed} />
      <div className="container">
        <div className="mainLayout__content">{props.children}</div>
      </div>
    </div>
  );
};
