import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import makeHttp from "../../utils/http";
import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from "../../utils/models";

export const TransactionsNewPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  async function onSubmit(data: any) {
    try {
      await makeHttp().post("transactions", data);
      router.push("/transactions");
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        Nova transações
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("payment_date")}
              type="date"
              required
              label="Data pagamento"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("name")}
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLen: 255 }}
            />
            <TextField
              {...register("description")}
              label="Descrição"
              required
              fullWidth
            />
            <TextField
              {...register("category")}
              select
              required
              label="Categoria"
              fullWidth
            >
              {TransactionCategoryLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("amount", { valueAsNumber: true })}
              required
              type="number"
              label="Valor"
              fullWidth
            />
            <TextField
              {...register("type")}
              select
              required
              label="Tipo Operação"
              fullWidth
            >
              {TransactionTypeLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <Box marginTop={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TransactionsNewPage;
