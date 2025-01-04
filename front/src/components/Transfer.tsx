import {useForm} from "react-hook-form";
import { Button } from "./ui/button";
import {ethers} from "ethers";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function Transfer() {
  const [tx, setTx] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
    const form = useForm(
      {
      
        defaultValues: {
          from: "0x25E93088a2ab13E6C4732122C996e56Ef85fcF79",
          to: "0xe7Ad540ED40c3E9dBAe537F855364f0Ff6792971",
          amount: "12",
      
      }
    });

    const onSubmit = async (data : any) => {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner(data.from)
      const t = await signer.sendTransaction({
        to: data.to,
        value: ethers.parseEther(data.amount.toString())
      })

      const tx = await t.wait()
      setTx({tx, t, data}); 
      setLoading(false);     
    }

    return (
    <div className="space-y-4 mt-3">
      <h1 className="text-xl font-bold">Transfer</h1>
      <p>Transfer your money here</p>

      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"

        >

        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta de origen</FormLabel>
              <FormControl>
                <Input placeholder="0xc3d344646" {...field} />
              </FormControl>
              <FormDescription>
                Origen de la transacción
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta de destino</FormLabel>
              <FormControl>
                <Input placeholder="0xc3d344646" {...field} />
              </FormControl>              
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input placeholder="0xc3d344646" {...field} />
              </FormControl>
              <FormDescription>
                Cantidad
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <Loader2 size={16} className={loading ? "animate-spin" : "hidden"}/>
        Transfer</Button>        
        </form>
        
      </Form>
          {
            tx && (
            <div>
              <h2>Transacción realizada</h2>
              <pre>{JSON.stringify(tx, null, 4)}</pre>
            </div>
            )
          }

    </div>
        
  )
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
