import React from 'react';
import { Receipt, Clock } from 'lucide-react';
import PaymentForm from "@/components/payment-form";

const Payments = () => {
  const recentPayments = [
    {
      id: 1,
      type: 'Security Levy',
      amount: '₦45,000',
      date: '2024-03-15',
      status: 'completed',
    },
    {
      id: 2,
      type: 'Development Levy',
      amount: '₦75,000',
      date: '2024-03-10',
      status: 'completed',
    }
  ];

  return (
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border-gray-100 border">
            <h2 className="text-xl font-semibold mb-6">Make Payment</h2>
            <PaymentForm />
          </div>

          <div className="bg-white p-6 rounded-lg border-gray-100 border">
            <h2 className="text-xl font-semibold mb-6">Recent Payments</h2>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                  <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <Receipt className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-gray-500">{payment.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{payment.date}</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Payments;