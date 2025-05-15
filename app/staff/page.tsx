"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, Plus, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Staff Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                  <DialogDescription>Enter the staff member's information to add them to the system.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="receptionist">Receptionist</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="lab">Lab Technician</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Medicine</SelectItem>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="admin">Administration</SelectItem>
                          <SelectItem value="lab">Laboratory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setOpen(false)}>Add Staff</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 w-full sm:w-auto grid grid-cols-2 sm:grid-cols-5 sm:flex">
            <TabsTrigger value="all">All Staff</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="nurses">Nurses</TabsTrigger>
            <TabsTrigger value="admin">Administrative</TabsTrigger>
            <TabsTrigger value="lab">Laboratory</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Staff Directory</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search staff..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>Manage your staff members and their information.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Role</TableHead>
                        <TableHead className="hidden lg:table-cell">Department</TableHead>
                        <TableHead className="hidden sm:table-cell">Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{member.role}</TableCell>
                          <TableCell className="hidden lg:table-cell">{member.department}</TableCell>
                          <TableCell className="hidden sm:table-cell">{member.contact}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                member.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : member.status === "On Leave"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {member.status}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <span className="sr-only sm:not-sr-only sm:mr-2">Actions</span>
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem>View Schedule</DropdownMenuItem>
                                <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Other tabs content similar to above with responsive tables */}
        </Tabs>
      </main>
    </div>
  )
}

const staff = [
  {
    id: 1,
    name: "Lwanga samon",
    role: "Doctor",
    specialty: "General Medicine",
    department: "General Medicine",
    contact: "+256741811908",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. SAMSON",
    role: "Doctor",
    specialty: "Cardiology",
    department: "Cardiology",
    contact: "+256741811908",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr.  Inocent",
    role: "Doctor",
    specialty: "Pediatrics",
    department: "Pediatrics",
    contact: "+256741811908",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Dr. samson",
    role: "Doctor",
    specialty: "Neurology",
    department: "Neurology",
    contact: "0774880725",
    status: "Active",
  },
  {
    id: 5,
    name: "Johnson",
    role: "Nurse",
    department: "General Medicine",
    contact: "0741811908",
    status: "Active",
  },
  {
    id: 6,
    name: "Nurse ",
    role: "Nurse",
    department: "Cardiology",
    contact: "+256741811908",
    status: "Active",
  },
  {
    id: 7,
    name: " Ben",
    role: "Nurse",
    department: "Pediatrics",
    contact: "+256774048725",
    status: "Active",
  },
  {
    id: 8,
    name: " Wilbroad",
    role: "Receptionist",
    department: "Administration",
    contact: "0741811908",
    status: "Active",
  },
  {
    id: 9,
    name: "henry lwanga",
    role: "Administrator",
    department: "Administration",
    contact: "0741811908",
    status: "Active",
  },
  {
    id: 10,
    name: "hadijah",
    role: "Lab Technician",
    specialty: "Hematology",
    department: "Laboratory",
    contact: "0774880725",
    status: "Active",
  },
  {
    id: 11,
    name: "John",
    role: "Lab Technician",
    specialty: "Microbiology",
    department: "Laboratory",
    contact: "0741811908",
    status: "Active",
  },
  {
    id: 12,
    name: "Wilbroad",
    role: "Lab Technician",
    specialty: "Biochemistry",
    department: "Laboratory",
    contact: "0774880725",
    status: "On Leave",
  },
]
