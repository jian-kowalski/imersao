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

import * as React from "react";

type Props = {};
const columns: Column[] = [
  { name: "payment_date", title: "Data Pag." },
  { name: "name", title: "Nome" },
  { name: "category", title: "Categoria" },
  { name: "type", title: "Operação" },
  { name: "created_at", title: "Criado em" },
];
export const TransactionsPage = (props: Props) => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas transações
      </Typography>
      <Grid rows={[]} columns={columns}>
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
