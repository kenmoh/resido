"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CalendarIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";

type Expense = {
  id: number
  date: string
  description: string
  amount: number
}

const expenseSchema = z.object({
  amount: z.number().min(1000, 'Minimum payment is ₦1,000'),
  date: z.date(),
  description: z.string().min(3, 'Description is required'),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function Expenses() {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, date: "2023-06-15", description: "Landscaping", amount: 500 },
    { id: 2, date: "2023-06-10", description: "Security Equipment", amount: 1000 },
    { id: 3, date: "2023-06-05", description: "Cleaning Services", amount: 300 },
  ])

  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: "",
    description: "",
    amount: 0
  })

  const handleAddExpense = () => {
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }])
    setNewExpense({ date: "", description: "", amount: 0 })
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-none rounded-sm">
        <CardHeader>
          <CardTitle>Expenses Management</CardTitle>
          <CardDescription>Track and manage estate expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4">Add New Expense</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddExpense)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount(₦)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
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
                      name="description"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                  className="resize-none"
                                  {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <Button className={'w-full'}>
                    Add Expense
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount(₦)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

