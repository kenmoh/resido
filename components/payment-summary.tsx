"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', security: 4000, development: 2400 },
  { month: 'Feb', security: 3000, development: 1398 },
  { month: 'Mar', security: 2000, development: 9800 },
  { month: 'Apr', security: 2780, development: 3908 },
  { month: 'May', security: 1890, development: 4800 },
  { month: 'Jun', security: 2390, development: 3800 },
]

export function PaymentSummary() {
  return (
    <Card className={'shadow-none border rounded-sm'}>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="security" fill="#2563eb" name="Security Levy" />
              <Bar dataKey="development" fill="#10b981" name="Development Levy" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

