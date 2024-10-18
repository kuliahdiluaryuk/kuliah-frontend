"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { PasswordInput } from "@/components/forms/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { signupPayload, signupSchema } from "@/lib/validators/sign-up";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<signupPayload>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birth: "",
      major: "",
      referral: "",
    },
  });

  const onSubmit = async (values: signupPayload) => {
    // Format date of birth
    const day = values.birth.substring(0, 2);
    const month = values.birth.substring(2, 4);
    const year = values.birth.substring(4, 8);
    const formattedDate = `${year}-${month}-${day}`;

    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/register`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          date_birth: formattedDate,
          major: values.major,
          country: values.country,
        }
      );

      router.push("/sign-in");
      toast({
        variant: "yellow",
        title: "Sign up success",
        description: "Please check your email",
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data?.message;

        // Handle multiple validation errors
        const formattedErrors = Object.keys(errorMessage)
          .map((field) => errorMessage[field].join(", "))
          .join("\n");

        return toast({
          variant: "destructive",
          title: "Failed to sign up",
          description: formattedErrors, // Display the detailed error messages
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  disabled={isLoading}
                  {...field}
                />
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
              <FormLabel>
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  disabled={isLoading}
                  {...field}
                />
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
              <FormLabel>
                Password <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone Number <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  country={"id"}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                  placeholder={"Enter your phone number"}
                  enableSearch
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date of Birthday <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={8} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} placeholder="D" />
                    <InputOTPSlot index={1} placeholder="D" />
                  </InputOTPGroup>
                  {/* <InputOTPSeparator /> */}
                  <InputOTPGroup>
                    <InputOTPSlot index={2} placeholder="M" />
                    <InputOTPSlot index={3} placeholder="M" />
                  </InputOTPGroup>
                  {/* <InputOTPSeparator /> */}
                  <InputOTPGroup>
                    <InputOTPSlot index={4} placeholder="Y" />
                    <InputOTPSlot index={5} placeholder="Y" />
                    <InputOTPSlot index={6} placeholder="Y" />
                    <InputOTPSlot index={7} placeholder="Y" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What major <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your major"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAboard"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Intrested to Study Aboard{" "}
                <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  // @ts-expect-error
                  defaultValue={field.value}
                  className="flex space-x-6"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      {/* @ts-expect-error */}
                      <RadioGroupItem value={true} />
                    </FormControl>
                    <FormLabel>Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      {/* @ts-expect-error */}
                      <RadioGroupItem value={false} />
                    </FormControl>
                    <FormLabel>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What country <span className="text-red-600">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Afghanistan">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Afghanistan.png"
                        alt="Afghanistan"
                        width={24}
                        height={18}
                      />{" "}
                      Afghanistan
                    </div>
                  </SelectItem>
                  <SelectItem value="Armenia">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Armenia.png"
                        alt="Armenia"
                        width={24}
                        height={18}
                      />{" "}
                      Armenia
                    </div>
                  </SelectItem>
                  <SelectItem value="Azerbaijan">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Azerbaijan.png"
                        alt="Azerbaijan"
                        width={24}
                        height={18}
                      />{" "}
                      Azerbaijan
                    </div>
                  </SelectItem>
                  <SelectItem value="Brunei">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Brunei.png"
                        alt="Brunei"
                        width={24}
                        height={18}
                      />{" "}
                      Brunei
                    </div>
                  </SelectItem>
                  <SelectItem value="Cambodia">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Cambodia.png"
                        alt="Cambodia"
                        width={24}
                        height={18}
                      />{" "}
                      Cambodia
                    </div>
                  </SelectItem>
                  <SelectItem value="China">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/China.png"
                        alt="China"
                        width={24}
                        height={18}
                      />{" "}
                      China
                    </div>
                  </SelectItem>
                  <SelectItem value="Germany">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Germany.png"
                        alt="Germany"
                        width={24}
                        height={18}
                      />{" "}
                      Germany
                    </div>
                  </SelectItem>
                  <SelectItem value="India">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/India.png"
                        alt="India"
                        width={24}
                        height={18}
                      />{" "}
                      India
                    </div>
                  </SelectItem>
                  <SelectItem value="Indonesia">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Indonesia.png"
                        alt="Indonesia"
                        width={24}
                        height={18}
                      />{" "}
                      Indonesia
                    </div>
                  </SelectItem>
                  <SelectItem value="Japan">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/Japan.png"
                        alt="Japan"
                        width={24}
                        height={18}
                      />{" "}
                      Japan
                    </div>
                  </SelectItem>
                  <SelectItem value="United Kingdom">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/flags/United Kingdom.png"
                        alt="United Kingdom"
                        width={24}
                        height={18}
                      />{" "}
                      United Kingdom
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referral Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="(Optional)"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center space-x-2 space-y-0 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-muted-foreground text-sm">
                  By creating an account and check, you agree to the{" "}
                  <Link href="/" className="text-[#FFD013]">
                    Conditions of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/" className="text-[#FFD013]">
                    Privacy Notice
                  </Link>
                  .
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Create an account
          <span className="sr-only">Sign up</span>
        </Button>
      </form>
    </Form>
  );
}
