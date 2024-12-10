import {Card} from "@/components/ui/card";
import React from "react";

type StatType = {
        title: string
        value: string
        icon: React.ElementType
        change: string
        changeType: string
    }

const Stat = ({stat}:{stat:StatType})=> {
    return(
        <Card className={'p-4 shadow-none rounded-sm'}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <stat.icon className="w-6 h-6 text-blue-500"/>
                </div>
                <span
                    className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
        </Card>
    )
}

export default Stat