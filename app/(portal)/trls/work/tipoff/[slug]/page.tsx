import { getRole } from "@/app/auth/auth";
import { getTipOffById, getTipOffRecordById } from "@/app/lib/actions";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import TipOffViewer from '@/app/components/record/TipOffViewer';

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  let tipoff;
  let error = null;

  try {
    tipoff = await getTipOffRecordById(id);
    
    const userRole = await getRole();
    
    if (!tipoff) {
      throw new Error('No tipoff data found');
    }

    return (
      <main className="h-full">
        <div className="flex flex-row h-full gap-0">
          {tipoff ? (
            <>{userRole && <TipOffViewer data={tipoff} userRole={userRole} />}</>
          ) : (
            <div className="flex h-[80vh] items-center justify-center w-full">
              <div className="text-center px-4">
                <div className="mb-6 flex justify-center">
                  <RefreshCw className="h-16 w-16 text-gray-400" />
                </div>
                <h2 className="mb-4 text-3xl font-semibold text-gray-900">
                  Connection error
                </h2>
                <p className="mb-8 text-gray-600">
                  Unable to load the tip-off record. Please check your connection and try again
                </p>
                <Link
                  href={`/trls/work/tipoff/${id}`}
                  scroll={false}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  } catch (e) {
    console.error('Error loading tipoff:', e);
    return (
      <main className="h-full">
        <div className="flex h-[80vh] items-center justify-center w-full">
          <div className="text-center px-4">
            <div className="mb-6 flex justify-center">
              <RefreshCw className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="mb-4 text-3xl font-semibold text-gray-900">
              Connection error
            </h2>
            <p className="mb-8 text-gray-600">
              Unable to load the tip-off record. Please check your connection and try again
            </p>
            <Link
              href={`/trls/work/tipoff/${id}`}
              scroll={false}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Link>
          </div>
        </div>
      </main>
    );
  }
}