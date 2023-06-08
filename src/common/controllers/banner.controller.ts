import { AppPaths } from "@constants";
import { IBanner } from "@interfaces";
import { bannerServices } from "@services";
import { AppDispatch } from "@store";
import * as actions from "@store/slice";
import { history } from "@utils/history";

export const getBannersController = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(actions.setAppFreezed(true));
    dispatch(actions.bannerStartPending());

    const response = await bannerServices.get();

    const banners: IBanner[] = response.data;

    dispatch(actions.bannerSetData(banners));
  } catch (error: any) {
    if (error.response) {
      dispatch(actions.bannerSetError(error.response.data.message));
    }
  } finally {
    dispatch(actions.setAppFreezed(false));
    setTimeout(() => {
      dispatch(actions.bannerStopPending());
    }, 500);
  }
};

export const createBannerController =
  (banner: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.bannerStartPending());

      const response = await bannerServices.create(banner);

      if (response.status === 201) history.push(AppPaths.banners);
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.bannerSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.bannerStopPending());
      }, 500);
    }
  };

export const deleteBannerController =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(actions.setAppFreezed(true));
      dispatch(actions.bannerStartPending());

      const response = await bannerServices.delete(id);

      if (response.status === 204) {
        dispatch(actions.bannerRemoveBanner(id));
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(actions.bannerSetError(error.response.data.message));
      }
    } finally {
      dispatch(actions.setAppFreezed(false));
      setTimeout(() => {
        dispatch(actions.bannerStopPending());
      }, 500);
    }
  };

export const bannerControllers = Object.freeze(
  Object.seal({
    get: getBannersController,
    create: createBannerController,
    delete: deleteBannerController,
  })
);
