import {AlertCircle, CreditCard, TrendingUp, Users} from "lucide-react";
import Stat from "@/components/Stat";
import {PaymentSummary} from "@/components/payment-summary";


const stats = [
    {
        title: 'Total Collections',
        value: '₦2,456,000',
        icon: CreditCard,
        change: '+14.6%',
        changeType: 'positive',
    },
    {
        title: 'Outstanding Payments',
        value: '₦847,000',
        icon: AlertCircle,
        change: '-5.2%',
        changeType: 'negative',
    },
    {
        title: 'Active Residents',
        value: '234',
        icon: Users,
        change: '+2.3%',
        changeType: 'positive',
    },
    {
        title: 'Monthly Growth',
        value: '18.2%',
        icon: TrendingUp,
        change: '+4.1%',
        changeType: 'positive',
    },
];
export default function Page() {
  return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
              {
                  stats.map(stat => (<Stat key={stat.title} stat={stat}/>))
              }
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PaymentSummary/>
              <div className="bg-white p-6 rounded-sm border shadow-none">
                  <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b">
                              <div>
                                  <p className="font-medium">Payment Received</p>
                                  <p className="text-sm text-gray-500">House {i}A - Security Levy</p>
                              </div>
                              <div className="text-right">
                                  <p className="font-medium">₦45,000</p>
                                  <p className="text-sm text-gray-500">2 hours ago</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          {/*<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"/>*/}
      </div>
  )
}
