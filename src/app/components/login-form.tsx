import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import InputField from "./input-field";

export function LoginForm() {
  const { control } = useFormContext();
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <InputField
              name="email"
              control={control}
              label="Email Address"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-2">
            <InputField
              name="password"
              control={control}
              label="Password"
              type="password"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
