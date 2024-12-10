"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Resident = {
  id: number
  name: string
  houseNumber: string
  paymentStatus: 'Paid' | 'Unpaid'
}

const residents: Resident[] = [
  { id: 1, name: 'John Doe', houseNumber: '1A', paymentStatus: 'Paid' },
  { id: 2, name: 'Jane Smith', houseNumber: '2B', paymentStatus: 'Unpaid' },
  { id: 3, name: 'Alice Johnson', houseNumber: '3C', paymentStatus: 'Paid' },
  { id: 4, name: 'Bob Williams', houseNumber: '4D', paymentStatus: 'Unpaid' },
  { id: 5, name: 'Charlie Brown', houseNumber: '5E', paymentStatus: 'Paid' },
]

export default function Residents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('all')

  const filteredResidents = residents.filter(resident => 
    (resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resident.houseNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (paymentFilter === 'all' || resident.paymentStatus.toLowerCase() === paymentFilter)
  )

  return (
    <div className="space-y-6">
      <Card className='shadow-none rounded-sm'>
        <CardHeader>
          <CardTitle>Residents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search by Name or House Number</Label>
              <Input
                id="search"
                placeholder="Search residents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="payment-status">Payment Status</Label>
              <Select onValueChange={setPaymentFilter} defaultValue={paymentFilter}>
                <SelectTrigger id="payment-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>House Number</TableHead>
                <TableHead>Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>{resident.name}</TableCell>
                  <TableCell>{resident.houseNumber}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      resident.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {resident.paymentStatus}
                    </span>
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

