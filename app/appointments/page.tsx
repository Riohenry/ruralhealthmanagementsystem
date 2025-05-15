"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, ChevronDown, Plus } from "lucide-react"
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

export default function AppointmentsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Appointment Management</h1>
          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>Fill in the details to schedule a new patient appointment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emma">Emma Thompson</SelectItem>
                        <SelectItem value="james">James Wilson</SelectItem>
                        <SelectItem value="sophia">Sophia Garcia</SelectItem>
                        <SelectItem value="michael">Michael Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select>
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="williams">Dr. Sarah Williams</SelectItem>
                        <SelectItem value="martinez">Dr. David Martinez</SelectItem>
                        <SelectItem value="taylor">Dr. Jennifer Taylor</SelectItem>
                        <SelectItem value="anderson">Dr. Mark Anderson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Appointment Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkup">Regular Checkup</SelectItem>
                        <SelectItem value="followup">Follow-up</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="procedure">Procedure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Any special instructions or notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setOpen(false)}>Schedule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-4 w-full sm:w-auto grid grid-cols-3 sm:flex">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar View
                    </Button>
                  </div>
                </div>
                <CardDescription>Scheduled appointments for the coming days.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Doctor</TableHead>
                        <TableHead className="hidden lg:table-cell">Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.patient}</TableCell>
                          <TableCell className="hidden md:table-cell">{appointment.doctor}</TableCell>
                          <TableCell className="hidden lg:table-cell">{appointment.type}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                appointment.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status}
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
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
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
          <TabsContent value="today">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>All appointments scheduled for today.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Doctor</TableHead>
                        <TableHead className="hidden lg:table-cell">Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todayAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.patient}</TableCell>
                          <TableCell className="hidden md:table-cell">{appointment.doctor}</TableCell>
                          <TableCell className="hidden lg:table-cell">{appointment.type}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                appointment.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : appointment.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "Waiting"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
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
                                <DropdownMenuItem>Check In</DropdownMenuItem>
                                <DropdownMenuItem>Start Appointment</DropdownMenuItem>
                                <DropdownMenuItem>Complete</DropdownMenuItem>
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
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
          <TabsContent value="past">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>History of completed appointments.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Doctor</TableHead>
                        <TableHead className="hidden lg:table-cell">Type</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.patient}</TableCell>
                          <TableCell className="hidden md:table-cell">{appointment.doctor}</TableCell>
                          <TableCell className="hidden lg:table-cell">{appointment.type}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              {appointment.status}
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
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>View Medical Record</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
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
        </Tabs>
      </main>
    </div>
  )
}

const upcomingAppointments = [
  {
    id: 1,
    date: "May 13, 2025",
    time: "09:00 AM",
    patient: "Samson",
    doctor: "Dr.Inocent",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "May 16, 2025",
    time: "10:30 AM",
    patient: "Wilbroad",
    doctor: "Dr. lwanga",
    type: "Consultation",
    status: "Pending",
  },
  {
    id: 3,
    date: "May 13, 2025",
    time: "02:15 PM",
    patient: "hadijah",
    doctor: "Dr. wilbroad",
    type: "Prenatal Checkup",
    status: "Confirmed",
  },
  {
    id: 4,
    date: "May 14, 2025",
    time: "11:00 AM",
    patient: "Michael ",
    doctor: "Dr. hadijah",
    type: "Blood Test",
    status: "Confirmed",
  },
  {
    id: 5,
    date: "May 14, 2025",
    time: "03:30 PM",
    patient: "Olivia ",
    doctor: "Dr. Sarah",
    type: "Regular Checkup",
    status: "Pending",
  },
]

const todayAppointments = [
  {
    id: 1,
    time: "08:30 AM",
    patient: "Robert Johnson",
    doctor: "Dr. Sarah Williams",
    type: "Regular Checkup",
    status: "Completed",
  },
  {
    id: 2,
    time: "09:15 AM",
    patient: "Ava Pease",
    doctor: "Dr. David Martinez",
    type: "Follow-up",
    status: "Completed",
  },
  {
    id: 3,
    time: "10:30 AM",
    patient: "William ",
    doctor: "Dr. Jennifer ",
    type: "Consultation",
    status: "In Progress",
  },
  {
    id: 4,
    time: "11:45 AM",
    patient: "Olivia Davis",
    doctor: "Dr. Mark Anderson",
    type: "Procedure",
    status: "Waiting",
  },
  {
    id: 5,
    time: "02:00 PM",
    patient: "James",
    doctor: "Dr. Sarah ",
    type: "Emergency",
    status: "Waiting",
  },
  {
    id: 6,
    time: "03:30 PM",
    patient: "lwanga",
    doctor: "Dr. David ",
    type: "Prenatal Checkup",
    status: "Scheduled",
  },
]

const pastAppointments = [
  {
    id: 1,
    date: "May 10, 2025",
    time: "10:00 AM",
    patient: "Emma ",
    doctor: "Dr. Sarah ",
    type: "Regular Checkup",
    status: "Completed",
  },
  {
    id: 2,
    date: "May 9, 2025",
    time: "02:30 PM",
    patient: " Wilson",
    doctor: "Dr. David ",
    type: "Follow-up",
    status: "Completed",
  },
  {
    id: 3,
    date: "May 8, 2025",
    time: "11:15 AM",
    patient: "lnnocent",
    doctor: "Dr. Jennifer ",
    type: "Prenatal Checkup",
    status: "Completed",
  },
  {
    id: 4,
    date: "May 7, 2025",
    time: "09:45 AM",
    patient: "Michael",
    doctor: "Dr. Mark ",
    type: "Blood Test",
    status: "Completed",
  },
  {
    id: 5,
    date: "May 6, 2025",
    time: "03:00 PM",
    patient: "Olivia ",
    doctor: "Dr. Sarah ",
    type: "Consultation",
    status: "Completed",
  },
]
