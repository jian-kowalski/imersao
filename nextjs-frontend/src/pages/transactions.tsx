import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SortingState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  PagingPanel,
  SearchPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { Container, Typography } from "@material-ui/core";
import { GetServerSideProps, NextPage } from "next";

import * as React from "react";
import { Token, validateAuth } from "../utils/auth";
import { http } from "../utils/http";
import { Transaction } from "../utils/models";

interface TransationsPagePros {
  transactions: Transaction[];
}

const columns: Column[] = [
  { name: "payment_date", title: "Data Pag." },
  { name: "name", title: "Nome" },
  { name: "category", title: "Categoria" },
  { name: "type", title: "Operação" },
  { name: "created_at", title: "Criado em" },
];
export const TransactionsPage: NextPage<TransationsPagePros> = (props) => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas transações
      </Typography>
      <Grid rows={props.transactions} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: "created_at", direction: "desc" }]}
        />
        <SearchState />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Container>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const token = (auth as Token).token;
  const { data: transactions } = await http.get("transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    
  return {
    props: { transactions },
  };
};
