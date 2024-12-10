"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {z} from "zod";

type Visitor = {
  id: number
  name: string
  purpose: string
  arrivalTime: string
  departureTime: string | null
}

const visitorSchema = z.object({
  name: z.number().min(1000, 'Minimum payment is ₦1,000'),
  purpose: z.string().min(10, 'Pu'),
  arrivalTime: z.string().min(2, 'House number is required'),
  departureTime: z.string().min(3, 'Description is required'),
});

type visitorFormData = z.infer<typeof visitorSchema>;

export default function Visitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    { id: 1, name: "John Doe", purpose: "Meeting", arrivalTime: "2023-06-15 10:00", departureTime: null },
    { id: 2, name: "Jane Smith", purpose: "Delivery", arrivalTime: "2023-06-15 14:00", departureTime: null },
  ])

  const [newVisitor, setNewVisitor] = useState<Omit<Visitor, 'id' | 'departureTime'>>({
    name: "",
    purpose: "",
    arrivalTime: ""
  })

  const handleAddVisitor = () => {
    setVisitors([...visitors, { ...newVisitor, id: visitors.length + 1, departureTime: null }])
    setNewVisitor({ name: "", purpose: "", arrivalTime: "" })
  }

  const handleSignOut = (id: number) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id ? { ...visitor, departureTime: new Date().toLocaleString() } : visitor
    ))
  }

  return (
    <div className="space-y-4">
      <Card className={'shadow-none rounded-sm'}>
        <CardHeader>
          <CardTitle>Visitors Management</CardTitle>
          <CardDescription>Track and manage estate visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4">Add New Visitor</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Visitor</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={newVisitor.name}
                    onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="purpose" className="text-right">
                    Purpose
                  </Label>
                  <Input
                    id="purpose"
                    className="col-span-3"
                    value={newVisitor.purpose}
                    onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="arrivalTime" className="text-right">
                    Arrival Time
                  </Label>
                  <Input
                    id="arrivalTime"
                    type="datetime-local"
                    className="col-span-3"
                    value={newVisitor.arrivalTime}
                    onChange={(e) => setNewVisitor({ ...newVisitor, arrivalTime: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddVisitor}>Add Visitor</Button>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Departure Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell>{visitor.name}</TableCell>
                  <TableCell>{visitor.purpose}</TableCell>
                  <TableCell>{visitor.arrivalTime}</TableCell>
                  <TableCell>{visitor.departureTime || 'Not signed out'}</TableCell>
                  <TableCell>
                    {!visitor.departureTime && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSignOut(visitor.id)}
                      >
                        Sign Out
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

