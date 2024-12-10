"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";


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
  arrivalTime: z.date(),
  departureTime: z.date(),
});

type visitorFormData = z.infer<typeof visitorSchema>;

export default function Visitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    { id: 1, name: "John Doe", purpose: "Meeting", arrivalTime: "2023-06-15 10:00", departureTime: null },
    { id: 2, name: "Jane Smith", purpose: "Delivery", arrivalTime: "2023-06-15 14:00", departureTime: null },
  ])

  const form = useForm<visitorFormData>({
    resolver: zodResolver(visitorSchema),
  });

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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddVisitor)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purpose</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="arrivalTime"
                      render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Arrival Time</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                      variant={"outline"}
                                      className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                      )}
                                  >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="departureTime"
                      render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Departure Time</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                      variant={"outline"}
                                      className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                      )}
                                  >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                      )}
                  />

                  <Button className={'w-full'}>
                    Add Visitor
                  </Button>
                </form>
              </Form>
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

