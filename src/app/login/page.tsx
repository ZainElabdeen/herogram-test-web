import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { toast } from "@/hooks/use-toast";
import axios from "@/utils/axios";

import { LoginForm } from "../components/login-form";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const loginMutation = async (
  data: z.infer<typeof FormSchema>
): Promise<any> => {
  const response = await axios.post(`auth/login`, data);
  return response.data;
};
function Page() {
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        navigate("/files");
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message ?? "Something went wrong",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <LoginForm />
        </form>
      </FormProvider>
    </div>
  );
}

export default Page;
