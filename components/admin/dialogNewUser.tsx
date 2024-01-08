import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";

import {
  useGetAllUsersQuery,
  useСreateUserMutation,
} from "@/app/store/slice/user/userService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const formSchema = z.object({
  full_name: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
  email: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
  role: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
});

export function DialogNewUser() {
  // State for input values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      role: "",
    },
  });

  const { refetch } = useGetAllUsersQuery({});

  const [createUser, { isLoading, isSuccess, isError, error }] =
    useСreateUserMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createUser(values);
    refetch();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5 mb-5">Пригласить пользователя</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Пригласить пользователя</DialogTitle>
          <DialogDescription>
            На почту нового пользователя придет письмо с его данными для входа
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>ФИО</FormLabel>
                  <Input
                    type="text"
                    placeholder="Введите имя и фамилию"
                    className="col-span-3"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Почта</FormLabel>
                  <Input
                    type="text"
                    placeholder="Введите почту"
                    {...field}
                    className="col-span-3"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Почта</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Администратор</SelectItem>
                      <SelectItem value="manager">Менеджер</SelectItem>
                      <SelectItem value="accountant">Бухгалтер</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              {isError && (
                <p className="text-red-500 text-sm">
                  {(error as any).data.message}
                </p>
              )}

              {!isSuccess && (
                <Button type="submit">
                  {isLoading ? "Загрузка..." : "Пригласить"}
                </Button>
              )}

              {isSuccess && (
                <Button className="bg-green-500">Пользователь приглашен</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
