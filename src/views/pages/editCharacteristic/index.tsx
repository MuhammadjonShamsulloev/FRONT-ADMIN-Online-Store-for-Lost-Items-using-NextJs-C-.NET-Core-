import { Link, Page } from "@components";
import { AppPaths, ErrorPaths } from "@constants";
import { characteristicControllers } from "@controllers";
import { ICharacteristic } from "@interfaces";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { history } from "@utils/history";
import classNames from "classnames";
import React from "react";
import { useParams } from "react-router-dom";

export const EditCharacteristic: React.FC = (): JSX.Element => {
  const { id } = useParams();

  const [name, setName] = React.useState<string>("");

  const dispatch = useAppDispatch();
  const { data, pending } = useAppSelector((state) => state.characteristic);

  const handleEditCharacteristic = React.useCallback(() => {
    if (!id) return;
    dispatch(characteristicControllers.edit({ name }, id));
  }, [dispatch, id, name]);

  React.useEffect(() => {
    dispatch(characteristicControllers.get());
  }, [dispatch]);

  React.useEffect(() => {
    if (!pending || !data.length) return;
    const characteristic: ICharacteristic | undefined = data.find(
      (item) => item.id === id
    );
    if (!characteristic) return history.push(ErrorPaths.notFound);
    setName(characteristic.name);
  }, [id, data, pending]);

  return (
    <Page title="Modify характеристику">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Modify характеристику</h1>
          <div className="deliveryType__add-new mb-3">
            <div className="d-flex gap-20">
              <div className="deliveryType__add-new-label">
                <p>Name характеристики</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="deliveryType__add-new-input"
                />
              </div>
            </div>
            <button
              disabled={pending}
              className={classNames(
                "deliveryType__add-new-btn",
                pending && "deliveryType__add-new-btn_pending"
              )}
              onClick={handleEditCharacteristic}
            >
              Modify
            </button>
            <Link
              to={AppPaths.characteristics}
              className="deliveryType__add-new-btn-cancel"
            >
              Отмена
            </Link>
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
