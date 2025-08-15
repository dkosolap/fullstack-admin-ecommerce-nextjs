"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@/lib/generated/prisma";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(3),
});

type FormData = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const formContext = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useOrigin();
  const params = useParams();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${initialData.id}`, data);
      router.refresh();
      toast.success("Store updated!");
    } catch (error) {
      toast.error("Something goes wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${initialData.id}`);
      router.refresh();
      router.push('/');
      toast.success("Store has been deleted!");
    } catch (error) {
      toast.error("Make sure you removed all products and categories first!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferences"
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...formContext}>
        <form className="space-y-8 w-full" onSubmit={formContext.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={formContext.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Storename" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">Save changes</Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};
