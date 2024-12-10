import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const paymentHistory = [
  { id: 1, date: "June 1, 2023", amount: 100.00, status: "Paid" },
  { id: 2, date: "May 1, 2023", amount: 100.00, status: "Paid" },
  { id: 3, date: "April 1, 2023", amount: 100.00, status: "Paid" },
  { id: 4, date: "March 1, 2023", amount: 100.00, status: "Paid" },
]

export default function PaymentHistory() {
  return (
    <Card className={'shadow-none rounded-sm'}>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Your past security levy payments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount(₦)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

