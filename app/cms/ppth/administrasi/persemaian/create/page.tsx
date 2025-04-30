import { Button } from "@/components/ui/button";
import { IconArrowLeft, IconBorderOuter } from "@tabler/icons-react";
import Link from "next/link";

export default function Create() {
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-base-gray">Administrasi / Persemaian / Tambah Data</div>
              <div className="flex items-center gap-2">
                <IconBorderOuter />
                <h1 className="text-2xl font-bold text-secondary-green">Tambah Data Persemaian</h1>
              </div>
              <p className="text-sm text-base-gray">Form untuk membuat data persemaian</p>
            </div>
            <Link href="/cms/ppth/administrasi/persemaian">
              <Button variant="green">
                <IconArrowLeft />
                Kembali
              </Button>
            </Link>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
