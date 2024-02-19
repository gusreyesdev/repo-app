import { useLocation, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useProjectStore } from "../../hooks";

export const EditProjectPage = () => {
  const { state } = useLocation();

  const { startEditProject } = useProjectStore();

  if (state === null) {
    return <Navigate to="/dashboard/projects" />;
  }

  const FormSchema = z.object({
    name: z.coerce.string().min(1, { message: "Name is required" }),
    url: z.coerce.string().min(1, { message: "Url is required" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const { name, url } = values;
    startEditProject({ name, url }, state.project);

    form.resetField("name");
    form.resetField("url");

    Swal.fire({
      title: "Update",
      text: "Project Updated",
      icon: "success",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5">
            <Button className="w-full" type="submit">
              Accept
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
