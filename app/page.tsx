import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import { Header } from "@/components/header"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">6 remaining for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 min</div>
              <p className="text-xs text-muted-foreground">-2 min from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,780</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Latest patient registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.reason}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{patient.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Next scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {appointment.time}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">Dr. {appointment.doctor}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{appointment.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Staff On Duty</CardTitle>
              <CardDescription>Current shift personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffOnDuty.map((staff) => (
                  <div key={staff.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{staff.shift}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const recentPatients = [
  {
    id: 1,
    name: "lwanga",
    reason: "Annual checkup",
    date: "Today",
  },
  {
    id: 2,
    name: "samson",
    reason: "Flu symptoms",
    date: "Yesterday",
  },
  {
    id: 3,
    name: "henry",
    reason: "Prenatal visit",
    date: "Yesterday",
  },
  {
    id: 4,
    name: "hadijah",
    reason: "Blood test",
    date: "2 days ago",
  },
]

const upcomingAppointments = [
  {
    id: 1,
    patientName: "Azawi",
    doctor: "Samson",
    time: "10:30",
    date: "Today",
  },
  {
    id: 2,
    patientName: "vink",
    doctor: "Wilbroad",
    time: "11:15",
    date: "Today",
  },
  {
    id: 3,
    patientName: "sheebah",
    doctor: "Samson",
    time: "14:00",
    date: "Today",
  },
  {
    id: 4,
    patientName: "Ava peace",
    doctor: " Dr. Samson",
    time: "09:30",
    date: "Tomorrow",
  },
]

const staffOnDuty = [
  {
    id: 1,
    name: "Dr. samson",
    role: "Physician",
    shift: "8AM-5PM",
  },
  {
    id: 2,
    name: "Dr. Wilbroad",
    role: "Cardiologist",
    shift: "9AM-6PM",
  },
  {
    id: 3,
    name: "Inocent",
    role: "Head Nurse",
    shift: "7AM-7PM",
  },
  {
    id: 4,
    name: "lwanga",
    role: "IT suppoter",
    shift: "7PM-7AM",
  },
]
