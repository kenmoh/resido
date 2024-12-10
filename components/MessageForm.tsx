import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const messageSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    priority: z.enum(['low', 'medium', 'high']),
    recipients: z.enum(['all', 'residents', 'security', 'admin']),
});

type MessageFormData = z.infer<typeof messageSchema>;

const MessageForm = ({onSubmit}: {onSubmit: (data: MessageFormData) =>void}) => {
    // const onSubmit = (data: MessageFormData) => {
    //     console.log('Message sent:', data);
    // };

    const form = useForm<MessageFormData>({
        resolver: zodResolver(messageSchema),
    });

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
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
                <div className={'flex gap-2.5 w-full'}>
                    <div className={'w-1/2'}>
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                  <div className={'w-1/2'}>
                      <FormField
                          control={form.control}
                          name="recipients"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Recipient</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                          <SelectTrigger>
                                              <SelectValue placeholder="Select recipients" />
                                          </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                          <SelectItem value="all">All</SelectItem>
                                          <SelectItem value="admin">Admin</SelectItem>
                                          <SelectItem value="residents">Residents</SelectItem>
                                          <SelectItem value="security">Security</SelectItem>
                                      </SelectContent>
                                  </Select>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                  </div>
                </div>
                <Button className={'w-full'}>
                    Send Message
                </Button>
            </form>
        </Form>
    );
};

export default MessageForm;