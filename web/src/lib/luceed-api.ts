import { createBasicAuthHeader, TransformDateToDotSeparatedDate } from "./utils";

const LUCEED_USERNAME = "luceed_mb";
const LUCEED_PASSWORD = "7e5y2Uza";
const BASE_LUCEED_API_URL = `http://localhost:3001/api/datasnap`;

const AuthHeader = createBasicAuthHeader(LUCEED_USERNAME, LUCEED_PASSWORD);

type Response<T> = {
  result: T[];
};

type Product = {
  id: number;
  naziv: string;
};

type ProductResponse = Response<{
  artikli: Product[];
}>;

export async function GetProducts({
  name,
  skip = 0,
  limit = 10,
}: {
  name: string;
  skip: number;
  limit: number;
}) {
  const url = `${BASE_LUCEED_API_URL}/rest/artikli/naziv/${name}/[${skip},${limit}]`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: AuthHeader,
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = (await response.json()) as ProductResponse;
  return jsonResponse;
}

type TransactionByPaymentType = {
  vrste_placanja_uid: string;
  naziv: string;
  iznos: number;
};

type TransactionByPaymentTypeResponse = Response<{
  obracun_placanja: TransactionByPaymentType[];
}>;

export async function GetTransactionsByPaymentType({
  paymentType,
  dateFrom,
  dateTo,
}: {
  paymentType: string;
  dateFrom: string;
  dateTo: string;
}) {
  let url = `${BASE_LUCEED_API_URL}/rest/mpobracun/placanja/${paymentType}/${TransformDateToDotSeparatedDate(
    new Date(dateFrom)
  )}`;
  if (dateTo) {
    url += `/${TransformDateToDotSeparatedDate(new Date(dateTo))}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: AuthHeader,
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = (await response.json()) as TransactionByPaymentTypeResponse;
  return jsonResponse;
}

type TransactionByProduct = {
  vrste_placanja_uid: string;
  naziv: string;
  iznos: number;
};

type TransactionByProductResponse = Response<{
  obracun_artikli: TransactionByProduct[];
}>;

export async function GetTransactionsByProduct({
  paymentType,
  dateFrom,
  dateTo,
}: {
  paymentType: string;
  dateFrom: string;
  dateTo: string;
}) {
  let url = `${BASE_LUCEED_API_URL}/rest/mpobracun/artikli/${paymentType}/${TransformDateToDotSeparatedDate(
    new Date(dateFrom)
  )}`;
  if (dateTo) {
    url += `/${TransformDateToDotSeparatedDate(new Date(dateTo))}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: AuthHeader,
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = (await response.json()) as TransactionByProductResponse;
  return jsonResponse;
}
