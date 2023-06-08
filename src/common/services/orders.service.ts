import { Api } from "@constants";
import { IOrdersParams } from "@interfaces";
import {
    requestGET,
    requestPUT,
} from "@utils/axios";

const getOrdersService = (params: IOrdersParams) => 
  requestGET(Api.ordersAll, { ...params, pageSize: 9 });

const getByIdOrdersService = (id: string) =>
  requestGET(Api.orders + "/" + id);

const editOrdersService = (body: {orderStatusId: number | string}, id: string) =>
  requestPUT(Api.orders, body, id);

export const ordersServices = Object.freeze(
  Object.seal({
    get: getOrdersService,
    getById: getByIdOrdersService,
    edit: editOrdersService,
  })
);
