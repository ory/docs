import ory from "@/lib/ory";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Page() {
  let session = null;
  try {
    session = await ory.toSession({
      cookie: (await headers()).get("cookie") || "",
    });
  } catch (error) {
    redirect(`${process.env.ORY_SDK_URL}/self-service/registration/browser`);
  }

  return (
      <pre>{JSON.stringify(session, null, 2)}</pre>
  );
}
