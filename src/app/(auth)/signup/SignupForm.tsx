"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useDispatch } from "react-redux";
import { setPageState } from "@/redux/slices/signupSlice";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})


const SignupForm = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { username, email, password } = values;
      localStorage.setItem("email", email);

      const header = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ username, email, password });
      
      const response = await axios.post("/api/signup", body, { headers: header });
      // console.log(response);
      
      if (response.status === 201){
        // console.log(response.data?.message); 
        toast({ title: response.data?.message });
        dispatch(setPageState("verify"));
      }

    } catch (error:AxiosError | any) {
      if (error.status === 400) {
        toast({ title: error.response?.data?.error });
        console.log(error.response?.data?.error);
      }else if(error.status === 500){
        toast({ title: error.response?.data?.error });
        console.log(error.response?.data?.error);
      }
    }
  }

  return (
    <Card className="w-full px-6 md:px-16 pb-16">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Create your account</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username" {...field} />
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
          Already have an account? <Link href="/login" className="text-[#000] font-medium">LOGIN</Link>
        </p>
      </div>
    </Card>
  );
};

export default SignupForm;
