"use client"

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react"
import { Billboard } from "@/lib/generated/prisma";

interface BillboardClientProps {
  data: Billboard[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"    
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <PlusIcon className="mr-2 h-4 w-2"/>
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};
