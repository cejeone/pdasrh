"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  PlusCircle,
  Settings2Icon,
  Plus,
  ChevronsLeft,
  ChevronsRight,
  InfoIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { IconBorderOuter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export type Nursery = {
  no: string;
  program: string;
  kegiatan: string;
  bpdas: string;
  das: string;
  kawasan: string;
  skema: string;
  tahun: number;
  status: string;

};

const data: Nursery[] = [
  { no: "1", program: "PROG_001", kegiatan: "Penghijauan DAS Serayu", bpdas: "BPDAS CILIWUNG", das: 'DAS CILIWIUNG', kawasan: 'APL', skema: 'AGROFORESTRY', tahun: 2025, status: "aktif" },
  { no: "2", program: "PROG_002", kegiatan: "Rehabilitasi Hutan di DAS Citarum", bpdas: "BPDAS CILIWUNG", das: 'DAS CILIWIUNG', kawasan: 'HL', skema: 'AGROFORESTRY', tahun: 2025, status: "aktif" },
  { no: "3", program: "PROG_003", kegiatan: "Pengelolaan Sumber Daya Alam di Hutan Lindung", bpdas: "BPDAS CILIWUNG", das: 'DAS CILIWIUNG', kawasan: 'HK', skema: 'AGROFORESTRY', tahun: 2025, status: "aktif" },
];

export const columns: ColumnDef<Nursery>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "no",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        No <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "program",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        PROGRAM <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "kegiatan",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        KEGIATAN <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "bpdas",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        BPDAS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "das",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        DAS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "kawasan",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        KAWASAN <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "skema",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        SKEMA <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        TAHUN <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        STATUS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              status === "aktif" ? "bg-base-green text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </span>
        );
    },
  },
  {
    id: "actions",
    accessorKey: "AKSI",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.no;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/cms/ppth/administrasi/persemaian/${id}/edit`}>
                <PencilIcon /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/cms/ppth/administrasi/persemaian/${id}/detail`}>
                <InfoIcon /> Detil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="destructive" className="text-white w-full text-left">
                <Trash2Icon className="text-white" /> Hapus
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Program() {
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
              <div className="text-sm text-base-gray">Rencana Kerja / Kegiatan</div>
              <div className="flex items-center gap-2">
                <IconBorderOuter />
                <h1 className="text-2xl font-bold text-secondary-green">Kegiatan</h1>
              </div>
              <p className="text-sm text-base-black">Informasi terkait data kegiatan</p>
            </div>
            <Link href="/cms/rh/rencana-kerja/kegiatan/create/kegiatan">
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
                  value={(table.getColumn("kegiatan")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("kegiatan")?.setFilterValue(event.target.value)}
                  className="max-w-sm"
                />
                <Button variant="outline" className="icon">
                  <Settings2Icon /> BPDAS
                </Button>
                <Button variant="outline" className="icon">
                  <Settings2Icon /> DAS
                </Button>
                <Button variant="outline" className="icon">
                  <Settings2Icon /> Kawasan
                </Button>
              </div>
              <div className="menu-right flex gap-3">
                {selectedRows.length > 0 && (
                  <Button variant="destructive" className="icon">
                    <PlusCircle /> Hapus
                  </Button>
                )}
                <Button variant="outline" className="icon">
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
