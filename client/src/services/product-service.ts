import { AxiosError } from "axios";
import { api } from "../lib/api";
import { IProductService } from "./interfaces/iproduct-service";
import {
  Product,
  ProductFilter,
  ProductPayload,
} from "../app/product/product.type";
import {
  HTTP_STATUS,
  HttpError,
  MessageResponse,
  SuccessResponse,
  getHttpError,
} from "../lib/http";

export class ProductService implements IProductService {
  async fetchProducts(filter: ProductFilter): Promise<Product[]> {
    try {
      const { data: productData, status } = await api.get<Product[]>(
        "/product",
        {
          params: filter,
        }
      );
      return status != HTTP_STATUS.NO_CONTENT ? productData : [];
    } catch {
      throw new HttpError("Houve um Erro ao Realizar sua Solicitação.");
    }
  }

  async createProduct(
    productPayload: ProductPayload
  ): Promise<SuccessResponse> {
    try {
      const { data } = await api.post<SuccessResponse>(
        "/product",
        productPayload
      );
      return data!;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }

  async updateProduct(
    productId: number,
    productPayload: ProductPayload
  ): Promise<MessageResponse> {
    try {
      const { data } = await api.put<MessageResponse>(
        `/product/${productId}`,
        productPayload
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }

  async deleteProduct(productId: number): Promise<MessageResponse> {
    try {
      const { data } = await api.delete<MessageResponse>(
        `/product/${productId}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }
}
