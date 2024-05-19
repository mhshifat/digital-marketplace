"use client";

import Editor from "@/components/shared/editor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { insertProductSchema } from "@/db/schema";
import { UploadDropzone } from "@/utils/uploadthing";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateProductMutation from "../api/use-create-product-mutation";

const formSchema = insertProductSchema.omit({ id: true, userId: true });
type FormSchema = z.infer<typeof formSchema>;

export default function CreateProductForm({ onSubmit }: { onSubmit?: () => void }) {
  const mutation = useCreateProductMutation();

  const form = useForm<FormSchema>({
    mode: "all",
    resolver: zodResolver(formSchema)
  });

  const isLoading = mutation.isPending;
  const isDisabled = isLoading;
  function handleSubmit(values: FormSchema) {
    mutation.mutate(values, {
      onSuccess: () => onSubmit?.(),
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <FormField
          name="name"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="ui-kit">Ui Kit</SelectItem>
                    <SelectItem value="icon">Icon</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" value={field.value} onChange={({ target }) => field.onChange(parseFloat(target.value))} placeholder="0.0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="summary"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Editor value={field.value || ""} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="images"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    field.onChange(JSON.stringify(res.map(item => item.url)));
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="file"
          control={form.control}
          disabled={isDisabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <UploadDropzone
                  endpoint="fileUploader"
                  onClientUploadComplete={(res) => {
                    field.onChange(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={isDisabled} type="submit">{isLoading ? "Loading..." : "Create product"}</Button>
      </form>
    </Form>
  )
}