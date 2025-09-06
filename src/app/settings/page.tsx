"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInvoiceStore } from "@/store/invoiceStore";
import { toast } from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  logo: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  mobile: z.string().min(1, "Mobile is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Settings() {
  const { company, setCompany } = useInvoiceStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: company || {
      logo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5f1182f3-a41c-48f6-acce-c0b0cd000165.png",
      name: "",
      address: "",
      mobile: "",
      email: "",
    },
  });

  const [logoPreview, setLogoPreview] = useState(company?.logo || form.getValues("logo"));

  const onSubmit = (data: FormValues) => {
    setCompany(data);
    toast.success("Company details saved!");
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        form.setValue("logo", base64);
        setLogoPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Company Settings</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={handleLogoChange} />
                </FormControl>
                {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 h-20" />}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
