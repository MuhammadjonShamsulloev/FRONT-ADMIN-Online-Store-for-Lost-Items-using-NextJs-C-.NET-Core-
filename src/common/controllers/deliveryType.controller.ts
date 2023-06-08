import { AppPaths } from "@constants";
import { IDeliveryType } from "@interfaces";
import { deliveryTypeServices } from "@services";
import { AppDispatch } from "@store";
import * as actions from "@store/slice";
import { history } from "@utils/history";

export const getDeliveryTypesController =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.deliveryTypeStartPending());

      const response = await deliveryTypeServices.get();

      const deliveryTypes: IDeliveryType[] = response.data;

      dispatch(actions.deliveryTypeSetData(deliveryTypes));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.deliveryTypeSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.deliveryTypeStopPending());
      }, 500);
    }
  };

export const getByIdDeliveryTypesController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.deliveryTypeStartPending());

      const response = await deliveryTypeServices.getById(id);

      const deliveryType: IDeliveryType = response.data;

      dispatch(actions.deliveryTypeSetById(deliveryType));
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.deliveryTypeSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.deliveryTypeStopPending());
      }, 500);
    }
  };

export const createDeliveryTypeController =
  (deliveryType: Omit<IDeliveryType, "id">) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.deliveryTypeStartPending());

      const response = await deliveryTypeServices.create(deliveryType);

      if (response.status === 200) history.push(AppPaths.deliveryType);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.deliveryTypeSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.deliveryTypeStopPending());
      }, 500);
    }
  };

export const editDeliveryTypeController =
  (deliveryType: Omit<IDeliveryType, "id">, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.deliveryTypeStartPending());

      const response = await deliveryTypeServices.edit(deliveryType, id);

      if (response.status === 204) history.push(AppPaths.deliveryType);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.deliveryTypeSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.deliveryTypeStopPending());
      }, 500);
    }
  };

export const deleteDeliveryTypeController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.deliveryTypeStartPending());

      const response = await deliveryTypeServices.delete(id);

      if (response.status === 204) {
        dispatch(actions.deliveryTypeRemove(id));
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.deliveryTypeSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.deliveryTypeStopPending());
      }, 500);
    }
  };

export const deliveryTypeControllers = Object.freeze(
  Object.seal({
    get: getDeliveryTypesController,
    getById: getByIdDeliveryTypesController,
    create: createDeliveryTypeController,
    edit: editDeliveryTypeController,
    delete: deleteDeliveryTypeController,
  })
);
