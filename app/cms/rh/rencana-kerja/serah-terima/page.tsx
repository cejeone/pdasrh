"use client";

import { useMemo, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, ChevronDown, Settings2Icon, Plus, Trash2Icon, FileText } from "lucide-react";

import { columns } from "./columns";
import { Nursery } from "./types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MultiSelect } from "@/components/MultiSelect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const data: Nursery[] = [
  {
    id: "1",
    nomor: "BAST_001",
    kontrak: "KONTRAK_001",
    kegiatan: "K-000-000-1",
    dokumen: "doc_bast.pdf",
    status: "diterima",
  },
];

export default function SerahTerima() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchColumns, setSearchColumns] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!searchKeyword) return data;

    const columnsToSearch = searchColumns.length > 0 ? searchColumns : Object.keys(data[0] ?? []);

    return data.filter((row: Nursery) =>
      columnsToSearch.some((col) => {
        const value = String(row[col as keyof Nursery] ?? "").toLowerCase();
        return value.includes(searchKeyword.toLowerCase());
      })
    );
  }, [data, searchKeyword, searchColumns]);

  const table = useReactTable({
    data: filteredData, // ← gunakan filteredData, bukan data asli
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Breadcrumbs items={[{ label: "Rencana Kerja", href: "#" }, { label: "Serah Terima" }]} />
              <div className="flex items-center gap-2 text-secondary-green">
                <FileText />
                <h1 className="text-2xl font-bold ">Serah Terima</h1>
              </div>
              <p className="text-sm text-base-gray">Informasi terkait data Serah Terima</p>
            </div>
            <Link href="monitoring-evaluasi/create">
              <Button variant="green">
                <Plus />
                Tambah Data
              </Button>
            </Link>
          </div>
        </div>
        <hr />

        {/* Table Content */}
        <main className="overflow-auto">
          <div className="w-full">
            <div className="flex items-center justify-between py-4">
              <div className="menu-left flex gap-3">
                <MultiSelect
                  options={table
                    .getAllColumns()
                    .filter((col) => col.getCanHide() && col.id !== "actions")
                    .map((col) => ({ label: col.id, value: col.id }))}
                  value={searchColumns}
                  onValueChange={setSearchColumns}
                  placeholder="Cari berdasarkan"
                />

                <Input placeholder="Cari..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="max-w-sm" />
              </div>

              <div className="menu-right flex gap-3">
                {selectedRows.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="text-white text-left">
                        <Trash2Icon className="text-white mr-2" /> Hapus
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Yakin ingin menghapus {selectedRows.length} data?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-base-destructive text-white hover:bg-destructive/90"
                          onClick={() => {
                            const idsToDelete = selectedRows.map((row) => row.original.id);
                            console.log("Hapus ID:", idsToDelete);
                            // TODO: ganti dengan API call atau state update
                            setRowSelection({});
                          }}>
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                <Button variant="outline" className="icon ">
                  <Settings2Icon /> Status
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Settings2Icon /> View <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <small className="font-bold">Tampilkan Kolom</small>
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination section */}
            <div className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span>Row per page</span>
                  <Select value={table.getState().pagination.pageSize.toString()} onValueChange={(value) => table.setPageSize(Number(value))}>
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span>
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>

                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="icon" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
