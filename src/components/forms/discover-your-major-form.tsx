"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
import useMajor from "@/hooks/use-major";
import { getToken } from "@/lib/cookies";
import { splitByComma, storeMajor } from "@/lib/utils";
import {
  discoverYourMajorPayload,
  discoverYourMajorSchema,
} from "@/lib/validators/discover-your-major";

interface DiscoverYourMajorFormProps {
  refCode: string | null;
  language: string;
}

export function DiscoverYourMajorForm({
  refCode,
  language,
}: DiscoverYourMajorFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setMajor } = useMajor();
  const router = useRouter();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<discoverYourMajorPayload>({
    resolver: zodResolver(discoverYourMajorSchema),
    defaultValues: {
      name: "",
      email: "",
      favorite_subject: "",
      favorite_activities: "",
      strongest_skills: "",
      inspiration: "",
      specific_environment: "",
      career_impact: "",
      passionate_challenges: "",
      emerging_trends: "",
      phone: "",
      edu_background: "",
    },
  });

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const onSubmit = async (values: discoverYourMajorPayload) => {
    try {
      setIsLoading(true);
      const token = getToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DISCOVERY_MAJOR_API}/process_major`,
        {
          user_data: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            edu_background: values.edu_background,
            favorite_subject: splitByComma(values.favorite_subject),
            favorite_activities: splitByComma(values.favorite_activities),
            strongest_skills: splitByComma(values.strongest_skills),
            inspiration: splitByComma(values.inspiration),
            specific_environment: splitByComma(values.specific_environment),
            career_impact: splitByComma(values.career_impact),
            passionate_challenges: splitByComma(values.passionate_challenges),
            emerging_trends: splitByComma(values.emerging_trends),
            language,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMajor(response.data.content);
      await storeMajor(response.data.content, refCode);
      router.push(`/discover-your-major/result?language=${language}`);
    } catch (error) {
      console.log(error);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "What’s your name?" : "Siapa nama kamu?"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "Enter your full name" : "Masukkan nama lengkap kamu"}
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
              <FormLabel>{language === "en" ? "What’s your email?" : "Apa email kamu?"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "Enter your email" : "Masukkan email kamu"}
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
              <FormLabel>{language === "en" ? "What’s your phone number?" : "Berapa nomor telfon kamu?"}</FormLabel>
              <FormControl>
                <PhoneInput
                  country={"id"}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                  placeholder={language === "en" ? "Enter your phone number" : "Masukkan nomor telepon kamu"}
                  enableSearch
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="edu_background"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "What's your education background?" : "Apa latar belakang Pendidikan kamu?"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "Enter your education background" : "Masukkan latar belakang pendidikan kamu"}
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
          name="favorite_subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "en" ? "Which specific subject do you enjoy the most?" : "Apa mata pelajaran yang paling kamu sukai?"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. Math, Science, Art, History, Literature" : "contoh: Matematika, IPA, Seni, Sejarah, Sastra"}
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
          name="favorite_activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "What activities do you enjoy?" : "Apa jenis aktifitas yang kamu sukai?"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. Solving Problem, Creative Things, Analyzing" : "contoh: Memecahkan Masalah, Kreatif, Menganalisis"}
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
          name="strongest_skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "What are your strongest skills?" : "Apa keahlian terkuat kamu?"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. Writing, Thinking, communication, Teamwork" : "contoh: Menulis, Berpikir, Komunikasi, Kerjasama"}
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
          name="inspiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "en" ? "What has insprired you or influences your interests significantly?" : "Apa yang menginspirasi minat kamu?"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. Book, People, Courses, shows, Projects" : "contoh: Buku, Orang, Kursus, Acara, Proyek"}
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
          name="specific_environment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "en" ? "Do you see yourself working in a specific environment?" : "Apa kah kamu memiliki gambaran untuk bekerja di lingkungan tertentu?"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. Office, Laboratory, Outdoors, Instudio, Traveling" : "contoh: Kantor, Laboratorium, Luar Ruangan, Studio, Traveling"}
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
          name="career_impact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "en" ? "What kind of impact do you want to have through your career?" : "Apa perubahan yang ingin kamu capai atau buat melalu karir kamu?"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. Innovation, Teaching, Creative Expression, Build Bussines" : "contoh: Inovasi, Mengajar, Ekspresi Kreatif, Membangun Bisnis"}
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
          name="passionate_challenges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "en" ? "What specific real-world problem or challenges that you are passionate about solving?" : "Apakah ada masalah atau tantangan disekitarmu yang ingin kamu dalami dan selesaikan?"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. Technology Accesss, Health Issues, Climate Change" : "contoh: Akses Teknologi, Masalah Kesehatan, Perubahan Iklim"}
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
          name="emerging_trends"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "en" ? "What emerging trends or industries that you find exciting and would like to be a part of?" : "Apakah ada tren atau industry baru yang ingin kamu dalami?"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={language === "en" ? "e.g. AI, Digital Media, Renewable Energy" : "contoh: Kecerdasan Buatan, Media Digital, Energi Terbarukan"}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full sm:w-fit sm:ml-auto mt-[68px] font-semibold"
          disabled={isLoading}
        >
          {language === 'en' ? 'What’s my major?' : 'Apa jurusan saya?'}
        </Button>
      </form>
    </Form>
  );
}
