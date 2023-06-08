import { Link, Page, Pagination, Prodcard, Search } from "@components";
import { AppPaths } from "@constants";
import { productControllers } from "@controllers";
import { QueryToObject, QueryToString } from "@functions";
import { IProduct, IProductsParams } from "@interfaces";
import { MainLayout } from "@layouts";
import { ProductsSkeleton } from "@skeletons";
import { useAppDispatch, useAppSelector } from "@store";
import React from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductsFilter } from "views/components/ProductsFilter";

const initialParams: IProductsParams = {
  pageNumber: 1,
  query: "",
};

export const Products: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { data, pending, paginationPending, pageCount, statuses } =
    useAppSelector((state) => state.product, shallowEqual);

  const navigate = useNavigate();

  const [params, setParams] = React.useState<IProductsParams | null>(null);

  const handleSetParams = (
    state: keyof IProductsParams,
    value: string | number
  ): void => {
    setParams((prev) => ({ ...prev, [state]: value }));
  };

  const handleDeleteProduct = React.useCallback(
    async (id: string) => {
      if (!params) return;
      dispatch(productControllers.delete(id));
      dispatch(productControllers.get(params));
    },
    [dispatch, params]
  );

  React.useEffect(() => {
    if (!params) return;
    navigate(AppPaths.products + "?" + QueryToString(params));
  }, [navigate, params]);

  React.useMemo(() => {
    const urlParams = QueryToObject();

    setParams({
      pageNumber: Number(urlParams.pageNumber || initialParams.pageNumber),
      query: urlParams.query || initialParams.query,
    });
  }, []);

  React.useEffect(() => {
    if (!params) return;
    dispatch(productControllers.get(params, { statuses, data, pageCount }));
  }, [dispatch, params]);

  const handleFilterChange = (id: string) => {
    setParams((prev) => ({
      ...prev,
      categoryId: id,
      pageNumber: 1,
    }));
  };

  return (
    <Page title="Products">
      <MainLayout>
        <div className="products">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Products</h1>
            <Link to={AppPaths.addProduct} className="button button-primary">
              Add a product
            </Link>
          </div>
          <div className="products__tools">
            <Search
              className="products__search"
              value={params?.query || ""}
              onChange={(v: string) => handleSetParams("query", v)}
              placeholder="Search by name"
            />
          </div>

          <ProductsFilter onChange={handleFilterChange} />

          {pending && <ProductsSkeleton />}
          {!pending && (
            <div
              className="products__list"
              style={(!data.length && { justifyContent: "center" }) || {}}
            >
              {data.length ? (
                data.map((item: IProduct) => (
                  <Prodcard
                    key={item.id}
                    id={item.id}
                    isNew={item.isNew}
                    discount={item.discount}
                    imgSrc={item.images && item.images[0]}
                    name={item.name}
                    price={item.price}
                    isHidden={item.hideProduct}
                    date={item.productDate}
                    onDelete={() => handleDeleteProduct(item.id)}
                  />
                ))
              ) : (
                <h3>No data found!</h3>
              )}
            </div>
          )}
          <Pagination
            className="products__pagination mt-2"
            page={Number(params?.page || 1)}
            totalPages={pageCount}
            onPageChange={(p: number) => handleSetParams("page", p)}
          />
        </div>
      </MainLayout>
    </Page>
  );
};
