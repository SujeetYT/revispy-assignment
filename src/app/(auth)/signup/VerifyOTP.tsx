"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios, { AxiosError } from "axios"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  otp: z.string().min(8, {
    message: "Your one-time password must be 8 characters.",
  }),
})

const InputOTPForm = () => {
  const email = localStorage.getItem("email");
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { otp } = data
      const email = localStorage.getItem("email")

      const header = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ email, otp });
      // Send a POST request to the server
      const response = await axios.post("/api/verifyOtp", body, { headers: header });
      console.log(response);

      if (response.status === 200) {
        // console.log(response.data?.message); 
        toast({ title: response.data?.message });
        localStorage.removeItem("email");
        router.push("/login");
      }

    } catch (error: AxiosError | any) {
      if (error.status === 400) {
        toast({ title: error.response?.data?.error });
        console.log(error.response?.data?.error);
      } else if (error.status === 500) {
        toast({ title: error.response?.data?.error });
        console.log(error.response?.data?.error);
      }
    }
  }

  return (
    <>
      <Card className="w-full px-6 md:px-16 pb-16 flex flex-col items-center">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Verify your email</CardTitle>
          <CardDescription className="text-center">
            Enter the 8 digit code you have received on {email}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={8} {...field}>
                      <InputOTPGroup className="flex justify-between w-full">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Verify</Button>
          </form>
        </Form>
      </Card>
    </>
  )
}

export default InputOTPForm