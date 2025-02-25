import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import Link from "next/link"
import { Menu, Search, Bell, User, ChevronDown } from "lucide-react"

import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { columns } from "./components/columns"

export const metadata: Metadata = {
  title: "Teacher Registrations",
  description: "View and manage teacher registrations",
}

async function getRegistrations() {
  try {
    const response = await fetch('http://10.0.25.164:8080/trls-80/teacher_registrations/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 3600 // Revalidate every hour (in seconds)
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return [];
  }
}

export default async function TeacherRegistrationsPage() {
  const registrations = await getRegistrations()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* App Bar */}
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            {/* Logo and Mobile Menu */}
            {/* <div className="flex items-center">
              <button className="mr-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/" className="flex items-center">
                <div className="mr-2 h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">TR</span>
                </div>
                <span className="hidden text-lg font-bold text-gray-900 md:inline-block">
                  Teacher Registry
                </span>
              </Link>
            </div> */}
            
            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/registrations" className="text-sm font-medium text-blue-600">
                Registrations
              </Link>
              <Link href="/qualifications" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                Qualifications
              </Link>
              <Link href="/reports" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                Reports
              </Link>
              <Link href="/settings" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                Settings
              </Link>
            </nav> */}
            
            {/* Right Side Actions */}
            {/* <div className="flex items-center space-x-4">
              <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                <Search className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                <Bell className="h-5 w-5" />
              </button>
              <UserNav />
            </div> */}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:px-6">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Teacher Registrations
            </h1>
            <p className="mt-1 text-sm text-gray-500 md:text-base">
              View all registered teachers in the system
            </p>
          </div>
          
          {/* <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link 
              href="/registrations/export" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              Export
            </Link>
            <Link 
              href="/registrations/new" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Add Registration
            </Link>
          </div> */}
        </div>
        
        {/* Stats Cards */}
        {/* <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Total Registrations</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{registrations.length}</div>
            <div className="mt-1 text-sm text-green-600">+12% from last month</div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Pending Approvals</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">24</div>
            <div className="mt-1 text-sm text-red-600">+5% from last month</div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-gray-500">Renewals Due</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">18</div>
            <div className="mt-1 text-sm text-yellow-600">Due within 30 days</div>
          </div>
        </div> */}
        
        {/* Data Table */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <DataTable data={registrations} columns={columns} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              © 2025 Teacher Registration System. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}