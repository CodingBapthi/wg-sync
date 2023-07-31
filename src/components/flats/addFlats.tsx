import React from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const createFlatFormSchema = {
  flatName: z.string().min(5, {
    message: "Flat name must be at least 5 characters long",
  }),
};

const AddFlats: React.FC = () => {
  const ctx = api.useContext();
  const { status: loginStatus } = useSession();
  const router = useRouter();
  const { data: flats, isLoading, error } = api.flats.getAll.useQuery();
  const { mutate: createFlat, isLoading: isAddingFlat } =
    api.flats.createTask.useMutation({
      onSuccess: () => {
        void ctx.flats.getFlatById.invalidate();
      },
      onError: (error) => {
        console.error("Fehler beim Erstellen der WG:", error);
      },
    });

  const form = useForm<z.infer<typeof createFlatFormSchema>>({
    resolver: zodResolver(createFlatFormSchema),
    defaultValues: {
      flatName: "",
    },
    resetOptions: {},
  });

  const onSubmit = (values: z.infer<typeof createFlatFormSchema>) => {
    createFlat(values);
    form.reset();
  };
  if (loginStatus === "loading") return null;

  if (loginStatus === "unauthenticated") {
    void router.push("/login");
  }
  return (
    <>
      <div className="container flex flex-row text-black">
        <Form {...form}>
          <form
            onSubmit={(args) => void form.handleSubmit(onSubmit)(args)}
            className="flex w-full flex-row justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="flatName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isAddingFlat}
                      placeholder="Wohnungsnamen eingeben"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isAddingFlat} type="submit">
              {isAddingFlat ? "Erstelle WG..." : "Erstelle WG"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddFlats;
