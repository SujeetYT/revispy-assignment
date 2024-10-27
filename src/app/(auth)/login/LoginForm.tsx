"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios, { AxiosError } from "axios"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})


const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, password } = values;
      const header = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ email, password });
      
      const response = await axios.post("/api/login", body, { headers: header });
      // console.log(response);
      
      if (response.status === 200){
        // console.log(response.data?.message); 
        toast({ title: response.data?.message });
      }

    } catch (error:AxiosError | any) {
      if (typeof new AxiosError(error)) {
        toast({ title: error.response?.data?.error });
        console.log(error.response?.data?.error);
      }else{
        toast({ title: "Something went wrong" });
        console.log(error);
      }
    }
  }

  return (
    <Card className="w-full px-6 md:px-16 pb-16">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-black">Welcome back to ECOMMERCE</h3>
          <p className="text-sm text-muted-foreground">The next gen business marketplace</p>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
          >Submit</Button>
        </form>
      </Form>
      <div className="text-center mt-5">
        <p className="text-[#333333]">
          Don't have an account? <Link href="/login" className="text-[#000] font-medium">SIGN UP</Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;
