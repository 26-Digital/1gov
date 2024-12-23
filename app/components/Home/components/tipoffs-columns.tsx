"use client"

import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import { DataTableColumnHeader } from "./data-table-column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tipoff } from "../data/schema"
import { TipOffTableRowActions } from "./tipoff-table-row-actions"


// Column definitions
export const tipoffsColumns: ColumnDef<Tipoff>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tipoff_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tip-off Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge variant="outline">{row.getValue("tipoff_number")}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reporter Name" />
    ),
    cell: ({ row }) => <div className="w-[180px]">{row.getValue("first_name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Number" />
    ),
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("user_id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "breach_nature",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Breach Nature" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("breach_nature")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "breach_location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Breach Location" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("breach_location")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <TipOffTableRowActions row={row} />,
  },
]




