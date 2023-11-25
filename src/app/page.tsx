import { caller } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const api = caller();

export default async function Home() {
  const hello = await api.job.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.job.getLatest();

  const createJobAction = async (formData: FormData) => {
    "use server";

    await api.job.create({
      name: formData.get("name")?.toString() ?? "",
    });

    revalidatePath("/");
  };

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">
          Your most recent job: {latestPost.name} {latestPost.jobCategory?.name}
        </p>
      ) : (
        <p>You have no jobs yet.</p>
      )}

      <form action={createJobAction} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Title"
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          // disabled={createJob.isLoading}
        >
          {/* {createJob.isLoading ? "Submitting..." : "Submit"} */}
          Submit
        </button>
      </form>
    </div>
  );
}
