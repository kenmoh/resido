"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Reports() {
  const [reportType, setReportType] = useState('financial')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const generateReport = () => {
    // In a real application, this would generate the report based on the selected options
    console.log('Generating report:', { reportType, startDate, endDate })
  }

  return (
    <div className="space-y-6">
      <Card className={'shadow-none rounded-sm'}>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Create custom reports for your estate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); generateReport(); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select onValueChange={setReportType} defaultValue={reportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Report</SelectItem>
                  <SelectItem value="maintenance">Maintenance Report</SelectItem>
                  <SelectItem value="security">Security Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input 
                  id="start-date" 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input 
                  id="end-date" 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit">Generate Report</Button>
          </form>
        </CardContent>
      </Card>

      <Card className={'shadow-none rounded-sm'}>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Type</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Financial Report</TableCell>
                <TableCell>2023-06-01</TableCell>

                <TableCell>
                  <Button variant="outline" size="sm">Download</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maintenance Report</TableCell>
                <TableCell>2023-05-15</TableCell>

                <TableCell>
                  <Button variant="outline" size="sm">Download</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Security Report</TableCell>
                <TableCell>2023-05-01</TableCell>

                <TableCell>
                  <Button variant="outline" size="sm">Download</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

