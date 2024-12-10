'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {CreditCardIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

const paymentSchema = z.object({
    amount: z.number().min(1000, 'Minimum payment is ₦1,000'),
    type: z.enum(['security', 'development']),
    houseNumber: z.string().min(2, 'House number is required'),
    description: z.string().min(3, 'Description is required'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentForm = () => {

    const form = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
    });

    const onSubmit = (data: PaymentFormData) => {
        console.log('Payment submitted:', data);
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="houseNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>House Number</FormLabel>
                        <FormControl>
                            <Input {...field} defaultValue={'H-01'}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Payment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="security">Security Levy</SelectItem>
                                <SelectItem value="development">Development Levy</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button className={'w-full'}>
                <CreditCardIcon  /> Make Payment
            </Button>
        </form>
        </Form>
    );
};

export default PaymentForm;