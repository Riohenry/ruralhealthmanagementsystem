"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, Download, FileText, Plus, Search, TestTube } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

export default function LabPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)

  const filteredTests = labTests.filter(
    (test) =>
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testId.toString().includes(searchTerm) ||
      test.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Laboratory Management</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  New Lab Test
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request New Lab Test</DialogTitle>
                  <DialogDescription>
                    Fill in the details to request a new laboratory test for a patient.
                  </DialogDescription>
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
                    <Label htmlFor="test-type">Test Type</Label>
                    <Select>
                      <SelectTrigger id="test-type">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blood">Complete Blood Count (CBC)</SelectItem>
                        <SelectItem value="urinalysis">Urinalysis</SelectItem>
                        <SelectItem value="lipid">Lipid Panel</SelectItem>
                        <SelectItem value="glucose">Blood Glucose</SelectItem>
                        <SelectItem value="liver">Liver Function</SelectItem>
                        <SelectItem value="kidney">Kidney Function</SelectItem>
                        <SelectItem value="thyroid">Thyroid Function</SelectItem>
                        <SelectItem value="covid">COVID-19 Test</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doctor">Requesting Doctor</Label>
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
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Clinical Notes</Label>
                    <Input id="notes" placeholder="Any relevant clinical information" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setOpen(false)}>Request Test</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 sm:flex">
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="samples">Sample Collection</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Laboratory Tests</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tests..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>Manage and track laboratory tests for patients.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Test Name</TableHead>
                        <TableHead className="hidden lg:table-cell">Requested By</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTests.map((test) => (
                        <TableRow key={test.testId}>
                          <TableCell className="font-medium">#{test.testId}</TableCell>
                          <TableCell>{test.patientName}</TableCell>
                          <TableCell className="hidden md:table-cell">{test.testName}</TableCell>
                          <TableCell className="hidden lg:table-cell">{test.requestedBy}</TableCell>
                          <TableCell className="hidden sm:table-cell">{test.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                test.status === "Completed"
                                  ? "border-green-500 text-green-700 bg-green-50"
                                  : test.status === "In Progress"
                                    ? "border-blue-500 text-blue-700 bg-blue-50"
                                    : test.status === "Pending"
                                      ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                                      : "border-red-500 text-red-700 bg-red-50"
                              }`}
                            >
                              {test.status}
                            </Badge>
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
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuItem>Enter Results</DropdownMenuItem>
                                <DropdownMenuItem>Print Report</DropdownMenuItem>
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
          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Tests</CardTitle>
                <CardDescription>Tests awaiting sample collection or processing.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Test Name</TableHead>
                        <TableHead className="hidden lg:table-cell">Requested By</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {labTests
                        .filter((test) => test.status === "Pending" || test.status === "Sample Needed")
                        .map((test) => (
                          <TableRow key={test.testId}>
                            <TableCell className="font-medium">#{test.testId}</TableCell>
                            <TableCell>{test.patientName}</TableCell>
                            <TableCell className="hidden md:table-cell">{test.testName}</TableCell>
                            <TableCell className="hidden lg:table-cell">{test.requestedBy}</TableCell>
                            <TableCell className="hidden sm:table-cell">{test.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  test.priority === "Routine"
                                    ? "border-green-500 text-green-700 bg-green-50"
                                    : test.priority === "Urgent"
                                      ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                                      : "border-red-500 text-red-700 bg-red-50"
                                }`}
                              >
                                {test.priority}
                              </Badge>
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
                                  <DropdownMenuItem>Collect Sample</DropdownMenuItem>
                                  <DropdownMenuItem>Start Processing</DropdownMenuItem>
                                  <DropdownMenuItem>Cancel Test</DropdownMenuItem>
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
          <TabsContent value="completed">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Completed Tests</CardTitle>
                <CardDescription>Tests with finalized results.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Test Name</TableHead>
                        <TableHead className="hidden lg:table-cell">Requested By</TableHead>
                        <TableHead className="hidden sm:table-cell">Completed Date</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {labTests
                        .filter((test) => test.status === "Completed")
                        .map((test) => (
                          <TableRow key={test.testId}>
                            <TableCell className="font-medium">#{test.testId}</TableCell>
                            <TableCell>{test.patientName}</TableCell>
                            <TableCell className="hidden md:table-cell">{test.testName}</TableCell>
                            <TableCell className="hidden lg:table-cell">{test.requestedBy}</TableCell>
                            <TableCell className="hidden sm:table-cell">{test.completedDate || test.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  test.result === "Normal"
                                    ? "border-green-500 text-green-700 bg-green-50"
                                    : test.result === "Abnormal"
                                      ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                                      : test.result === "Critical"
                                        ? "border-red-500 text-red-700 bg-red-50"
                                        : "border-gray-500 text-gray-700 bg-gray-50"
                                }`}
                              >
                                {test.result || "N/A"}
                              </Badge>
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
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Email to Patient</DropdownMenuItem>
                                  <DropdownMenuItem>Email to Doctor</DropdownMenuItem>
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
          <TabsContent value="samples">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Sample Collection</CardTitle>
                <CardDescription>Track and manage patient samples for laboratory tests.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sample ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden md:table-cell">Sample Type</TableHead>
                        <TableHead className="hidden lg:table-cell">Collection Date</TableHead>
                        <TableHead className="hidden sm:table-cell">Collected By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {samples.map((sample) => (
                        <TableRow key={sample.sampleId}>
                          <TableCell className="font-medium">#{sample.sampleId}</TableCell>
                          <TableCell>{sample.patientName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <TestTube className="mr-2 h-4 w-4 text-teal-600" />
                              {sample.sampleType}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{sample.collectionDate}</TableCell>
                          <TableCell className="hidden sm:table-cell">{sample.collectedBy}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                sample.status === "Collected"
                                  ? "border-green-500 text-green-700 bg-green-50"
                                  : sample.status === "In Transit"
                                    ? "border-blue-500 text-blue-700 bg-blue-50"
                                    : sample.status === "Processing"
                                      ? "border-purple-500 text-purple-700 bg-purple-50"
                                      : sample.status === "Awaiting Collection"
                                        ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                                        : "border-red-500 text-red-700 bg-red-50"
                              }`}
                            >
                              {sample.status}
                            </Badge>
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
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuItem>Print Label</DropdownMenuItem>
                                <DropdownMenuItem>Record Collection</DropdownMenuItem>
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

const labTests = [
  {
    testId: 5001,
    patientName: "lwanga",
    testName: "Complete Blood Count (CBC)",
    requestedBy: "Dr. Wilbroad",
    date: "May 12, 2025",
    status: "Completed",
    priority: "Routine",
    result: "Normal",
    completedDate: "May 13, 2025",
  },
  {
    testId: 5002,
    patientName: "James ",
    testName: "Lipid test",
    requestedBy: "Dr. David",
    date: "May 12, 2025",
    status: "In Progress",
    priority: "Routine",
  },
  {
    testId: 5003,
    patientName: "nalwanga",
    testName: "Urinalysis",
    requestedBy: "Dr. Jennifer ",
    date: "May 12, 2025",
    status: "Sample Needed",
    priority: "Routine",
  },
  {
    testId: 5004,
    patientName: "Michael kalule",
    testName: "Blood Glucose",
    requestedBy: "Dr. bafana",
    date: "May 11, 2025",
    status: "Completed",
    priority: "Urgent",
    result: "Abnormal",
    completedDate: "May 11, 2025",
  },
  {
    testId: 5005,
    patientName: " Nabadala Olivia ",
    testName: "Thyroid Function",
    requestedBy: "Dr. Sarah",
    date: "May 11, 2025",
    status: "Pending",
    priority: "Routine",
  },
  {
    testId: 5006,
    patientName: "kalungi",
    testName: "Liver Function",
    requestedBy: "Dr. samson",
    date: "May 10, 2025",
    status: "Completed",
    priority: "Routine",
    result: "Normal",
    completedDate: "May 11, 2025",
  },
  {
    testId: 5007,
    patientName: "Ava peace",
    testName: "COVID-19 Test",
    requestedBy: "Dr. Jennifer ",
    date: "May 10, 2025",
    status: "Completed",
    priority: "Emergency",
    result: "Negative",
    completedDate: "May 10, 2025",
  },
  {
    testId: 5008,
    patientName: "Johnson",
    testName: "Kidney Function",
    requestedBy: "Dr. ssemwanga",
    date: "May 9, 2025",
    status: "Completed",
    priority: "Urgent",
    result: "Critical",
    completedDate: "May 10, 2025",
  },
]

const samples = [
  {
    sampleId: 7001,
    patientName: "cind",
    sampleType: "Blood",
    collectionDate: "May 12, 2025",
    collectedBy: "Mr. Johnson",
    status: "Collected",
  },
  {
    sampleId: 7002,
    patientName: "nabatanzi",
    sampleType: "Blood",
    collectionDate: "May 12, 2025",
    collectedBy: "Nurse Hadijah",
    status: "In Transit",
  },
  {
    sampleId: 7003,
    patientName: "kenzo",
    sampleType: "Urine",
    collectionDate: "Pending",
    collectedBy: "Samson",
    status: "Awaiting Collection",
  },
  {
    sampleId: 7004,
    patientName: "Michael ",
    sampleType: "Blood",
    collectionDate: "May 11, 2025",
    collectedBy: "Nurse inocent",
    status: "Processing",
  },
  {
    sampleId: 7005,
    patientName: "Olivia Nalure",
    sampleType: "Blood",
    collectionDate: "Pending",
    collectedBy: "Pending",
    status: "Awaiting Collection",
  },
  {
    sampleId: 7006,
    patientName: "Sserwanga",
    sampleType: "Blood",
    collectionDate: "May 10, 2025",
    collectedBy: "Mr. geofrey",
    status: "Processed",
  },
  {
    sampleId: 7007,
    patientName: "Ava peace",
    sampleType: "Nasal Swab",
    collectionDate: "May 10, 2025",
    collectedBy: "Sheebah Kalungi",
    status: "Processed",
  },
  {
    sampleId: 7008,
    patientName: "Robert kayanjja",
    sampleType: "Blood",
    collectionDate: "May 9, 2025",
    collectedBy: "Nurse benita",
    status: "Processed",
  },
]
