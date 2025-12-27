import React, { useState } from "react";
import {
  Typography,
  TableHead,
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TableContainer,
  Grid,
  Button,
  Box,
  TextField,
  Breadcrumbs,
} from "@mui/material";
import TablePaginationActions from "./TablePaginationActions";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface propTypes {
  tableData: Record<string, any>;
  filterRows?: (row: any) => any;
  initialData?: any;
  initialSearch?: string;
}

const ReactTable = ({
  tableData,
  initialData,
  filterRows,
  initialSearch = "",
}: propTypes) => {
  const [rows, setRows] = useState(initialData ? initialData : []);
  const columns: any[] = Object.keys(tableData);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataCount, setTotalDataCount] = React.useState(0);
  const [search, setSearch] = React.useState(initialSearch);
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.auth.role);

  const handleChangePage = (event: any, newPage: any) => {
    if (event) {
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Box
      sx={{
        background: "#fff",
        padding: "1rem",
      }}
    >
      <Breadcrumbs title={""} />
      <Grid container spacing={3} mb={1} sx={{ display: "flex" }}>
        <Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search"
              name="search"
              sx={{
                color: "black!important",
                "& .MuiInputBase-input": {
                  color: "black",
                },
                mr: 2,
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{ input: { style: { color: "white" } } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setPage(0);
                if (initialData?.length) {
                  const regexPatters = new RegExp(search, "i");
                  const filteredData = initialData?.filter(
                    (item: Record<string, string | number>) =>
                      Object.keys(item).some((key) =>
                        regexPatters.test(String(item[key]))
                      )
                  );
                  setTotalDataCount(filteredData?.length || 0);
                  setRows(filteredData);
                }
                setSearch(search);
              }}
            >
              Search
            </Button>
            {role === "admin" && (
              <Button
                onClick={() => {
                  navigate("/add");
                }}
                sx={{ ml: "auto" }}
                variant="contained"
                color="secondary"
              >
                Add
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      <TableContainer>
        <Table
          aria-label=""
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((item: any, index: any) => {
                return (
                  <TableCell key={index}>
                    <Typography variant="h6">{item}</Typography>
                  </TableCell>
                );
              })}
              {role === "admin" && (
                <TableCell>
                  <Typography variant="h6">Actions</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {(initialData?.length
              ? rows?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : rows
            )?.map((row: any) => {
              if (!row) return null;

              if (filterRows) {
                filterRows(row);
              }

              return (
                <TableRow key={row._id}>
                  {columns.map((key: string, index: number) => (
                    <TableCell key={new Date().getTime() + index}>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        sx={{ whiteSpace: "pre-line" }}
                      >
                        {(() => {
                          const keyPath = [tableData[key]];
                          let value = row;

                          for (const path of keyPath) {
                            value = value?.[path];
                          }

                          return Array.isArray(value)
                            ? value.map((item: any, idx: number) => (
                                <span key={idx}>
                                  {item?.[tableData[key + "Name"]] || item}
                                  {idx < value.length - 1 && " , "}
                                </span>
                              ))
                            : value !== null && value !== undefined
                            ? value
                            : "-";
                        })()}
                      </Typography>
                    </TableCell>
                  ))}
                  {role === "admin" && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate(`/takeaction?id=${row.number}`);
                        }}
                      >
                        Take Action
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={rows?.length || dataCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReactTable;
