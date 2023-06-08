import { AppPaths } from "@constants";
import {
    AssignmentIcon,
    AttachMoneyIcon,
    BannerIcon,
    BrandsIcon,
    CategoryIcon,
    FolderSpecialIcon,
    MachineIcon,
    MenuIcon
} from "@icons";
import { INavigationItem } from "@interfaces";

export const navigationList: INavigationItem[] = [
  {
    name: "Products",
    src: AppPaths.products,
    icon: FolderSpecialIcon,
  },
  {
    name: "Category",
    src: AppPaths.categories,
    icon: CategoryIcon,
  },
  {
    name: "Banner",
    src: AppPaths.banners,
    icon: BannerIcon,
  },
  {
    name: "Brend",
    src: AppPaths.brands,
    icon: BrandsIcon,
  },
  {
    name: "Delivery",
    src: AppPaths.deliveryType,
    icon: MachineIcon,
  },
  {
    name: "Charachteristics",
    src: AppPaths.characteristics,
    icon: MenuIcon,
  },
  // {
  //   name: "Способы оплаты",
  //   src: AppPaths.paymentTypes,
  //   icon: AttachMoneyIcon,
  // },
  // {
  //   name: "Заказы",
  //   src: AppPaths.orders,
  //   icon: AssignmentIcon,
  // },
  {
    name: "Information",
    src: AppPaths.info,
    icon: AssignmentIcon,
  },
];
