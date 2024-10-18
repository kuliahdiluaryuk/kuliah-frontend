"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import { PasswordInput } from "@/components/forms/password-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/lib/cookies";
import { convertToBase64 } from "@/lib/utils";
import {
  accountProfilePayload,
  accountProfileSchema,
} from "@/lib/validators/account-profile";
import { User } from "@/types";

interface AccountProfileFormProps {
  user: User;
}

export const AccountProfileForm: React.FC<AccountProfileFormProps> = ({
  user,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    user.avatar,
  );

  const { toast } = useToast();

  const form = useForm<accountProfilePayload>({
    resolver: zodResolver(accountProfileSchema),
    mode: "onBlur",
    defaultValues: {
      fullname: user.name,
      email: user.email,
      major: user.major,
      phone: user.phone,
      birth: user.date_birth,
      language: user.country,
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("picture", acceptedFiles[0]);
        form.clearErrors("picture");
      } catch (error) {
        setPreview(null);
        form.resetField("picture");
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onRemove = () => {
    setPreview(null);
    form.resetField("picture");
  };

  const onSubmit = async (values: accountProfilePayload) => {
    try {
      setIsLoading(true);
      const token = getToken();

      let base64Image: string | null = null;
      if (values.picture) {
        base64Image = await convertToBase64(values.picture);
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/update`,
        {
          avatar: base64Image,
          name: values.fullname,
          email: values.email,
          email_verified_at: user.email_verified_at,
          phone: values.phone,
          date_birth: values.birth,
          major: values.major,
          country: values.language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response);

      toast({
        variant: "yellow",
        title: "Changes updated",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast({
          variant: "destructive",
          title: "Failed to update",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="picture"
          render={() => (
            <FormItem className="md:flex gap-[32px]">
              <FormLabel className="w-[180px]">Profile Picture</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="w-full md:w-fit flex flex-col justify-center items-center"
                  >
                    {preview && (
                      <Image
                        src={preview as string}
                        alt="Uploaded image"
                        className="rounded-lg object-cover aspect-square"
                        width={90}
                        height={90}
                      />
                    )}
                    <ImagePlus
                      className={`size-[90px] ${preview ? "hidden" : "block"}`}
                    />
                    <p className="mt-[14px] mb-[22px] font-medium text-neutral-500 text-xs">
                      Allowed file types: png, jpg, jpeg.
                    </p>
                    <Input {...getInputProps()} type="file" />
                    {isDragActive ? (
                      <p>Drop the image!</p>
                    ) : (
                      <div className="w-full md:w-fit flex flex-col md:flex-row items-center justify-center gap-4">
                        {preview && (
                          <Button
                            onClick={onRemove}
                            className="w-full"
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Remove
                          </Button>
                        )}
                        <Button
                          onClick={(e) => e.preventDefault()}
                          className="w-full"
                          variant="outline"
                        >
                          <Upload className="w-4 h-4 mr-2" /> Upload
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage>
                  {fileRejections.length !== 0 && (
                    <p>
                      Image must be less than 1MB and of type png, jpg, or jpeg
                    </p>
                  )}
                </FormMessage>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Full Name</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Email Address</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Major</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter your major"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Phone Number</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="+62 (890) 780-000"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Date of Birth</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter your date birthday"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Language</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                    <SelectItem value="Armenia">Armenia</SelectItem>
                    <SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
                    <SelectItem value="Brunei">Brunei</SelectItem>
                    <SelectItem value="Cambodia">Cambodia</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Password</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="md:flex items-center gap-[32px]">
              <FormLabel className="w-[180px]">Confirm Password</FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your confirm password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-3 sm:mt-[50px]">
          <Button
            variant="outline"
            className="w-full sm:w-fit font-semibold"
            disabled={isLoading}
            onClick={(e) => e.preventDefault()}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-fit font-semibold"
            type="submit"
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};