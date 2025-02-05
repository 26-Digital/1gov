"use client"

import React, { useState } from 'react';
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, MapPin, User, Phone, Mail, AlertTriangle, Building, Calendar } from "lucide-react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  userRole?: string
}



interface TipOffDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  record: {
    application_id: string
    user_id: string
    tipoff_number: string;
    reg_status: string
    first_name: string
    middle_name: string
    surname: string
    primary_email: string
    primary_phone: string
    primary_postal: string
    gender: string
    nationality: string
    breach_nature: string
    breach_description: string
    breach_location: string
    breach_date: string
    profile_data_consent: true
    service_id: string
    service_name: string
    service_version: string
  }
  onOpen: () => void
}

const TipOffDetailsDialog: React.FC<TipOffDetailsDialogProps> = ({
  isOpen,
  onClose,
  record,
  onOpen
}) => {
  const fullName = `${record.first_name} ${record.middle_name ? record.middle_name + ' ' : ''}${record.surname}`

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>Breach Report Details</span>
            <Badge variant="outline">{record.application_id}</Badge>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Card className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Full Name:</span>
                    <span>{fullName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <span>{record.primary_phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{record.primary_email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Gender:</span>
                    <span>{record.gender}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Breach Nature:</span>
                    <span>{record.breach_nature}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{record.breach_location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Date:</span>
                    <span>{record.breach_date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Service:</span>
                    <span>{record.service_name}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-medium">Description:</span>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {record.breach_description}
                </p>
              </div>
            </Card>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onOpen}>View Full Details</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TipOffDetailsDialog

export function TipOffTableRowActions<TData>({
  row,
  userRole
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const record = row.original as {
    application_id: string
    user_id: string
    tipoff_number: string;
    reg_status: string
    first_name: string
    middle_name: string
    surname: string
    primary_email: string
    primary_phone: string
    primary_postal: string
    gender: string
    nationality: string
    breach_nature: string
    breach_description: string
    breach_location: string
    breach_date: string
    profile_data_consent: true
    service_id: string
    service_name: string
    service_version: string
  }

  function handleOpen() {
    router.push(`/trls/work/tipoff/${record.user_id}`)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Quick View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpen}>
            View Full Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TipOffDetailsDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        record={record}
        onOpen={handleOpen}
      />
    </>
  )
}