"use client";

import { useState } from "react";
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

import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, ChevronDown, Settings2Icon, Plus, PlusCircle } from "lucide-react";

import { columns } from "./columns";
import { Nursery } from "./types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { IconBorderOuter } from "@tabler/icons-react";

const data: Nursery[] = [
  { id: "1", persemaian: "CITEPUS", bpdas: "CITARUM-CILIWUNG", lokasi: "SUKABUMI", target: 2200, realisasi: 2100 },
  { id: "2", persemaian: "CIMANGGIS", bpdas: "CITARUM-CILIWUNG", lokasi: "DEPOK", target: 2500, realisasi: 2400 },
  { id: "3", persemaian: "CIBINONG", bpdas: "CITARUM-CILIWUNG", lokasi: "BOGOR", target: 2300, realisasi: 2200 },
  { id: "4", persemaian: "BAMBAN", bpdas: "MALUKU-UTARA", lokasi: "TERNATE", target: 1500, realisasi: 1400 },
  { id: "5", persemaian: "PATTIMURA", bpdas: "MALUKU", lokasi: "AMBON", target: 1700, realisasi: 1600 },
  { id: "6", persemaian: "TANJUNG SELOR", bpdas: "SESAYAP", lokasi: "BULUNGAN", target: 1800, realisasi: 1750 },
  { id: "7", persemaian: "TARAKAN", bpdas: "SESAYAP", lokasi: "TARAKAN", target: 1400, realisasi: 1350 },
  { id: "8", persemaian: "SINTANG", bpdas: "KAPUAS", lokasi: "SINTANG", target: 2100, realisasi: 2000 },
  { id: "9", persemaian: "SAMARINDA", bpdas: "MAHAKAM", lokasi: "SAMARINDA", target: 2400, realisasi: 2300 },
  { id: "10", persemaian: "PONTIANAK", bpdas: "KAPUAS", lokasi: "PONTIANAK", target: 2000, realisasi: 1900 },
  { id: "11", persemaian: "BANJARMASIN", bpdas: "BARITO", lokasi: "BANJARMASIN", target: 1900, realisasi: 1800 },
  { id: "12", persemaian: "PALANGKA RAYA", bpdas: "BARITO", lokasi: "PALANGKA RAYA", target: 2200, realisasi: 2150 },
  { id: "13", persemaian: "BALIKPAPAN", bpdas: "MAHAKAM", lokasi: "BALIKPAPAN", target: 2300, realisasi: 2250 },
  { id: "14", persemaian: "MANADO", bpdas: "TONDANO", lokasi: "MANADO", target: 1700, realisasi: 1600 },
  { id: "15", persemaian: "GORONTALO", bpdas: "BOLANGO", lokasi: "GORONTALO", target: 1600, realisasi: 1500 },
  { id: "16", persemaian: "PALU", bpdas: "PALU", lokasi: "PALU", target: 2100, realisasi: 2000 },
  { id: "17", persemaian: "KENDARI", bpdas: "LASOLO", lokasi: "KENDARI", target: 2000, realisasi: 1950 },
  { id: "18", persemaian: "MAKASSAR", bpdas: "JENE BERANG", lokasi: "MAKASSAR", target: 2500, realisasi: 2450 },
  { id: "19", persemaian: "AMBON", bpdas: "MALUKU", lokasi: "AMBON", target: 1800, realisasi: 1700 },
];

export default function Persemaian() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
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
        <div className="flex flex-col px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-base-gray">Administrasi / Persemaian</div>
              <div className="flex items-center gap-2">
                <IconBorderOuter />
                <h1 className="text-2xl font-bold text-secondary-green">Persemaian</h1>
              </div>
              <p className="text-sm text-base-gray">Informasi terkait persemaian permanen</p>
            </div>
            <Link href="/cms/ppth/administrasi/persemaian/create">
              <Button variant="green">
                <Plus />
                Tambah Data
              </Button>
            </Link>
          </div>
        </div>
        <hr />

        {/* Table Content */}
        <main className="p-4 overflow-auto">
          <div className="w-full">
            <div className="flex items-center justify-between py-4">
              <div className="menu-left flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {" "}
                      Cari berdasarkan <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
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
                <Input
                  placeholder="Cari..."
                  value={(table.getColumn("persemaian")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("persemaian")?.setFilterValue(event.target.value)}
                  className="max-w-sm"
                />
                <Button variant="outline" className="icon">
                  <Settings2Icon /> BPDAS
                </Button>
              </div>
              <div className="menu-right flex gap-3">
                {selectedRows.length > 0 && (
                  <Button variant="destructive" className="icon">
                    <PlusCircle /> Hapus
                  </Button>
                )}
                <Button variant="outline" className="icon">
                  <PlusCircle /> Status
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
